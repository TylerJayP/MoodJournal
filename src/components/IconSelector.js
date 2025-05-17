import React, { useState } from 'react';

// Predefined list of icons (using emoji for simplicity)
const icons = [
  { name: 'default', emoji: '👤' },
  { name: 'smile', emoji: '😊' },
  { name: 'heart', emoji: '❤️' },
  { name: 'star', emoji: '⭐' },
  { name: 'moon', emoji: '🌙' },
  { name: 'sun', emoji: '☀️' },
  { name: 'flower', emoji: '🌸' },
  { name: 'tree', emoji: '🌳' },
  { name: 'cat', emoji: '🐱' },
  { name: 'dog', emoji: '🐶' },
  { name: 'coffee', emoji: '☕' },
  { name: 'book', emoji: '📚' },
  { name: 'music', emoji: '🎵' },
  { name: 'camera', emoji: '📷' },
  { name: 'rocket', emoji: '🚀' },
  { name: 'rainbow', emoji: '🌈' },
];

const IconSelector = ({ selectedIcon, onSelectIcon }) => {
  const [showSelector, setShowSelector] = useState(false);
  
  const toggleSelector = () => {
    setShowSelector(!showSelector);
  };
  
  const handleIconSelect = (iconName) => {
    onSelectIcon(iconName);
    setShowSelector(false);
  };
  
  // Find the currently selected icon
  const currentIcon = icons.find(icon => icon.name === selectedIcon) || icons[0];
  
  return (
    <div className="icon-selector">
      <button 
        className="current-icon"
        onClick={toggleSelector}
        aria-label="Select profile icon"
      >
        <span className="icon-emoji">{currentIcon.emoji}</span>
        <span className="change-icon-text">Change</span>
      </button>
      
      {showSelector && (
        <div className="icon-grid">
          {icons.map(icon => (
            <button
              key={icon.name}
              className={`icon-option ${selectedIcon === icon.name ? 'selected' : ''}`}
              onClick={() => handleIconSelect(icon.name)}
              aria-label={`Select ${icon.name} icon`}
            >
              {icon.emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IconSelector;