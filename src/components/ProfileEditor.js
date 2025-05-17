import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import IconSelector from './IconSelector';

const ProfileEditor = ({ onClose }) => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // State for profile data
  const [profile, setProfile] = useState({
    username: user?.username || '',
    displayName: user?.displayName || user?.username || '',
    icon: 'default',
    nameColor: user?.nameColor || '#3498db',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [activeTab, setActiveTab] = useState('general');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Load existing profile data if available
  useEffect(() => {
    const loadProfileData = () => {
      if (!user || !user.username) return;
      
      const profileKey = `userProfile_${user.username}`;
      const savedProfile = localStorage.getItem(profileKey);
      
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(prev => ({
          ...prev,
          displayName: parsedProfile.displayName || user.username,
          icon: parsedProfile.icon || 'default',
          nameColor: parsedProfile.nameColor || '#3498db',
          bio: parsedProfile.bio || '',
        }));
      }
    };
    
    loadProfileData();
  }, [user]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle icon selection
  const handleIconSelect = (iconName) => {
    setProfile(prev => ({
      ...prev,
      icon: iconName
    }));
  };
  
  // Update profile
  const saveGeneralInfo = () => {
    // Simple validation - bio length
    if (profile.bio.length > 1000) {
      setMessage({
        type: 'error',
        text: 'Bio must be 1000 characters or less'
      });
      return;
    }
    
    // Save to localStorage
    const profileKey = `userProfile_${user.username}`;
    const profileData = {
      username: user.username, // Keep original username
      displayName: profile.displayName,
      icon: profile.icon,
      nameColor: profile.nameColor,
      bio: profile.bio
    };
    
    localStorage.setItem(profileKey, JSON.stringify(profileData));
    
    // Update the user context
    updateUser({
      ...user,
      displayName: profile.displayName,
      icon: profile.icon,
      nameColor: profile.nameColor
    });
    
    setMessage({
      type: 'success',
      text: 'Profile updated successfully!'
    });
    
    // Clear message after a delay
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };
  
  // Change password
  const changePassword = () => {
    // In a real app we'd verify the current password here
    if (!profile.currentPassword || !profile.newPassword || !profile.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Please fill in all password fields'
      });
      return;
    }
    
    if (profile.newPassword !== profile.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match'
      });
      return;
    }
    
    // For demo purposes, we'll just store the new password in localStorage
    // In a real app, you would send this to a secure API
    const passwordKey = `userPassword_${user.username}`;
    localStorage.setItem(passwordKey, profile.newPassword);
    
    setMessage({
      type: 'success',
      text: 'Password changed successfully!'
    });
    
    // Reset password fields
    setProfile(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
    
    // Clear message after a delay
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };
  
  // Delete account
  const handleDeleteAccount = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    // Remove all user data
    const username = user.username;
    localStorage.removeItem(`journalEntries_${username}`);
    localStorage.removeItem(`welcomeSeen_${username}`);
    localStorage.removeItem(`userSince_${username}`);
    localStorage.removeItem(`userProfile_${username}`);
    localStorage.removeItem(`userPassword_${username}`);
    localStorage.removeItem('moodJournalUser');
    
    // Log out and redirect to login page
    logout();
    navigate('/login');
  };
  
  // Cancel account deletion
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  
  return (
    <div className="profile-editor-overlay">
      <div className="profile-editor-modal">
        <div className="profile-editor-header">
          <h2>Edit Your Profile</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button 
            className={`tab-button ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Password
          </button>
          <button 
            className={`tab-button ${activeTab === 'danger' ? 'active' : ''}`}
            onClick={() => setActiveTab('danger')}
          >
            Delete Account
          </button>
        </div>
        
        <div className="profile-editor-content">
          {message.text && (
            <div className={`profile-message ${message.type}`}>
              {message.text}
            </div>
          )}
          
          {activeTab === 'general' && (
            <div className="profile-section">
              <div className="profile-preview">
                <div className="profile-icon-container">
                  <IconSelector 
                    selectedIcon={profile.icon} 
                    onSelectIcon={handleIconSelect} 
                  />
                </div>
                <div className="name-and-color">
                  <span 
                    className="username-preview"
                    style={{ color: profile.nameColor }}
                  >
                    {profile.displayName}
                  </span>
                  <input
                    type="color"
                    value={profile.nameColor}
                    onChange={(e) => setProfile({...profile, nameColor: e.target.value})}
                    className="color-wheel-input"
                    title="Change name color"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={profile.displayName}
                  onChange={handleChange}
                  className="animate-input"
                />
                <small className="form-help-text">This name will appear in your journal entries</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">Bio <span className="bio-counter">{profile.bio.length}/1000</span></label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  className="animate-input bio-textarea"
                  maxLength={1000}
                />
              </div>
              
                <div className="profile-action-buttons">
              <button 
                className="save-profile-button"
                onClick={saveGeneralInfo}
              >
                Save Changes
              </button>
              
              <button 
                className="logout-button profile-logout-button"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Log Out
              </button>
            </div>
            </div>
          )}
          
          {activeTab === 'password' && (
            <div className="profile-section">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={profile.currentPassword}
                  onChange={handleChange}
                  className="animate-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={profile.newPassword}
                  onChange={handleChange}
                  className="animate-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleChange}
                  className="animate-input"
                />
              </div>
              
              <button 
                className="save-password-button"
                onClick={changePassword}
              >
                Change Password
              </button>
            </div>
          )}
          
          {activeTab === 'danger' && (
            <div className="profile-section danger-section">
              <h3>Delete Account</h3>
              <p className="danger-text">
                Warning: This action is permanent and irreversible. All your journal entries and profile data will be deleted.
              </p>
              
              {!showDeleteConfirm ? (
                <button 
                  className="delete-account-button"
                  onClick={handleDeleteAccount}
                >
                  Delete My Account
                </button>
              ) : (
                <div className="confirm-delete-container">
                  <p className="confirm-text">Are you sure? This cannot be undone.</p>
                  <div className="confirm-buttons">
                    <button 
                      className="confirm-delete-button"
                      onClick={handleDeleteAccount}
                    >
                      Yes, Delete Everything
                    </button>
                    <button 
                      className="cancel-delete-button"
                      onClick={cancelDelete}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;