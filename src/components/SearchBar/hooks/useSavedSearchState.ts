import { useState } from 'react';

interface Tag {
  id: number;
  name: string;
}

export const useSavedSearchState = () => {
  const [savedSearchTerm, setSavedSearchTerm] = useState<string>(''); // Stores committed search term
  const [savedSelectedTags, setSavedSelectedTags] = useState<Tag[]>([]); // Stores committed selected tags

  // Function to save the search state
  const saveSearchState = (searchTerm: string, selectedTags: Tag[]) => {
    setSavedSearchTerm(searchTerm);
    setSavedSelectedTags([...selectedTags]); // Save a new state with selected tags
  };

  return {
    savedSearchTerm,
    savedSelectedTags,
    saveSearchState,
  };
};
