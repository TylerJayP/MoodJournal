import React from 'react';

const ResourceCard = ({ resource }) => {
  // Icon mapping based on resource type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'app':
        return '📱';
      case 'book':
        return '📚';
      case 'technique':
        return '🧠';
      case 'tool':
        return '🔧';
      case 'service':
        return '🔗';
      default:
        return '💡';
    }
  };
  
  // Get category style
  const getCategoryStyle = (category) => {
    const categoryColors = {
      anxiety: { bg: '#e0f7fa', text: '#00838f', border: '#4dd0e1' },
      depression: { bg: '#f3e5f5', text: '#6a1b9a', border: '#ab47bc' },
      stress: { bg: '#fff3e0', text: '#e65100', border: '#ffb74d' },
      sleep: { bg: '#e8eaf6', text: '#283593', border: '#7986cb' },
      motivation: { bg: '#ffebee', text: '#c62828', border: '#ef5350' },
      mindfulness: { bg: '#e0f2f1', text: '#00695c', border: '#4db6ac' },
      gratitude: { bg: '#f1f8e9', text: '#558b2f', border: '#aed581' },
      selfEsteem: { bg: '#ede7f6', text: '#4527a0', border: '#9575cd' },
      creativity: { bg: '#fff8e1', text: '#ff8f00', border: '#ffd54f' },
      relationships: { bg: '#fce4ec', text: '#c2185b', border: '#f48fb1' }
    };
    
    return categoryColors[category] || { bg: '#f5f5f5', text: '#424242', border: '#9e9e9e' };
  };
  
  const style = getCategoryStyle(resource.category);
  
  return (
    <div className="resource-card" style={{ backgroundColor: style.bg, borderColor: style.border }}>
      <div className="resource-type-icon" style={{ color: style.text }}>
        {getTypeIcon(resource.type)}
      </div>
      <div className="resource-content">
        <h4 className="resource-title" style={{ color: style.text }}>{resource.title}</h4>
        <p className="resource-description">{resource.description}</p>
        {resource.link && (
          <a 
            href={resource.link} 
            className="resource-link" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: style.text }}
          >
            Learn more
            <span className="resource-link-arrow">→</span>
          </a>
        )}
      </div>
      <div className="resource-category-tag" style={{ backgroundColor: style.text }}>
        {resource.category}
      </div>
    </div>
  );
};

export default ResourceCard;