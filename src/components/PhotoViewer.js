import React from 'react';

const PhotoViewer = ({ photoSrc, onClose, caption }) => {
  return (
    <div className="photo-viewer-overlay" onClick={onClose}>
      <div className="photo-viewer-container">
        <img 
          src={photoSrc} 
          alt="Daily highlight in fullscreen view" 
          className="full-photo" 
          onClick={(e) => e.stopPropagation()}
        />
        {caption && (
          <div className="photo-viewer-caption">
            {caption}
          </div>
        )}
        <button className="close-photo-button" onClick={onClose}>
          <span>✕</span>
          <span>Close</span>
        </button>
      </div>
    </div>
  );
};

export default PhotoViewer;