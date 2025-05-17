import React from 'react';

const MoodIcons = ({ mood }) => {
  // Define colors for each mood
  const moodColors = {
    'Happy': '#f1c40f',
    'Excited': '#e67e22',
    'Peaceful': '#2ecc71',
    'Grateful': '#3498db',
    'Loved': '#e84393',
    'Proud': '#9b59b6',
    'Hopeful': '#1abc9c',
    'Content': '#27ae60',
    'Calm': '#00cec9',
    'Sad': '#3498db',
    'Frustrated': '#e74c3c',
    'Tired': '#95a5a6',
    'Upset': '#9b59b6',
    'Anxious': '#ff7f50',
    'Overwhelmed': '#d35400',
    'Depressed': '#34495e',
    'Angry': '#c0392b',
    'Nervous': '#fd79a8',
    'Bored': '#636e72',
    'Confused': '#6c5ce7'
  };
  
  // Get the color for this mood (or default if not found)
  const color = moodColors[mood] || '#bdc3c7';
  
  // Render different SVG paths based on the mood
  switch (mood) {
    case 'Happy':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
        </svg>
      );
    case 'Excited':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 13c.5 1.5 2 3 4 3s3.5-1.5 4-3" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
          <path d="M18 7l1-2M6 7L5 5M12 5V3" stroke="#333" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case 'Peaceful':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M9 13h6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
        </svg>
      );
    case 'Grateful':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
          <path d="M12 16v2M12 18l2 2M12 18l-2 2" stroke="#333" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case 'Loved':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
          <path d="M12 7l-1-2h2l-1 2z" fill="#333" />
        </svg>
      );
    case 'Proud':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
          <path d="M12 18v2M9 4l3 2 3-2" stroke="#333" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case 'Hopeful':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 13s1.5 1.5 4 1.5 4-1.5 4-1.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
          <path d="M18 8l2-2M6 8L4 6" stroke="#333" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case 'Content':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M9 13h6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
        </svg>
      );
    case 'Calm':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M9 14h6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="9" y1="9" x2="9" y2="9.01" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15" y1="9" x2="15" y2="9.01" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'Sad':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 16s1.5-2 4-2 4 2 4 2" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
        </svg>
      );
    case 'Frustrated':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 16l8-2" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
        </svg>
      );
    case 'Tired':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 14h8" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 9h-.01M15 9h-.01" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'Upset':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 15l2 2 4-4" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
        </svg>
      );
    case 'Anxious':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 14.5l2-1 2 1 2-1 2 1" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
          <path d="M7 6l2 2M17 6l-2 2" stroke="#333" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case 'Overwhelmed':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M9 15.5c.5-1 1.5-1.5 3-1.5s2.5.5 3 1.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
          <path d="M20 6l1-1M4 6L3 5M20 12h2M2 12h2M4 18l1-1M19 18l1 1" stroke="#333" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case 'Depressed':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M9 15l6 1" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 9h-.01M15 9h-.01" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 18v2" stroke="#bbb" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case 'Angry':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 15l8 1" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 8l2 2M17 8l-2 2" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="10" r="1.5" fill="#333" />
          <circle cx="15" cy="10" r="1.5" fill="#333" />
        </svg>
      );
    case 'Nervous':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 14l2 .5 2-.5 2 .5 2-.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
          <path d="M7 6l1.5 1M17 6l-1.5 1" stroke="#333" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case 'Bored':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M8 14h8" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 9h-.01M15 9h-.01" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18 14c0 3.5-2.5 6-6 6s-6-2.5-6-6" stroke={color} strokeWidth=".75" strokeDasharray="1 2" />
        </svg>
      );
    case 'Confused':
      return (
        <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
          <path d="M9 13l3 2 3-2" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
          <path d="M16 17h.01" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

export default MoodIcons;