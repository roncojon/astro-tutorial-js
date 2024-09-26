import { useState } from 'react';
import { useSavedSearchState } from './useSavedSearchState'; // Importing saved search hook

interface Tag {
  id: number;
  name: string;
}

export const useControlledSearchState = (initialSearchTerm: string, initialSelectedTags: Tag[]) => {
  const { savedSearchTerm, savedSelectedTags, saveSearchState } = useSavedSearchState(); // Hook for saving state
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm); // Current search term
  const [selectedTags, setSelectedTags] = useState<Tag[]>(initialSelectedTags); // Current selected tags
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Manage dropdown visibility

  // Function to commit (save) the current state
  const commitSearchState = () => {
    saveSearchState(searchTerm, selectedTags); // Save the current search state as committed
  };

  return {
    searchTerm,
    selectedTags,
    isDropdownOpen,
    setSearchTerm,
    setSelectedTags,
    setIsDropdownOpen,
    commitSearchState,
    savedSearchTerm, // Expose saved search term
    savedSelectedTags, // Expose saved selected tags
  };
};
