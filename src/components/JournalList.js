import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJournal } from '../context/JournalContext';
import { useAuth } from '../context/AuthContext';
import JournalItem from './JournalItem';
import Dashboard from './Dashboard';
import Welcome from './Welcome';

const JournalList = () => {
  const { entries, createEntry } = useJournal();
  const { user } = useAuth();
  const [showDashboard, setShowDashboard] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const navigate = useNavigate();

  // Check if this is the user's first visit after login
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem(`welcomeSeen_${user.username}`);
    
    if (!hasSeenWelcome && user) {
      setShowWelcomeMessage(true);
      localStorage.setItem(`welcomeSeen_${user.username}`, 'true');
    }
  }, [user]);

  const handleNewEntry = () => {
    // Set flag to indicate this is an intentional creation
    sessionStorage.setItem('intentionalCreation', 'true');
    const newEntry = createEntry();
    navigate(`/edit/${newEntry.id}`);
  };
  
  const toggleDashboard = () => {
    setShowDashboard(prev => !prev);
  };

  return (
    <div>
      {showWelcomeMessage && <Welcome />}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={handleNewEntry} className="new-entry-button">
          Create New Journal Entry
        </button>
        
        {entries.length > 0 && (
          <button 
            onClick={toggleDashboard} 
            className="dashboard-toggle"
            style={{ backgroundColor: showDashboard ? '#95a5a6' : '#3498db' }}
          >
            {showDashboard ? 'Hide Insights' : 'View Mood Insights'}
          </button>
        )}
      </div>
      
      {showDashboard && entries.length > 0 && (
        <Dashboard onClose={toggleDashboard} />
      )}
      
      {entries.length === 0 ? (
        <div className="empty-state">
          <h2>No journal entries yet</h2>
          <p>Start tracking your mood by creating your first journal entry!</p>
          <button onClick={handleNewEntry} className="new-entry-button">
            Create Your First Entry
          </button>
        </div>
      ) : (
        <div className="journal-list">
          {entries.map(entry => (
            <Link to={`/edit/${entry.id}`} key={entry.id}>
              <JournalItem entry={entry} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalList;