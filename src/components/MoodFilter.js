import React from 'react';
import { useJournal } from '../context/JournalContext';
import MoodIcons from './MoodIcons';

const MoodFilter = ({ selectedMood, onSelectMood }) => {
  const { getAllMoods } = useJournal();
  const allMoods = getAllMoods();
  
  return (
    <div className="mood-filter">
      <div className="filter-header">
        <h3>Filter by Mood</h3>
        {selectedMood && (
          <button 
            className="clear-filter-button"
            onClick={() => onSelectMood(null)}
          >
            Clear
          </button>
        )}
      </div>
      
      <div className="mood-filter-list">
        {allMoods.length > 0 ? (
          allMoods.map(mood => (
            <div 
              key={mood}
              className={`mood-filter-item ${selectedMood === mood ? 'selected' : ''}`}
              onClick={() => onSelectMood(mood)}
            >
              <div className="mood-filter-icon">
                <MoodIcons mood={mood} />
              </div>
              <span className="mood-filter-name">{mood}</span>
            </div>
          ))
        ) : (
          <div className="no-items-message">
            No moods tracked yet. Add moods to your journal entries to use mood filtering.
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodFilter;