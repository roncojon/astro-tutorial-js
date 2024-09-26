import React, { useState, useEffect, useRef } from 'react';

interface Tag {
  id: number;
  name: string;
}

interface SearchBarProps {
  tags: Tag[];
  onSearch: (searchTerm: string, selectedTags: Tag[]) => void;
}

const CloseIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="inline-block h-4 w-4 stroke-current"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SearchBar: React.FC<SearchBarProps> = ({ tags, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // Current search term
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]); // Current selected tags
  const [savedSearchTerm, setSavedSearchTerm] = useState<string>(''); // Saved search term (last committed)
  const [savedSelectedTags, setSavedSelectedTags] = useState<Tag[]>([]); // Saved selected tags (last committed)
  const [isSearchCommitted, setIsSearchCommitted] = useState<boolean>(false); // Track if search was committed
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Dropdown visibility

  // Ref for the search input to blur it after search
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle the search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Clear all states when CloseIcon is clicked
  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSavedSearchTerm('');
    setSavedSelectedTags([]);
    setIsDropdownOpen(false);
    searchInputRef.current?.blur(); // Remove focus from the search bar after clearing
  };

  // Toggle tag selection
  const toggleTagSelection = (tag: Tag, e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation(); // Prevent click from bubbling up to the click outside handler
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.some(selectedTag => selectedTag.id === tag.id)
        ? prevSelectedTags.filter(selectedTag => selectedTag.id !== tag.id) // Unselect tag if it's already selected
        : [...prevSelectedTags, tag] // Select tag
    );
  };

  // Handle search action (save state)
  const handleSearch = () => {
    setSavedSearchTerm(searchTerm);
    setSavedSelectedTags([...selectedTags]);
    setIsSearchCommitted(true); // Mark search as committed
    // onSearch(searchTerm, selectedTags); // Trigger search action
    setIsDropdownOpen(false);
    searchInputRef.current?.blur(); // Remove focus from the search bar after search
  };

  // Handle clicking outside the search bar to revert or keep the state
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If user clicks outside, revert if search was not committed
      const searchBarElement = document.querySelector('.search-bar-container');
      if (searchBarElement && !searchBarElement.contains(event.target as Node)) {
        if (!isSearchCommitted) {
          setSearchTerm(savedSearchTerm); // Revert to last committed search term
          setSelectedTags(savedSelectedTags); // Revert to last committed selected tags
        }
        setIsDropdownOpen(false); // Close dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [savedSearchTerm, savedSelectedTags, isSearchCommitted]);

  // Handle Enter key to trigger search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // When the search input is focused, open the dropdown
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent focus event from bubbling up
    setIsSearchCommitted(false); // Reset commit flag when editing
    setIsDropdownOpen(true); // Open dropdown
  };

  return (
    <div className="search-bar-container w-full">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={searchInputRef} // Add the ref to the input
          type="text"
          className="input input-bordered w-full pr-20 z-10" // Adjust padding to fit the CloseIcon and Search button
          value={searchTerm}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown} // Trigger search on Enter key
          onFocus={handleFocus}
          placeholder="Search..."
        />
        {/* CloseIcon positioned as a sibling to the Search button */}
        {searchTerm && (
          <button
            className="absolute right-20 top-2 text-gray-400 hover:text-gray-600"
            onClick={handleClearSearch}
          >
            <CloseIcon />
          </button>
        )}
        {/* Search Button inside the input */}
        <button
          className="absolute right-2 top-2 btn btn-primary btn-sm"
          onClick={handleSearch}
        >
          Search
        </button>
        {/* Tags Dropdown */}
        {isDropdownOpen && (
          <div className="absolute w-full mt-1 bg-white shadow-lg border rounded-md p-2 z-0">
            {tags.map(tag => (
              <div
                key={tag.id}
                className={`badge cursor-pointer p-2 m-1 ${
                  selectedTags.some(selectedTag => selectedTag.id === tag.id)
                    ? 'badge-primary border-2 border-blue-500 text-white'
                    : 'badge-outline border-2 border-gray-400 text-gray-700'
                }`}
                onClick={(e) => toggleTagSelection(tag, e)}
                onKeyDown={(e) => handleKeyDown(e)} // Trigger search on Enter key for tags
                tabIndex={0} // Allow focusing the tag chips for keyboard accessibility
              >
                {tag.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Tags Below Search Bar */}
      <div className="flex flex-wrap mt-2">
        {selectedTags.map(tag => (
          <div
            key={tag.id}
            className="badge badge-primary flex items-center p-2 m-1 text-white"
            tabIndex={0} // Allow focusing the tag chips for keyboard accessibility
            onKeyDown={(e) => handleKeyDown(e)} // Trigger search on Enter key for tags
          >
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
