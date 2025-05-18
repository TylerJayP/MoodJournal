import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJournal } from '../context/JournalContext';
import { useAuth } from '../context/AuthContext';
import JournalItem from './JournalItem';
import Dashboard from './Dashboard';
import Welcome from './Welcome';
import FilterPanel from './FilterPanel';

const JournalList = () => {
  const { entries, createEntry, getFilteredEntries } = useJournal();
  const { user } = useAuth();
  const [showDashboard, setShowDashboard] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Check if this is the user's first visit after login
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem(`welcomeSeen_${user.username}`);
    
    if (!hasSeenWelcome && user) {
      setShowWelcomeMessage(true);
      localStorage.setItem(`welcomeSeen_${user.username}`, 'true');
    }
  }, [user]);

  // Filter entries by selected filters
  useEffect(() => {
    if (selectedTag || selectedMood) {
      setFilteredEntries(getFilteredEntries(selectedTag, selectedMood));
    } else {
      setFilteredEntries(entries);
    }
  }, [selectedTag, selectedMood, entries, getFilteredEntries]);

  const handleNewEntry = () => {
    // Set flag to indicate this is an intentional creation
    sessionStorage.setItem('intentionalCreation', 'true');
    const newEntry = createEntry();
    navigate(`/edit/${newEntry.id}`);
  };
  
  const toggleDashboard = () => {
    setShowDashboard(prev => !prev);
    // Hide filters when dashboard is shown
    if (!showDashboard) {
      setShowFilters(false);
    }
  };
  
  const toggleFilters = () => {
    setShowFilters(prev => !prev);
    // Hide dashboard when filters are shown
    if (!showFilters) {
      setShowDashboard(false);
    }
  };
  
  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };
  
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  // Are any filters currently active?
  const hasActiveFilters = selectedTag || selectedMood;
  
  // Display filtered entries or all entries if no filters are active
  const displayedEntries = hasActiveFilters ? filteredEntries : entries;

  return (
    <div>
      {showWelcomeMessage && <Welcome />}
      
      <div className="journal-controls">
        <button onClick={handleNewEntry} className="new-entry-button">
          Create New Journal Entry
        </button>
        
        <div className="journal-view-controls">
          {entries.length > 0 && (
            <>
              <button 
                onClick={toggleFilters} 
                className={`filter-toggle ${showFilters ? 'active' : ''} ${hasActiveFilters ? 'has-filters' : ''}`}
                title="Filter entries"
              >
                <span className="filter-icon">🔍</span>
                <span>Filter</span>
                {hasActiveFilters && (
                  <span className="filter-count">{(selectedTag ? 1 : 0) + (selectedMood ? 1 : 0)}</span>
                )}
              </button>
              
              <button 
                onClick={toggleDashboard} 
                className={`dashboard-toggle ${showDashboard ? 'active' : ''}`}
              >
                {showDashboard ? 'Hide Insights' : 'View Mood Insights'}
              </button>
            </>
          )}
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="active-filter-banner">
          <div className="filter-info">
            <span>Filtering by:</span>
            {selectedTag && (
              <span className="active-filter-pill tag">Tag: {selectedTag}</span>
            )}
            {selectedMood && (
              <span className="active-filter-pill mood">Mood: {selectedMood}</span>
            )}
          </div>
          <button 
            className="clear-filter-button"
            onClick={() => {
              setSelectedTag(null);
              setSelectedMood(null);
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}
      
      <div className="journal-content">
        {showFilters && entries.length > 0 && (
          <div className="filter-sidebar">
            <FilterPanel 
              selectedTag={selectedTag}
              onSelectTag={handleTagSelect}
              selectedMood={selectedMood}
              onSelectMood={handleMoodSelect}
            />
          </div>
        )}
        
        <div className={`journal-main ${showFilters ? 'with-sidebar' : ''}`}>
          {showDashboard && entries.length > 0 && (
            <Dashboard onClose={toggleDashboard} />
          )}
          
          {displayedEntries.length === 0 ? (
            hasActiveFilters ? (
              <div className="empty-state">
                <h2>No entries match your filters</h2>
                <p>Try adjusting your filters or create new entries with these attributes.</p>
                <button 
                  onClick={() => {
                    setSelectedTag(null);
                    setSelectedMood(null);
                  }} 
                  className="clear-filter-button large"
                >
                  Clear All Filters
                </button>
              </div>
            ) : entries.length === 0 ? (
              <div className="empty-state">
                <h2>No journal entries yet</h2>
                <p>Start tracking your mood by creating your first journal entry!</p>
                <button onClick={handleNewEntry} className="new-entry-button">
                  Create Your First Entry
                </button>
              </div>
            ) : null
          ) : (
            <div className="journal-list">
              {displayedEntries.map(entry => (
                <Link to={`/edit/${entry.id}`} key={entry.id}>
                  <JournalItem entry={entry} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalList;