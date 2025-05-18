import React, { useState, useEffect, useRef } from 'react';
import { useJournal } from '../context/JournalContext';

const TagSelector = ({ selectedTags, onTagsChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { getAllTags } = useJournal();
  const [allTags, setAllTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const inputRef = useRef(null);
  
  // Load all existing tags
  useEffect(() => {
    setAllTags(getAllTags());
  }, [getAllTags]);
  
  // Filter tags based on input
  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredTags([]);
      return;
    }
    
    const filtered = allTags.filter(tag => 
      tag.toLowerCase().includes(inputValue.toLowerCase()) && 
      !selectedTags.includes(tag)
    );
    setFilteredTags(filtered);
  }, [inputValue, allTags, selectedTags]);
  
  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  // Handle tag selection from dropdown
  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag]);
    }
    setInputValue('');
    inputRef.current.focus();
  };
  
  // Handle creating a new tag
  const handleCreateTag = () => {
    const newTag = inputValue.trim();
    
    if (newTag && !selectedTags.includes(newTag)) {
      onTagsChange([...selectedTags, newTag]);
      setInputValue('');
      
      // Add to allTags if it's not there already
      if (!allTags.includes(newTag)) {
        setAllTags([...allTags, newTag].sort());
      }
    }
  };
  
  // Handle key press in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // If there are filtered suggestions and user pressed Enter, 
      // select the first suggestion
      if (filteredTags.length > 0) {
        handleTagSelect(filteredTags[0]);
      } else if (inputValue.trim()) {
        // Otherwise create a new tag
        handleCreateTag();
      }
    } else if (e.key === 'Backspace' && inputValue === '' && selectedTags.length > 0) {
      // Remove the last tag when Backspace is pressed in an empty input
      const newTags = [...selectedTags];
      newTags.pop();
      onTagsChange(newTags);
    }
  };
  
  // Handle removing a tag
  const handleRemoveTag = (tagToRemove) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };
  
  // Define some common tag suggestions for new users
  const commonTagSuggestions = [
    'Work', 'Family', 'Health', 'Exercise', 'Friends', 
    'Food', 'Travel', 'School', 'Hobby', 'Achievement'
  ];
  
  return (
    <div className="tag-selector">
      <div className="selected-tags-container">
        {selectedTags.map(tag => (
          <div className="tag-pill" key={tag}>
            <span className="tag-text">{tag}</span>
            <button 
              className="tag-remove-btn" 
              onClick={() => handleRemoveTag(tag)}
              aria-label={`Remove ${tag} tag`}
            >
              ×
            </button>
          </div>
        ))}
        
        <div className="tag-input-container">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
            placeholder={selectedTags.length > 0 ? "Add more tags..." : "Add tags..."}
            className="tag-input"
            aria-label="Tag input"
          />
        </div>
      </div>
      
      {isInputFocused && (
        <div className="tag-suggestions">
          {inputValue.trim() !== '' && filteredTags.length > 0 ? (
            // Show filtered tags based on input
            <div className="tag-dropdown">
              {filteredTags.map(tag => (
                <div 
                  key={tag} 
                  className="tag-suggestion-item"
                  onClick={() => handleTagSelect(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          ) : inputValue.trim() !== '' ? (
            // Show option to create new tag
            <div className="tag-dropdown">
              <div 
                className="tag-suggestion-item tag-create-new"
                onClick={handleCreateTag}
              >
                Create new tag "{inputValue}"
              </div>
            </div>
          ) : selectedTags.length === 0 && allTags.length === 0 ? (
            // Show common suggestions for new users with no tags
            <div className="common-tag-suggestions">
              <div className="suggestions-title">Common tags:</div>
              <div className="common-tags-list">
                {commonTagSuggestions.map(tag => (
                  <div 
                    key={tag} 
                    className="common-tag-pill"
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TagSelector;