import React, { useState, useCallback, useMemo } from 'react';

const MoodCalendar = ({ entries, moodColors }) => {
  // State for tracking the currently displayed month/year
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Navigate to previous month
  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);
  
  // Navigate to next month
  const goToNextMonth = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);
  
  // Go to current month
  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);
  
  // Format date for display (Month YYYY)
  const formattedMonthYear = useMemo(() => {
    return currentDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  }, [currentDate]);
  
  // Generate calendar data for the current month
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get day of week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Total days in current month
    const daysInMonth = lastDay.getDate();
    
    // Calculate days from previous month to include
    const daysFromPrevMonth = firstDayOfWeek;
    
    // Calendar array to store all days
    const calendarDays = [];
    
    // Add days from previous month
    if (daysFromPrevMonth > 0) {
      const prevMonth = new Date(year, month, 0); // Last day of previous month
      const prevMonthDays = prevMonth.getDate();
      
      for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
        const date = new Date(year, month - 1, i);
        const dateStr = date.toISOString().split('T')[0];
        
        calendarDays.push({
          date,
          dateStr,
          day: i,
          isCurrentMonth: false,
          isPast: date < new Date(new Date().setHours(0, 0, 0, 0)),
          isToday: false,
          dayEntries: []
        });
      }
    }
    
    // Add days from current month
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Check if this is today
      const isToday = date.getFullYear() === today.getFullYear() &&
                      date.getMonth() === today.getMonth() &&
                      date.getDate() === today.getDate();
      
      calendarDays.push({
        date,
        dateStr,
        day: i,
        isCurrentMonth: true,
        isPast: date < today,
        isToday,
        dayEntries: []
      });
    }
    
    // Add days from next month to complete grid (always show 6 weeks = 42 days)
    const totalDaysNeeded = 42;
    const daysFromNextMonth = totalDaysNeeded - calendarDays.length;
    
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const date = new Date(year, month + 1, i);
      const dateStr = date.toISOString().split('T')[0];
      
      calendarDays.push({
        date,
        dateStr,
        day: i,
        isCurrentMonth: false,
        isPast: false,
        isToday: false,
        dayEntries: []
      });
    }
    
    return calendarDays;
  }, [currentDate]);
  
  // Add entries to the calendar days
  const calendarWithEntries = useMemo(() => {
    // Create a map of date strings to entries for faster lookup
    const entriesByDate = {};
    
    entries.forEach(entry => {
      if (!entriesByDate[entry.date]) {
        entriesByDate[entry.date] = [];
      }
      entriesByDate[entry.date].push(entry);
    });
    
    // Add entries to each calendar day
    return calendarData.map(day => {
      const dayEntries = entriesByDate[day.dateStr] || [];
      return { ...day, dayEntries };
    });
  }, [calendarData, entries]);
  
  // Get the dominant mood for a day's entries
  const getDominantMood = useCallback((dayEntries) => {
    if (!dayEntries || dayEntries.length === 0) return null;
    
    // Count occurrences of each mood
    const moodCounts = {};
    let totalMoods = 0;
    
    dayEntries.forEach(entry => {
      // Handle both old entries with mood (string) and new entries with moods (array)
      const moodsArray = Array.isArray(entry.moods) ? entry.moods : (entry.mood ? [entry.mood] : []);
      
      moodsArray.forEach(mood => {
        if (!mood) return;
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
        totalMoods++;
      });
    });
    
    if (totalMoods === 0) return null;
    
    // Find the mood with highest count
    return Object.entries(moodCounts)
      .sort((a, b) => b[1] - a[1])[0][0];
  }, []);
  
  // Get a color for a day based on its dominant mood
  const getDayColor = useCallback((dayEntries) => {
    const dominantMood = getDominantMood(dayEntries);
    return dominantMood ? moodColors[dominantMood] || '#bdc3c7' : null;
  }, [getDominantMood, moodColors]);
  
  // Get a lighter version of a color for backgrounds
  const getLighterColor = useCallback((hexColor) => {
    if (!hexColor) return 'transparent';
    
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Lighten by mixing with white (93% white, 7% original)
    const lightR = Math.floor(r * 0.07 + 255 * 0.93);
    const lightG = Math.floor(g * 0.07 + 255 * 0.93);
    const lightB = Math.floor(b * 0.07 + 255 * 0.93);
    
    return `rgba(${lightR}, ${lightG}, ${lightB}, 0.5)`;
  }, []);
  
  // Get all unique moods for a day
  const getDayMoods = useCallback((dayEntries) => {
    if (!dayEntries || dayEntries.length === 0) return [];
    
    const uniqueMoods = new Set();
    
    dayEntries.forEach(entry => {
      // Handle both old entries with mood (string) and new entries with moods (array)
      const moodsArray = Array.isArray(entry.moods) ? entry.moods : (entry.mood ? [entry.mood] : []);
      
      moodsArray.forEach(mood => {
        if (mood) uniqueMoods.add(mood);
      });
    });
    
    return Array.from(uniqueMoods);
  }, []);
  
  // Render functions
  const renderWeekdayNames = useMemo(() => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays.map((day, index) => (
      <div key={index} className="calendar-weekday">{day}</div>
    ));
  }, []);
  
  const renderCalendarDays = useMemo(() => {
    return calendarWithEntries.map((day, index) => {
      const moodColor = getDayColor(day.dayEntries);
      const bgColor = day.isCurrentMonth ? getLighterColor(moodColor) : undefined;
      const dayMoods = getDayMoods(day.dayEntries);
      
      return (
        <div
          key={index}
          className={`calendar-day ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${day.isToday ? 'today' : ''}`}
          style={{
            backgroundColor: bgColor,
            borderLeft: day.isCurrentMonth && moodColor ? `4px solid ${moodColor}` : undefined,
          }}
          aria-label={day.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        >
          <div className="calendar-day-number">{day.day}</div>
          
          {/* Entry count badge */}
          {day.dayEntries.length > 0 && (
            <div className="calendar-entry-count">{day.dayEntries.length}</div>
          )}
          
          {/* Mood indicators */}
          {dayMoods.length > 0 && (
            <div className="calendar-mood-indicators">
              {dayMoods.slice(0, 3).map((mood, moodIndex) => (
                <div
                  key={moodIndex}
                  className="calendar-mood-dot"
                  style={{ backgroundColor: moodColors[mood] || '#bdc3c7' }}
                  title={mood}
                />
              ))}
              {dayMoods.length > 3 && (
                <div className="calendar-mood-more">+{dayMoods.length - 3}</div>
              )}
            </div>
          )}
        </div>
      );
    });
  }, [calendarWithEntries, getDayColor, getDayMoods, getLighterColor, moodColors]);
  
  const renderLegend = useMemo(() => {
    // Get all unique moods that appear in the entries
    const uniqueMoods = new Set();
    
    entries.forEach(entry => {
      const moodsArray = Array.isArray(entry.moods) ? entry.moods : (entry.mood ? [entry.mood] : []);
      moodsArray.forEach(mood => {
        if (mood) uniqueMoods.add(mood);
      });
    });
    
    const moodsList = Array.from(uniqueMoods);
    
    // If no moods, show some defaults
    if (moodsList.length === 0) {
      return Object.entries(moodColors)
        .filter(([mood]) => mood !== 'Unspecified')
        .slice(0, 8)
        .map(([mood, color]) => (
          <div className="legend-item" key={mood}>
            <div className="legend-color" style={{ backgroundColor: color }} />
            <span className="legend-label">{mood}</span>
          </div>
        ));
    }
    
    // Otherwise, show just the moods that appear in entries
    return moodsList.map(mood => (
      <div className="legend-item" key={mood}>
        <div className="legend-color" style={{ backgroundColor: moodColors[mood] || '#bdc3c7' }} />
        <span className="legend-label">{mood}</span>
      </div>
    ));
  }, [entries, moodColors]);
  
  return (
    <div className="mood-calendar">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button
            className="calendar-nav-button"
            onClick={goToPreviousMonth}
            aria-label="Previous Month"
          >
            &lt;
          </button>
          <h3 className="calendar-title">{formattedMonthYear}</h3>
          <button
            className="calendar-nav-button"
            onClick={goToNextMonth}
            aria-label="Next Month"
          >
            &gt;
          </button>
        </div>
        <button
          className="today-button"
          onClick={goToToday}
        >
          Today
        </button>
      </div>
      
      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {renderWeekdayNames}
        </div>
        
        <div className="calendar-days">
          {renderCalendarDays}
        </div>
      </div>
      
      <div className="calendar-legend">
        <div className="legend-title">Mood Colors:</div>
        <div className="legend-items">
          {renderLegend}
        </div>
      </div>
    </div>
  );
};

export default MoodCalendar;