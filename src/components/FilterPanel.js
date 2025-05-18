import React, { useState } from 'react';
import TagFilter from './TagFilter';
import MoodFilter from './MoodFilter';

const FilterPanel = ({ selectedTag, onSelectTag, selectedMood, onSelectMood }) => {
  const [activeTab, setActiveTab] = useState('tags');
  
  return (
    <div className="filter-panel">
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${activeTab === 'tags' ? 'active' : ''}`}
          onClick={() => setActiveTab('tags')}
        >
          Tags
        </button>
        <button 
          className={`filter-tab ${activeTab === 'moods' ? 'active' : ''}`}
          onClick={() => setActiveTab('moods')}
        >
          Moods
        </button>
      </div>
      
      <div className="filter-content">
        {activeTab === 'tags' ? (
          <TagFilter 
            selectedTag={selectedTag}
            onSelectTag={onSelectTag}
          />
        ) : (
          <MoodFilter 
            selectedMood={selectedMood}
            onSelectMood={onSelectMood}
          />
        )}
      </div>
      
      {(selectedTag || selectedMood) && (
        <div className="active-filters-summary">
          <div className="active-filters-label">Active filters:</div>
          <div className="active-filters-list">
            {selectedTag && (
              <div className="active-filter-badge tag">
                <span>Tag: {selectedTag}</span>
                <button 
                  onClick={() => onSelectTag(null)}
                  className="filter-badge-remove"
                >
                  ×
                </button>
              </div>
            )}
            
            {selectedMood && (
              <div className="active-filter-badge mood">
                <span>Mood: {selectedMood}</span>
                <button 
                  onClick={() => onSelectMood(null)}
                  className="filter-badge-remove"
                >
                  ×
                </button>
              </div>
            )}
          </div>
          
          <button 
            className="clear-all-filters-button"
            onClick={() => {
              onSelectTag(null);
              onSelectMood(null);
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;