import React from 'react';

const AISuggestions = ({ suggestions }) => {
  // Check if suggestions exists and has length
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  // Log the suggestions for debugging
  console.log('Rendering suggestions:', suggestions);

  return (
    <div className="ai-suggestions-container">
      <h3 className="ai-suggestions-title">
        <span className="ai-icon">✨</span>
        Personalized Insights
      </h3>
      
      <div className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index} 
            className={`suggestion-card suggestion-${suggestion.type}`}
          >
            <div className="suggestion-icon">{suggestion.icon}</div>
            <div className="suggestion-content">
              <h4 className="suggestion-title">{suggestion.title}</h4>
              <p className="suggestion-text">{suggestion.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AISuggestions;