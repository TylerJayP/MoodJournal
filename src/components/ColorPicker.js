import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const ColorPicker = () => {
  const { user, updateUser } = useAuth();
  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState(user?.nameColor || '#3498db');
  const pickerRef = useRef(null);
  
  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleColorPicker = () => {
    setShowPicker(!showPicker);
  };
  
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
  };
  
  const saveColor = () => {
    // Update user in context
    updateUser({
      ...user,
      nameColor: color
    });
    
    // Save to profile in localStorage
    const profileKey = `userProfile_${user.username}`;
    const savedProfile = localStorage.getItem(profileKey);
    
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      profileData.nameColor = color;
      localStorage.setItem(profileKey, JSON.stringify(profileData));
    }
    
    // Close picker
    setShowPicker(false);
  };
  
  return (
    <div className="color-wheel-container" ref={pickerRef}>
      <button 
        className="color-wheel-button" 
        onClick={toggleColorPicker}
        title="Change name color"
        aria-label="Change name color"
      >
        <svg 
          viewBox="0 0 24 24" 
          width="20" 
          height="20"
          className="color-wheel-icon"
        >
          <circle cx="12" cy="12" r="8" fill="url(#gradient)" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff0000" />
              <stop offset="16.67%" stopColor="#ff8000" />
              <stop offset="33.33%" stopColor="#ffff00" />
              <stop offset="50%" stopColor="#00ff00" />
              <stop offset="66.67%" stopColor="#0000ff" />
              <stop offset="83.33%" stopColor="#8000ff" />
              <stop offset="100%" stopColor="#ff0080" />
            </linearGradient>
          </defs>
        </svg>
      </button>
      
      {showPicker && (
        <div className="color-picker-dropdown">
          <div className="color-picker-header">
            <span>Choose name color</span>
          </div>
          <div className="color-picker-content">
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="color-input"
            />
            <div className="color-preview">
              <span style={{ color: color }}>Hello, {user.displayName || user.username}</span>
            </div>
          </div>
          <div className="color-picker-footer">
            <button 
              className="save-color-button"
              onClick={saveColor}
            >
              Save
            </button>
            <button 
              className="cancel-button"
              onClick={() => setShowPicker(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;