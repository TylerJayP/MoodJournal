// Updated JournalContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './AuthContext';

const JournalContext = createContext();

export const useJournal = () => useContext(JournalContext);

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const { user } = useAuth();
  
  // Get user-specific storage key - wrapped in useCallback to preserve reference
  const getUserStorageKey = useCallback(() => {
    if (!user || !user.username) return null;
    return `journalEntries_${user.username}`;
  }, [user]);
  
  // Load entries from localStorage on initial render or when user changes
  useEffect(() => {
    const loadEntries = () => {
      const storageKey = getUserStorageKey();
      if (!storageKey) {
        setEntries([]);
        return;
      }
      
      const storedEntries = localStorage.getItem(storageKey);
      if (storedEntries) {
        // This is an existing user with entries, load them
        setEntries(JSON.parse(storedEntries));
      } else {
        // This is either a new user or a user with no entries
        // Initialize with an empty array instead of a default entry
        setEntries([]);
        // Save the empty array to localStorage to mark that we've initialized this user
        localStorage.setItem(storageKey, JSON.stringify([]));
      }
    };
    
    loadEntries();
  }, [getUserStorageKey]); // Add getUserStorageKey to the dependency array
    
  // Save entries to localStorage whenever they change
  useEffect(() => {
    const saveEntries = () => {
      const storageKey = getUserStorageKey();
      if (!storageKey) return;
      
      localStorage.setItem(storageKey, JSON.stringify(entries));
    };
    
    saveEntries();
  }, [entries, getUserStorageKey]); // Add getUserStorageKey to the dependency array
    
  // Get a single entry by ID
  const getEntry = (id) => {
    return entries.find(entry => entry.id === id);
  };
    
// Create a new entry
const createEntry = () => {
  // First, clean up any untitled, empty entries
  cleanupEmptyEntries();
  
  const newEntry = {
    id: uuidv4(),
    name: user ? (user.displayName || user.username) : '',
    moods: [],
    tags: [], // Add an array to store tags
    title: '',
    description: '',
    gratitude: '',
    photo: null,
    photoCaption: '',
    date: new Date().toISOString().split('T')[0]
  };
    
  setEntries(prevEntries => [newEntry, ...prevEntries]);
  return newEntry;
};
    
  // Update an existing entry
  const updateEntry = (updatedEntry) => {
    setEntries(prevEntries => 
      prevEntries.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

    const cleanupEmptyEntries = () => {
    setEntries(prevEntries => 
      prevEntries.filter(entry => 
        entry.title.trim() !== '' || entry.description.trim() !== ''
      )
    );
  };

  const getAllTags = () => {
  // Get all unique tags across all entries
  const tagSet = new Set();
  
  entries.forEach(entry => {
    if (Array.isArray(entry.tags)) {
      entry.tags.forEach(tag => tagSet.add(tag));
    }
  });
  
  return Array.from(tagSet).sort();
};

const getEntriesByTag = (tag) => {
  // Filter entries by tag
  return entries.filter(entry => 
    Array.isArray(entry.tags) && entry.tags.includes(tag)
  );
};

const getAllMoods = () => {
  const moodSet = new Set();
  
  entries.forEach(entry => {
    // Handle both old entries with mood (string) and new entries with moods (array)
    const moodsArray = Array.isArray(entry.moods) ? entry.moods : (entry.mood ? [entry.mood] : []);
    
    moodsArray.forEach(mood => moodSet.add(mood));
  });
  
  return Array.from(moodSet).sort();
};

// Filter entries by mood
const getEntriesByMood = (mood) => {
  return entries.filter(entry => {
    // Handle both old entries with mood (string) and new entries with moods (array)
    const moodsArray = Array.isArray(entry.moods) ? entry.moods : (entry.mood ? [entry.mood] : []);
    
    return moodsArray.includes(mood);
  });
};

// Filter entries by both tag and mood
const getFilteredEntries = (selectedTag, selectedMood) => {
  return entries.filter(entry => {
    // Check tag filter if applied
    let matchesTag = true;
    if (selectedTag) {
      const tagsArray = Array.isArray(entry.tags) ? entry.tags : [];
      matchesTag = tagsArray.includes(selectedTag);
    }
    
    // Check mood filter if applied
    let matchesMood = true;
    if (selectedMood) {
      const moodsArray = Array.isArray(entry.moods) ? entry.moods : (entry.mood ? [entry.mood] : []);
      matchesMood = moodsArray.includes(selectedMood);
    }
    
    // Entry must match both filters (if applied)
    return matchesTag && matchesMood;
  });
};
    
  // Delete an entry
  const deleteEntry = (id) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };
    
// Get mood statistics
const getMoodStats = () => {
  // Count occurrences of each mood
  const moodCounts = {};
  let totalMoodInstances = 0;
  
  entries.forEach(entry => {
    // Handle both old entries with mood (string) and new entries with moods (array)
    const moodsArray = Array.isArray(entry.moods) ? entry.moods : (entry.mood ? [entry.mood] : []);
    
    moodsArray.forEach(mood => {
      if (mood) {
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
        totalMoodInstances++;
      }
    });
  });
  
  // Get mood count by date (for last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const moodsByDate = [];
  entries
    .filter(entry => new Date(entry.date) >= thirtyDaysAgo)
    .forEach(entry => {
      // Handle both old entries with mood (string) and new entries with moods (array)
      const moodsArray = Array.isArray(entry.moods) ? entry.moods : (entry.mood ? [entry.mood] : []);
      
      moodsArray.forEach(mood => {
        if (mood) {
          moodsByDate.push({
            date: entry.date,
            mood: mood
          });
        }
      });
    });

  // Sort by date
  moodsByDate.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Most frequent mood
  let mostFrequentMood = 'None';
  let maxCount = 0;
  
  Object.entries(moodCounts).forEach(([mood, count]) => {
    if (count > maxCount) {
      mostFrequentMood = mood;
      maxCount = count;
    }
  });
  
  return {
    moodCounts,
    moodsByDate,
    mostFrequentMood,
    totalEntries: entries.length,
    totalMoodInstances,
    uniqueMoods: Object.keys(moodCounts).length
  };
};
    
return (
  <JournalContext.Provider value={{
    entries,
    getEntry,
    createEntry,
    updateEntry,
    deleteEntry,
    getMoodStats,
    cleanupEmptyEntries,
    getAllTags,
    getEntriesByTag,
    getAllMoods,         
    getEntriesByMood,    
    getFilteredEntries
  }}>
    {children}
  </JournalContext.Provider>
);
};