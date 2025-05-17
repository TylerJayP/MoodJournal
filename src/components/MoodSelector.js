import React from 'react';
import MoodIcons from './MoodIcons';

// Enhanced list of moods with more emotional variety
const moods = [
  'Happy', 
  'Excited',
  'Peaceful',
  'Grateful',
  'Loved',
  'Proud', 
  'Hopeful',
  'Content',
  'Calm',
  'Sad', 
  'Frustrated', 
  'Tired', 
  'Upset', 
  'Anxious',
  'Overwhelmed', 
  'Depressed',
  'Angry',
  'Nervous',
  'Bored',
  'Confused'
];

const MoodSelector = ({ selectedMoods, onSelectMood }) => {
  // Function to handle mood toggling
  const handleMoodToggle = (mood) => {
    if (selectedMoods.includes(mood)) {
      // If already selected, remove it
      onSelectMood(selectedMoods.filter(m => m !== mood));
    } else {
      // If not selected, add it
      onSelectMood([...selectedMoods, mood]);
    }
  };
  
  return (
    <div className="mood-section">
      <div className="selected-moods-info">
        {selectedMoods.length === 0 ? (
          <p className="no-moods-message">Select one or more moods that reflect how you're feeling</p>
        ) : (
          <p className="selected-moods-count">
            <span>{selectedMoods.length}</span> mood{selectedMoods.length !== 1 ? 's' : ''} selected
          </p>
        )}
      </div>
      
      <div className="mood-icons">
        {moods.map(mood => (
          <div
            key={mood}
            className={`mood-icon ${selectedMoods.includes(mood) ? 'selected' : ''}`}
            onClick={() => handleMoodToggle(mood)}
          >
            <MoodIcons mood={mood} />
            <span className="mood-label">{mood}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;