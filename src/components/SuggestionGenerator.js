const SuggestionGenerator = {
  generateSuggestions: (stats, entries) => {
    const suggestions = [];
    
    // Check if we have enough data to make meaningful suggestions
    if (!stats || entries.length < 3) {
      return [
        {
          type: 'general',
          icon: '💡',
          title: 'Keep Journaling',
          content: 'Continue adding journal entries to receive personalized insights and suggestions based on your mood patterns.'
        }
      ];
    }
    
    // Calculate mood prevalence
    const moodPrevalence = {};
    Object.entries(stats.moodCounts).forEach(([mood, count]) => {
      moodPrevalence[mood] = count / stats.totalMoodInstances;
    });
    
    // Check for dominant positive moods
    const positiveModds = ['Happy', 'Excited', 'Peaceful', 'Grateful', 'Loved', 'Proud', 'Hopeful', 'Content', 'Calm'];
    const positiveMoodCount = positiveModds.reduce((sum, mood) => 
      sum + (stats.moodCounts[mood] || 0), 0);
    const positiveMoodPercentage = positiveMoodCount / stats.totalMoodInstances;
    
    // Check for dominant negative moods
    const negativeModds = ['Sad', 'Frustrated', 'Tired', 'Upset', 'Anxious', 'Overwhelmed', 'Depressed', 'Angry', 'Nervous', 'Bored', 'Confused'];
    const negativeMoodCount = negativeModds.reduce((sum, mood) => 
      sum + (stats.moodCounts[mood] || 0), 0);
    const negativeMoodPercentage = negativeMoodCount / stats.totalMoodInstances;
    
    // Look for common tags associated with positive/negative moods
    const tagMoodAssociations = {};
    entries.forEach(entry => {
      const entryMoods = Array.isArray(entry.moods) ? entry.moods : (entry.mood ? [entry.mood] : []);
      const entryTags = Array.isArray(entry.tags) ? entry.tags : [];
      
      entryTags.forEach(tag => {
        if (!tagMoodAssociations[tag]) {
          tagMoodAssociations[tag] = {
            positive: 0,
            negative: 0,
            total: 0
          };
        }
        
        entryMoods.forEach(mood => {
          tagMoodAssociations[tag].total++;
          
          if (positiveModds.includes(mood)) {
            tagMoodAssociations[tag].positive++;
          } else if (negativeModds.includes(mood)) {
            tagMoodAssociations[tag].negative++;
          }
        });
      });
    });
    
    // Check for consistency in journaling
    const dates = entries.map(entry => new Date(entry.date).toISOString().split('T')[0]);
    const uniqueDates = new Set(dates);
    const latestEntryDate = new Date(Math.max(...entries.map(entry => new Date(entry.date))));
    const daysSinceLatestEntry = Math.floor((new Date() - latestEntryDate) / (1000 * 60 * 60 * 24));
    
    // Generate suggestions based on analysis
    
    // 1. Consistency suggestion
    if (daysSinceLatestEntry > 3) {
      suggestions.push({
        type: 'consistency',
        icon: '📆',
        title: 'Get Back on Track',
        content: `It's been ${daysSinceLatestEntry} days since your last entry. Regular journaling helps track your mood patterns and emotional well-being.`
      });
    } else if (uniqueDates.size < entries.length * 0.8) {
      suggestions.push({
        type: 'consistency',
        icon: '🔄',
        title: 'Consistency Matters',
        content: 'Try to journal every day, even briefly. Consistent entries provide better insights into your emotional patterns.'
      });
    }
    
    // 2. Mood-based suggestions
    if (positiveMoodPercentage > 0.7) {
      suggestions.push({
        type: 'positive',
        icon: '🌟',
        title: 'Celebrate Your Positivity',
        content: 'You\'ve been experiencing a lot of positive emotions lately. Take a moment to reflect on what\'s contributing to this positivity in your life.'
      });
    } else if (negativeMoodPercentage > 0.7) {
      suggestions.push({
        type: 'support',
        icon: '💙',
        title: 'Be Gentle With Yourself',
        content: 'You\'ve been experiencing some challenging emotions lately. Remember that all feelings are valid, and consider activities that boost your mood.'
      });
    }
    
    // 3. Specific mood suggestions
    if (moodPrevalence['Anxious'] > 0.3) {
      suggestions.push({
        type: 'wellness',
        icon: '🧘',
        title: 'Managing Anxiety',
        content: 'You\'ve mentioned feeling anxious frequently. Consider trying mindfulness techniques or brief meditation sessions.'
      });
    } else if (moodPrevalence['Tired'] > 0.3) {
      suggestions.push({
        type: 'wellness',
        icon: '💤',
        title: 'Energy and Rest',
        content: 'Feeling tired has been common in your entries. It might be worth reviewing your sleep routine or stress levels.'
      });
    }
    
    // 4. Tag-based insights
    const tagInsights = Object.entries(tagMoodAssociations)
      .filter(([tag, stats]) => stats.total >= 3)  // Only consider tags with enough data
      .map(([tag, stats]) => {
        const positiveRatio = stats.positive / stats.total;
        const negativeRatio = stats.negative / stats.total;
        
        if (positiveRatio > 0.7) {
          return {
            tag,
            sentiment: 'positive',
            strength: positiveRatio
          };
        } else if (negativeRatio > 0.7) {
          return {
            tag,
            sentiment: 'negative',
            strength: negativeRatio
          };
        }
        return null;
      })
      .filter(insight => insight !== null)
      .sort((a, b) => b.strength - a.strength);
    
    if (tagInsights.length > 0) {
      const topInsight = tagInsights[0];
      
      if (topInsight.sentiment === 'positive') {
        suggestions.push({
          type: 'insight',
          icon: '✨',
          title: `Positive Influence: ${topInsight.tag}`,
          content: `When you journal about "${topInsight.tag}", you tend to express more positive emotions. This may be an area that brings you joy!`
        });
      } else {
        suggestions.push({
          type: 'insight',
          icon: '🔍',
          title: `Challenging Area: ${topInsight.tag}`,
          content: `Entries tagged with "${topInsight.tag}" often contain more challenging emotions. This might be an area to explore further.`
        });
      }
    }
    
    // 5. Add a general suggestion if we need more
    if (suggestions.length < 2) {
      suggestions.push({
        type: 'general',
        icon: '📝',
        title: 'Enhance Your Journal',
        content: 'Try using both tags and photos in your entries to track life events alongside your emotions for richer insights.'
      });
    }
    
    // Limit to 3 suggestions maximum
    return suggestions.slice(0, 3);
  }
};

export default SuggestionGenerator;