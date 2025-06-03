import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJournal } from '../context/JournalContext';
import MoodSelector from './MoodSelector';
import TagSelector from './TagSelector';
import PromptGenerator from './PromptGenerator';
import PhotoViewer from './PhotoViewer';
import SpeechToTextButton from './SpeechToTextButton';

const JournalEditor = () => {
  const [entry, setEntry] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false); // New state for toggle
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
        // Set photo preview if entry has a photo
        if (foundEntry.photo) {
          setPhotoPreview(foundEntry.photo);
          setShowPhotoUpload(true); // If an entry has a photo, show the photo section
        }
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
  
  // Toggle handler for photo section
  const handlePhotoToggle = (e) => {
    setShowPhotoUpload(e.target.checked);
    
    // If unchecking and there was a photo, remove it
    if (!e.target.checked && photoPreview) {
      handleRemovePhoto();
    }
  };
  
  // Handler for receiving speech transcript for the main journal entry
  const handleJournalTranscript = (transcript) => {
    if (!entry) return;
    
    // Append the transcript to the current description, adding a space if needed
    const currentText = entry.description || '';
    const updatedText = currentText + (currentText.length > 0 && !currentText.endsWith(' ') ? ' ' : '') + transcript;
    
    const updatedEntry = { ...entry, description: updatedText };
    setEntry(updatedEntry);
    updateEntry(updatedEntry);
  };
  
  // Handler for receiving speech transcript for the gratitude section
  const handleGratitudeTranscript = (transcript) => {
    if (!entry) return;
    
    // Append the transcript to the current gratitude text, adding a space if needed
    const currentText = entry.gratitude || '';
    const updatedText = currentText + (currentText.length > 0 && !currentText.endsWith(' ') ? ' ' : '') + transcript;
    
    const updatedEntry = { ...entry, gratitude: updatedText };
    setEntry(updatedEntry);
    updateEntry(updatedEntry);
  };
  
  const handleMoodSelect = (moods) => {
    const updatedEntry = { ...entry, moods };
    setEntry(updatedEntry);
    updateEntry(updatedEntry);
  };
  
  const handleTagsChange = (tags) => {
    const updatedEntry = { ...entry, tags };
    setEntry(updatedEntry);
    updateEntry(updatedEntry);
  };
  
  const resizeImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
    return new Promise((resolve) => {
      // Create a FileReader to read the file
      const reader = new FileReader();
      
      // Set up the FileReader onload handler
      reader.onload = (readerEvent) => {
        // Create an image object
        const img = new Image();
        img.onload = () => {
          // Calculate new dimensions
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          
          // Create a canvas with the desired dimensions
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          // Draw the image on the canvas
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get the data from canvas as a dataURL
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          
          // Resolve the promise with the dataURL
          resolve(dataUrl);
        };
        
        // Set the image source to the reader result
        img.src = readerEvent.target.result;
      };
      
      // Read the file as a Data URL
      reader.readAsDataURL(file);
    });
  };
  
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    
    // Check file size (limit to 10MB for initial upload, we'll resize it)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }
    
    try {
      // Resize the image
      const resizedImage = await resizeImage(file);
      
      // Set the resized image as the photo preview
      setPhotoPreview(resizedImage);
      
      // Update entry with the resized image data
      const updatedEntry = { ...entry, photo: resizedImage };
      setEntry(updatedEntry);
      updateEntry(updatedEntry);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('There was an error processing your image. Please try again.');
    }
  };
  
  // Function to handle clicking on the photo
  const handlePhotoClick = () => {
    setShowPhotoViewer(true);
  };
  
  // Function to remove the photo
  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    const updatedEntry = { ...entry, photo: null, photoCaption: '' };
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

      <label>Tags</label>
      <TagSelector
        selectedTags={entry.tags || []}
        onTagsChange={handleTagsChange}
      />
      
      <label>How are you feeling today?</label>
      <MoodSelector selectedMoods={entry.moods || []} onSelectMood={handleMoodSelect} />
      
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
      
      {/* Enhanced Speech-to-Text for Journal Entry */}
      <SpeechToTextButton 
        onTranscriptReceived={handleJournalTranscript}
        label="Too tired to type? Talk it out"
      />
      
      {/* Gratitude Section */}
      <label>Gratitude Journal</label>
      <div className="gratitude-container">
        <p className="gratitude-description">What are you grateful for today?</p>
        <textarea
          name="gratitude"
          value={entry.gratitude || ''}
          onChange={handleChange}
          placeholder="List things you're thankful for today..."
          className="animate-input gratitude-textarea"
        />
        
        {/* Enhanced Speech-to-Text for Gratitude */}
        <SpeechToTextButton 
          onTranscriptReceived={handleGratitudeTranscript}
          label="Share your gratitude through voice"
        />
      </div>
      
      {/* Photo Toggle - Moved to bottom */}
      <div className="photo-toggle-container">
        <label className="photo-toggle-label">
          <input 
            type="checkbox" 
            checked={showPhotoUpload}
            onChange={handlePhotoToggle}
            className="photo-toggle-checkbox"
          />
          <span className="photo-toggle-text">Include a photo highlight for today?</span>
        </label>
      </div>
      
      {/* Photo of the Day Section - Only show when toggled on */}
      {showPhotoUpload && (
        <div className="photo-section">
          <div className="photo-upload-container">
            {!photoPreview ? (
              <div className="photo-upload-area">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="photo-upload" className="photo-upload-button">
                  <div className="upload-icon">📷</div>
                  <span>Upload a Photo Highlight</span>
                </label>
                <p className="photo-upload-help">
                  Add a photo that captures a special moment from your day
                </p>
              </div>
            ) : (
              <div className="photo-preview-container">
                <div className="photo-preview-wrapper">
                  <img 
                    src={photoPreview} 
                    alt="Daily highlight" 
                    className="photo-preview" 
                    onClick={handlePhotoClick}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <div className="photo-caption-container">
                  <textarea
                    name="photoCaption"
                    value={entry.photoCaption || ''}
                    onChange={handleChange}
                    placeholder="Why did you choose this photo? What makes it special?"
                    className="animate-input photo-caption-input"
                  />
                </div>
                <div className="photo-actions">
                  <button 
                    onClick={handleRemovePhoto}
                    className="remove-photo-button"
                  >
                    <span className="remove-icon">🗑️</span>
                    <span>Remove Photo</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Photo Viewer */}
      {showPhotoViewer && photoPreview && (
        <PhotoViewer 
          photoSrc={photoPreview}
          caption={entry.photoCaption}
          onClose={() => setShowPhotoViewer(false)} 
        />
      )}
    </div>
  );
};

export default JournalEditor;