
import React, { useState, useEffect } from 'react';

// Enhanced SpeechToTextButton with a more elegant design
  const SpeechToTextButton = ({ onTranscriptReceived, label = "Too tired to type? Talk it out" }) => {
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [animationActive, setAnimationActive] = useState(false);

  // Initialize speech recognition on component mount
  useEffect(() => {
    // Check for browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      setErrorMessage('Speech recognition is not supported by your browser.');
      return;
    }

    // Initialize the SpeechRecognition object
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Configure recognition
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // Default language

    // Handle results
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join(' ');
      
      // Only send final results to parent component
      if (event.results[0].isFinal) {
        onTranscriptReceived(transcript);
      }
    };

    // Handle errors
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setErrorMessage(`Error: ${event.error}`);
      setIsListening(false);
      setAnimationActive(false);
    };

    // Handle end of speech session
    recognition.onend = () => {
      setIsListening(false);
      setAnimationActive(false);
    };

    // Store the recognition object in state
    setSpeechRecognition(recognition);

    // Clean up on unmount
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [onTranscriptReceived]);

  // Toggle speech recognition
  const toggleListening = () => {
    if (!isSupported) {
      alert('Speech recognition is not supported by your browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      speechRecognition.stop();
      setIsListening(false);
      setAnimationActive(false);
    } else {
      setErrorMessage('');
      speechRecognition.start();
      setIsListening(true);
      // Start animation with a slight delay for better visual effect
      setTimeout(() => setAnimationActive(true), 100);
    }
  };

  return (
    <div className="speech-control-wrapper">
      {errorMessage && (
        <div className="speech-error-banner">
          {errorMessage}
        </div>
      )}
      
      <div className={`speech-control ${isListening ? 'listening' : ''}`}>
        <div className="speech-prompt">{label}</div>
        
        <button 
          className={`speech-button ${isListening ? 'listening' : ''}`}
          onClick={toggleListening}
          title={isListening ? 'Click to stop dictation' : 'Click to start dictation'}
          disabled={!isSupported}
        >
          <div className="microphone-icon">
            <span className="icon-base">🎤</span>
            {isListening && (
              <div className={`speech-waves ${animationActive ? 'active' : ''}`}>
                <span className="wave wave1"></span>
                <span className="wave wave2"></span>
                <span className="wave wave3"></span>
              </div>
            )}
          </div>
          <span className="speech-button-text">
            {isListening ? 'Listening...' : 'Start Speaking'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SpeechToTextButton;