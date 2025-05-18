import React from 'react';
import { useJournal } from '../context/JournalContext';

const TagFilter = ({ selectedTag, onSelectTag }) => {
  const { getAllTags } = useJournal();
  const allTags = getAllTags();
  
  return (
    <div className="tag-filter">
      <div className="tag-filter-header">
        <h3>Filter by Tag</h3>
        {selectedTag && (
          <button 
            className="clear-filter-button"
            onClick={() => onSelectTag(null)}
          >
            Clear Filter
          </button>
        )}
      </div>
      
      <div className="tag-filter-list">
        {allTags.length > 0 ? (
          allTags.map(tag => (
            <div 
              key={tag}
              className={`tag-filter-item ${selectedTag === tag ? 'selected' : ''}`}
              onClick={() => onSelectTag(tag)}
            >
              <span className="tag-filter-name">{tag}</span>
              <span className="tag-filter-count">
                {/* We could add a count of entries with this tag here */}
              </span>
            </div>
          ))
        ) : (
          <div className="no-tags-message">
            No tags created yet. Add tags to your journal entries to organize them.
          </div>
        )}
      </div>
    </div>
  );
};

export default TagFilter;