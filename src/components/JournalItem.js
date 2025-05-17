import React from 'react';

const JournalItem = ({ entry }) => {
  const { name, date, mood, title } = entry;
  
  return (
    <div className="journal-item">
      <div className="journal-header">
        <span className={`mood-badge mood-${mood}`}>{mood || 'No mood'}</span>
        <span className="journal-date">{date}</span>
      </div>
      <h3>{title || 'Untitled Entry'}</h3>
      <p>{name}</p>
    </div>
  );
};

export default JournalItem;
