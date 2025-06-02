const JournalItem = ({ entry }) => {
  const { name, date, moods, title, photo, tags } = entry;
  
  // Handle both old entries with mood (string) and new entries with moods (array)
  const moodsArray = Array.isArray(moods) ? moods : (entry.mood ? [entry.mood] : []);
  
  // Ensure tags is an array
  const tagsArray = Array.isArray(tags) ? tags : [];
  
  return (
    <div className="journal-item">
      <div className="journal-header">
        <div className="mood-badges">
          {moodsArray.length > 0 ? (
            moodsArray.map((mood, index) => (
              <span key={index} className={`mood-badge mood-${mood}`}>
                {mood}
              </span>
            ))
          ) : (
            <span className="mood-badge mood-none">No mood</span>
          )}
        </div>
        <span className="journal-date">{date}</span>
      </div>
      <h3>{title || 'Untitled Entry'}</h3>
      <p>{name}</p>
      
      {/* Display tags if present */}
      {tagsArray.length > 0 && (
        <div className="journal-tags">
          {tagsArray.map((tag, index) => (
            <span key={index} className="journal-tag-pill">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Photo indicator */}
      {photo && (
        <div className="photo-indicator">
          <span role="img" aria-label="photo">📷</span>
        </div>
      )}
    </div>
  );
};

export default JournalItem;