import React from 'react';
import ResourceCard from './ResourceCard';

const Resources = ({ recommendations }) => {
  // Fallback recommendations for when there are no mood-specific ones
  const fallbackRecommendations = [
    {
      category: 'mindfulness',
      title: 'Five Minute Meditation',
      description: 'Try a quick five-minute meditation to center yourself and bring awareness to the present moment.',
      type: 'technique',
      link: null
    },
    {
      category: 'gratitude',
      title: 'Gratitude Journal',
      description: 'Take a moment to write down three things you\'re grateful for today, no matter how small they might seem.',
      type: 'technique',
      link: null
    }
  ];

  // Check if recommendations exists and has length, otherwise use fallbacks
  const displayRecommendations = (!recommendations || recommendations.length === 0) 
    ? fallbackRecommendations 
    : recommendations;

  // Log the recommendations for debugging
  console.log('Rendering resources with recommendations:', displayRecommendations);

  return (
    <div className="resources-container">
      <h3 className="resources-title">
        <span className="resources-icon">🧰</span>
        Recommended Resources
      </h3>
      
      <div className="resources-description">
        Based on your mood patterns, these resources might be helpful:
      </div>
      
      <div className="resources-list">
        {displayRecommendations.map((resource, index) => (
          <ResourceCard key={index} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default Resources;