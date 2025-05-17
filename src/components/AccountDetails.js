import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJournal } from '../context/JournalContext';

const AccountDetails = ({ onClose }) => {
  const { user, logout } = useAuth();
  const { entries } = useJournal();
  const navigate = useNavigate();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  
  // Calculate user statistics
  const userSince = localStorage.getItem(`userSince_${user.username}`) || new Date().toISOString();
  const formattedDate = new Date(userSince).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Handle account deletion
  const handleDeleteAccount = () => {
    if (showConfirmDelete) {
      // Remove all user data
      localStorage.removeItem(`journalEntries_${user.username}`);
      localStorage.removeItem(`welcomeSeen_${user.username}`);
      localStorage.removeItem(`userSince_${user.username}`);
      localStorage.removeItem(`userProfile_${user.username}`);
      localStorage.removeItem('moodJournalUser');
      
      // Redirect to login
      logout();
      navigate('/login');
    } else {
      setShowConfirmDelete(true);
    }
  };
  
  return (
    <div className="account-overlay">
      <div className="account-modal">
        <div className="account-header">
          <h2>Account Details</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="account-content">
          <div className="account-info-item">
            <strong>Username:</strong>
            <span>{user.username}</span>
          </div>
          
          <div className="account-info-item">
            <strong>Member Since:</strong>
            <span>{formattedDate}</span>
          </div>
          
          <div className="account-info-item">
            <strong>Journal Entries:</strong>
            <span>{entries.length}</span>
          </div>
          
          <div className="account-section">
            <h3>Account Actions</h3>
            <div className="account-buttons">
              <button 
                className="logout-account-button"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Log Out
              </button>
              
              <button 
                className="delete-account-button"
                onClick={handleDeleteAccount}
              >
                {showConfirmDelete ? "Confirm Delete Account" : "Delete Account"}
              </button>
            </div>
            
            {showConfirmDelete && (
              <div className="delete-warning">
                <p>Warning: This will permanently delete all your journal entries and account information. This action cannot be undone.</p>
                <button 
                  className="cancel-delete-button"
                  onClick={() => setShowConfirmDelete(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;