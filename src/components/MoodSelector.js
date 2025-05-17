import React from 'react';
import MoodIcons from './MoodIcons';

const moods = ['Happy', 'Sad', 'Frustrated', 'Tired', 'Upset', 'Anxious', 'Depressed'];

const MoodSelector = ({ selectedMood, onSelectMood }) => {
  return (
    <div className="mood-icons">
      {moods.map(mood => (
        <div
          key={mood}
          className={`mood-icon ${selectedMood === mood ? 'selected' : ''}`}
          onClick={() => onSelectMood(mood)}
        >
          <MoodIcons mood={mood} />
          <span className="mood-label">{mood}</span>
        </div>
      ))}
    </div>
  );
};

export default MoodSelector;
