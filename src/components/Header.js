import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileEditor from './ProfileEditor';

// Helper function to get the emoji for an icon name
const getIconEmoji = (iconName) => {
  const icons = {
    'default': '👤',
    'smile': '😊',
    'heart': '❤️',
    'star': '⭐',
    'moon': '🌙',
    'sun': '☀️',
    'flower': '🌸',
    'tree': '🌳',
    'cat': '🐱',
    'dog': '🐶',
    'coffee': '☕',
    'book': '📚',
    'music': '🎵',
    'camera': '📷',
    'rocket': '🚀',
    'rainbow': '🌈',
  };
  
  return icons[iconName] || icons.default;
};

const Header = () => {
  const { user } = useAuth();
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  
  // Record when the user first created their account
  useEffect(() => {
    if (user && user.username) {
      const userSinceKey = `userSince_${user.username}`;
      if (!localStorage.getItem(userSinceKey)) {
        localStorage.setItem(userSinceKey, new Date().toISOString());
      }
    }
  }, [user]);

  return (
    <header className="header">
      <Link to="/">
        <h1 className="app-title">Mood Journal</h1>
      </Link>
      <div className="header-controls">
        {user && (
          <div className="user-controls">
            <div 
              className="user-profile-icon"
              onClick={() => setShowProfileEditor(true)}
              title="Edit Profile"
            >
              {getIconEmoji(user.icon || 'default')}
            </div>
            <span 
              className="username" 
              style={{ color: user.nameColor || '#3498db' }}
            >
              Hello, {user.displayName || user.username}
            </span>
          </div>
        )}
      </div>
      
      {showProfileEditor && (
        <ProfileEditor onClose={() => setShowProfileEditor(false)} />
      )}
    </header>
  );
};

export default Header;