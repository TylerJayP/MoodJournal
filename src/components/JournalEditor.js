import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJournal } from '../context/JournalContext';
import MoodSelector from './MoodSelector';
import PromptGenerator from './PromptGenerator';

const JournalEditor = () => {
  const [entry, setEntry] = useState(null);
  const [prompt, setPrompt] = useState('');
  const { getEntry, updateEntry, createEntry, deleteEntry } = useJournal();
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id === 'new') {
      // Check if this is an intentional creation
      const isIntentionalCreation = sessionStorage.getItem('intentionalCreation');
      if (isIntentionalCreation) {
        // Clear the flag
        sessionStorage.removeItem('intentionalCreation');
        // Create the entry
        setEntry(createEntry());
      } else {
        // Not an intentional creation, redirect to home page
        navigate('/');
      }
    } else {
      const foundEntry = getEntry(id);
      if (foundEntry) {
        setEntry(foundEntry);
      } else {
        navigate('/');
      }
    }
  }, [id, getEntry, createEntry, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedEntry = { ...entry, [name]: value };
    setEntry(updatedEntry);
    updateEntry(updatedEntry);
  };
  
  const handleMoodSelect = (mood) => {
    const updatedEntry = { ...entry, mood };
    setEntry(updatedEntry);
    updateEntry(updatedEntry);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(entry.id);
      navigate('/');
    }
  };

  const handleGeneratePrompt = () => {
    const newPrompt = PromptGenerator.getRandomPrompt();
    setPrompt(newPrompt);
    
    // Set the prompt as the title
    const updatedEntry = { ...entry, title: newPrompt };
    setEntry(updatedEntry);
    updateEntry(updatedEntry);
  };
  
  if (!entry) return <div>Loading...</div>;
  
  return (
    <div className="editor">
      <div className="editor-header">
        <h2>Journal Entry</h2>
        <div>
          <button onClick={() => navigate('/')} className="close-button">
            Close
          </button>
          {entry.id && (
            <button onClick={handleDelete} style={{ backgroundColor: '#e74c3c', marginLeft: '10px' }}>
              Delete
            </button>
          )}
        </div>
      </div>
      
      <label>Date</label>
      <input
        type="date"
        name="date"
        value={entry.date}
        onChange={handleChange}
        className="animate-input"
      />
      
      <label>Your Name</label>
      <input
        type="text"
        name="name"
        value={entry.name}
        onChange={handleChange}
        placeholder="Enter your name"
        className="animate-input"
      />
      
      <label>How are you feeling today?</label>
      <MoodSelector selectedMood={entry.mood} onSelectMood={handleMoodSelect} />
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label>Title</label>
        <button onClick={handleGeneratePrompt} className="prompt-button" style={{ marginLeft: '10px' }}>
          Generate Prompt
        </button>
      </div>
      
      {prompt && (
        <div className="prompt-suggestion">
          Prompt: {prompt}
        </div>
      )}
      
      <input
        type="text"
        name="title"
        value={entry.title}
        onChange={handleChange}
        placeholder="Enter a title for your entry"
        className="animate-input"
      />
      
      <label>Journal Entry</label>
      <textarea
        name="description"
        value={entry.description}
        onChange={handleChange}
        placeholder="Write about your day..."
        className="animate-input"
      />
      
      {/* Gratitude Section */}
      <label>Gratitude Journal</label>
      <div className="gratitude-container">
        <p className="gratitude-description">What are you grateful for today?</p>
        <textarea
          name="gratitude"
          value={entry.gratitude || ''}
          onChange={handleChange}
          placeholder="List three things you're thankful for today..."
          className="animate-input gratitude-textarea"
        />
      </div>
    </div>
  );
};

export default JournalEditor;
