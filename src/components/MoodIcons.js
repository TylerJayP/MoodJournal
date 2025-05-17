import React from 'react';

const MoodIcons = ({ mood }) => {
  switch (mood) {
    case 'Happy':
      return (
        <svg viewBox="0 0 24 24" fill="#f1c40f" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#f1c40f" strokeWidth="1.5" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
        </svg>
      );
    case 'Sad':
      return (
        <svg viewBox="0 0 24 24" fill="#3498db" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#3498db" strokeWidth="1.5" />
          <path d="M8 16s1.5-2 4-2 4 2 4 2" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
        </svg>
      );
    case 'Frustrated':
      return (
        <svg viewBox="0 0 24 24" fill="#e74c3c" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#e74c3c" strokeWidth="1.5" />
          <path d="M8 16l8-2" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
        </svg>
      );
    case 'Tired':
      return (
        <svg viewBox="0 0 24 24" fill="#95a5a6" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#95a5a6" strokeWidth="1.5" />
          <path d="M8 14h8" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 9h-.01M15 9h-.01" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'Upset':
      return (
        <svg viewBox="0 0 24 24" fill="#9b59b6" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#9b59b6" strokeWidth="1.5" />
          <path d="M8 15l2 2 4-4" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
        </svg>
      );
    case 'Anxious':
      return (
        <svg viewBox="0 0 24 24" fill="#ff7f50" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#ff7f50" strokeWidth="1.5" />
          <path d="M8 14.5l2-1 2 1 2-1 2 1" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="9" r="1.5" fill="#333" />
          <circle cx="15" cy="9" r="1.5" fill="#333" />
        </svg>
      );
    case 'Depressed':
      return (
        <svg viewBox="0 0 24 24" fill="#34495e" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#34495e" strokeWidth="1.5" />
          <path d="M9 15l6 1" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 9h-.01M15 9h-.01" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

export default MoodIcons;
