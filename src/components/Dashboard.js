import React, { useEffect, useRef } from 'react';
import { useJournal } from '../context/JournalContext';

// Simple visualization with SVG
const Dashboard = ({ onClose }) => {
  const { getMoodStats } = useJournal();
  const stats = getMoodStats();
  const chartRef = useRef(null);
  
  const moodColors = {
    'Happy': '#f1c40f',
    'Sad': '#3498db',
    'Frustrated': '#e74c3c',
    'Tired': '#95a5a6',
    'Upset': '#9b59b6',
    'Anxious': '#ff7f50',
    'Depressed': '#34495e',
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
    const barPadding = 30;
    const moods = Object.keys(moodCounts);
    const maxCount = Math.max(...Object.values(moodCounts), 1);
    
    if (moods.length === 0) return <text x="50%" y="50%" textAnchor="middle">No mood data yet</text>;
    
    const barWidth = (svgWidth - 40) / moods.length - barPadding;
    
    return moods.map((mood, index) => {
      const barHeight = moodCounts[mood] / maxCount * (svgHeight - 60);
      const barX = 20 + index * (barWidth + barPadding);
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
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Mood Insights</h2>
        <button onClick={onClose} className="dashboard-toggle">Close Dashboard</button>
      </div>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-label">Total Entries</div>
          <div className="stat-value" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
            {stats.totalEntries}
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Most Frequent Mood</div>
          <div className="stat-value" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease', color: moodColors[stats.mostFrequentMood] || '#3498db' }}>
            {stats.mostFrequentMood}
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Different Moods Tracked</div>
          <div className="stat-value" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
            {Object.keys(stats.moodCounts).length}
          </div>
        </div>
      </div>
      
      <div className="chart-container" ref={chartRef}>
        <h3>Mood Distribution</h3>
        <svg width="100%" height="250">
          {createChart()}
        </svg>
      </div>
      
      <div>
        <h3>Your Mood Colors</h3>
        <div className="mood-dots">
          {Object.entries(moodColors).map(([mood, color]) => (
            mood !== 'Unspecified' && (
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
  );
};

export default Dashboard;
