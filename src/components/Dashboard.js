import React, { useEffect, useRef, useState } from 'react';
import { useJournal } from '../context/JournalContext';

// Simple visualization with SVG
const Dashboard = ({ onClose }) => {
  const { getMoodStats } = useJournal();
  const stats = getMoodStats();
  const chartRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Define mood colors (same as in MoodIcons.js)
  const moodColors = {
    'Happy': '#f1c40f',
    'Excited': '#e67e22',
    'Peaceful': '#2ecc71',
    'Grateful': '#3498db',
    'Loved': '#e84393',
    'Proud': '#9b59b6',
    'Hopeful': '#1abc9c',
    'Content': '#27ae60',
    'Calm': '#00cec9',
    'Sad': '#3498db',
    'Frustrated': '#e74c3c',
    'Tired': '#95a5a6',
    'Upset': '#9b59b6',
    'Anxious': '#ff7f50',
    'Overwhelmed': '#d35400',
    'Depressed': '#34495e',
    'Angry': '#c0392b',
    'Nervous': '#fd79a8',
    'Bored': '#636e72',
    'Confused': '#6c5ce7',
    'Unspecified': '#bdc3c7'
  };
  
  // Simple animation for statistics on mount
  useEffect(() => {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach((statValue, index) => {
      setTimeout(() => {
        statValue.style.opacity = '1';
        statValue.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);
  
  // Create a simple bar chart
  const createChart = () => {
    const moodCounts = stats.moodCounts;
    const svgWidth = chartRef.current ? chartRef.current.clientWidth : 600;
    const svgHeight = 250;
    const barPadding = 20;
    
    // Sort moods by count in descending order
    const moods = Object.keys(moodCounts).sort((a, b) => 
      moodCounts[b] - moodCounts[a]
    ).slice(0, 10); // Show top 10 moods
    
    const maxCount = Math.max(...Object.values(moodCounts), 1);
    
    if (moods.length === 0) return <text x="50%" y="50%" textAnchor="middle">No mood data yet</text>;
    
    const barWidth = (svgWidth - 60) / moods.length - barPadding;
    
    return moods.map((mood, index) => {
      const barHeight = moodCounts[mood] / maxCount * (svgHeight - 60);
      const barX = 30 + index * (barWidth + barPadding);
      const barY = svgHeight - barHeight - 30;
      
      return (
        <g key={mood}>
          <rect
            x={barX}
            y={barY}
            width={barWidth}
            height={barHeight}
            fill={moodColors[mood] || '#bdc3c7'}
            rx={4}
            ry={4}
            style={{
              transition: 'height 1s ease, y 1s ease',
              opacity: 0.8
            }}
          />
          <text
            x={barX + barWidth / 2}
            y={svgHeight - 10}
            textAnchor="middle"
            fill="#7f8c8d"
            fontSize="12"
          >
            {mood}
          </text>
          <text
            x={barX + barWidth / 2}
            y={barY - 5}
            textAnchor="middle"
            fill="#2c3e50"
            fontSize="12"
            fontWeight="bold"
          >
            {moodCounts[mood]}
          </text>
        </g>
      );
    });
  };
  
  // Group entries by date for the history view
  const createMoodHistory = () => {
    // Get the last 14 days
    const dateEntries = {};
    const today = new Date();
    
    // Initialize the last 14 days
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dateEntries[dateStr] = [];
    }
    
    // Fill in the moods from stats.moodsByDate
    stats.moodsByDate.forEach(entry => {
      if (dateEntries[entry.date]) {
        dateEntries[entry.date].push(entry.mood);
      }
    });
    
    // Convert to array and sort by date
    return Object.entries(dateEntries)
      .map(([date, moods]) => ({ date, moods }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  
  const moodHistory = createMoodHistory();
  
  // Format date as "MMM DD"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Mood Insights</h2>
        <button onClick={onClose} className="dashboard-toggle">Close Dashboard</button>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={`dashboard-tab ${activeTab === 'overview' ? 'active' : ''}`} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`dashboard-tab ${activeTab === 'history' ? 'active' : ''}`} 
          onClick={() => setActiveTab('history')}
        >
          Mood History
        </button>
      </div>
      
      {activeTab === 'overview' && (
        <div className="dashboard-overview">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-label">Total Entries</div>
              <div className="stat-value" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
                {stats.totalEntries}
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-label">Most Common Mood</div>
              <div className="stat-value" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease', color: moodColors[stats.mostFrequentMood] || '#3498db' }}>
                {stats.mostFrequentMood}
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-label">Unique Moods Tracked</div>
              <div className="stat-value" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
                {stats.uniqueMoods}
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-label">Total Mood Instances</div>
              <div className="stat-value" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
                {stats.totalMoodInstances}
              </div>
            </div>
          </div>
          
          <div className="chart-container" ref={chartRef}>
            <h3 className="mood-distribution-title">Mood Distribution</h3>
            <div className="mood-distribution-info">
              <strong>Top {Math.min(10, Object.keys(stats.moodCounts).length)} moods</strong> tracked in your journal
            </div>
            <svg width="100%" height="250">
              {createChart()}
            </svg>
          </div>
          
          <div>
            <h3>Your Mood Colors</h3>
            <div className="mood-dots">
              {Object.entries(moodColors).map(([mood, color]) => (
                mood !== 'Unspecified' && stats.moodCounts[mood] > 0 && (
                  <div 
                    key={mood}
                    className="mood-dot"
                    style={{ backgroundColor: color }}
                    title={mood}
                  >
                    {mood.substring(0, 1)}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'history' && (
        <div className="dashboard-history">
          <h3 className="mood-history-title">Your Mood Journey (Last 14 Days)</h3>
          
          <div className="mood-history-carousel">
            <div className="mood-history-wrapper">
              <div className="mood-timeline">
                {moodHistory.map((day, index) => (
                  <div className="mood-day" key={index}>
                    <div className="mood-day-date">{formatDate(day.date)}</div>
                    <div className="mood-day-moods">
                      {day.moods.length > 0 ? (
                        day.moods.map((mood, moodIndex) => (
                          <div 
                            key={moodIndex}
                            className="mood-day-indicator"
                            style={{ backgroundColor: moodColors[mood] || '#bdc3c7' }}
                            title={mood}
                          />
                        ))
                      ) : (
                        <div 
                          className="mood-day-indicator"
                          style={{ backgroundColor: '#f1f1f1', opacity: 0.3 }}
                          title="No moods recorded"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mood-legend">
            <div className="mood-legend-title">Common Moods:</div>
            {Object.entries(moodColors)
              .filter(([mood]) => stats.moodCounts[mood] > 0)
              .sort(([moodA], [moodB]) => stats.moodCounts[moodB] - stats.moodCounts[moodA])
              .slice(0, 10)
              .map(([mood, color]) => (
                <div className="mood-legend-item" key={mood}>
                  <div 
                    className="mood-legend-color" 
                    style={{ backgroundColor: color }}
                  />
                  <span>{mood}</span>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;