const ResourceRecommender = {
  // Resource categories with multiple recommendations for each
  resources: {
    anxiety: [
      {
        title: "Calm - Meditation App",
        description: "Guided meditations specifically designed for anxiety relief.",
        type: "app",
        link: "https://www.calm.com"
      },
      {
        title: "Breathing Exercises",
        description: "Try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8 seconds.",
        type: "technique",
        link: null
      },
      {
        title: "Anxiety & Worry Workbook",
        description: "Evidence-based cognitive behavioral therapy techniques for managing anxiety.",
        type: "book",
        link: null
      }
    ],
    depression: [
      {
        title: "Woebot - AI Therapy Chatbot",
        description: "24/7 support using evidence-based cognitive behavioral therapy techniques.",
        type: "app",
        link: "https://woebothealth.com"
      },
      {
        title: "Morning Sunlight Exposure",
        description: "15 minutes of morning sunlight can help regulate mood and sleep cycles.",
        type: "technique",
        link: null
      },
      {
        title: "Talk Space - Online Therapy",
        description: "Connect with licensed therapists for professional support.",
        type: "service",
        link: "https://www.talkspace.com"
      }
    ],
    stress: [
      {
        title: "Headspace - Meditation App",
        description: "Short, guided meditations and stress-relief exercises.",
        type: "app",
        link: "https://www.headspace.com"
      },
      {
        title: "Progressive Muscle Relaxation",
        description: "Tense and release muscle groups to reduce physical tension.",
        type: "technique",
        link: null
      },
      {
        title: "The Stress-Proof Brain",
        description: "Book with science-based approaches to building resilience.",
        type: "book",
        link: null
      }
    ],
    sleep: [
      {
        title: "Sleep Cycle App",
        description: "Tracks sleep patterns and wakes you during light sleep phase.",
        type: "app",
        link: "https://www.sleepcycle.com"
      },
      {
        title: "White Noise Machine/App",
        description: "Consistent background sound to mask disturbances and improve sleep quality.",
        type: "tool",
        link: null
      },
      {
        title: "Bedtime Routine",
        description: "Create a 30-minute wind-down routine before sleep to signal your body it's time to rest.",
        type: "technique",
        link: null
      }
    ],
    motivation: [
      {
        title: "Habitica",
        description: "Turn your tasks into a game with rewards and accountability.",
        type: "app",
        link: "https://habitica.com"
      },
      {
        title: "Pomodoro Technique",
        description: "Work in focused 25-minute intervals with 5-minute breaks.",
        type: "technique",
        link: null
      },
      {
        title: "Atomic Habits",
        description: "Book on building positive habits and breaking negative ones.",
        type: "book",
        link: null
      }
    ],
    mindfulness: [
      {
        title: "Insight Timer",
        description: "Free library of guided meditations and mindfulness practices.",
        type: "app",
        link: "https://insighttimer.com"
      },
      {
        title: "Five Senses Exercise",
        description: "Notice 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste.",
        type: "technique",
        link: null
      },
      {
        title: "The Miracle of Mindfulness",
        description: "Classic book on incorporating mindfulness into everyday activities.",
        type: "book",
        link: null
      }
    ],
    gratitude: [
      {
        title: "Gratitude Journal App",
        description: "Dedicated app for recording and reflecting on things you're grateful for.",
        type: "app",
        link: "https://www.gratefulness.io"
      },
      {
        title: "Three Good Things Practice",
        description: "Write down three positive things that happened each day and why they happened.",
        type: "technique",
        link: null
      },
      {
        title: "Gratitude Meditation",
        description: "Focus on feeling thankful for different aspects of your life during meditation.",
        type: "technique",
        link: null
      }
    ],
    selfEsteem: [
      {
        title: "ThoughtDiary",
        description: "App to identify and challenge negative self-talk patterns.",
        type: "app",
        link: null
      },
      {
        title: "Self-Compassion Practices",
        description: "Treat yourself with the same kindness you would offer a good friend.",
        type: "technique",
        link: "https://self-compassion.org"
      },
      {
        title: "Radical Acceptance",
        description: "Practice accepting reality without judgment to reduce suffering.",
        type: "technique",
        link: null
      }
    ],
    creativity: [
      {
        title: "Oblique Strategies",
        description: "Random creative prompts to overcome blocks and generate new ideas.",
        type: "tool",
        link: null
      },
      {
        title: "Morning Pages",
        description: "Write three pages of stream-of-consciousness thought each morning to unlock creativity.",
        type: "technique",
        link: null
      },
      {
        title: "The Artist's Way",
        description: "Classic book on discovering and recovering your creative self.",
        type: "book",
        link: null
      }
    ],
    relationships: [
      {
        title: "Active Listening Practice",
        description: "Focus completely on the speaker, acknowledge feelings, and reflect back what you hear.",
        type: "technique",
        link: null
      },
      {
        title: "Nonviolent Communication",
        description: "Framework for expressing needs and understanding others without blame.",
        type: "technique",
        link: null
      },
      {
        title: "The Five Love Languages",
        description: "Book on understanding different ways people express and receive love.",
        type: "book",
        link: null
      }
    ]
  },
  
  // Map moods to resource categories
  moodToResourceMap: {
    // Negative moods
    'Anxious': 'anxiety',
    'Nervous': 'anxiety',
    'Depressed': 'depression',
    'Sad': 'depression',
    'Frustrated': 'stress',
    'Overwhelmed': 'stress',
    'Angry': 'stress',
    'Tired': 'sleep',
    'Bored': 'motivation',
    'Upset': 'selfEsteem',
    'Confused': 'mindfulness',
    
    // Positive moods
    'Happy': 'gratitude',
    'Grateful': 'gratitude',
    'Peaceful': 'mindfulness',
    'Content': 'mindfulness',
    'Calm': 'mindfulness',
    'Excited': 'creativity',
    'Hopeful': 'motivation',
    'Proud': 'selfEsteem',
    'Loved': 'relationships'
  },
  
  // Get resource recommendations based on mood patterns
  getRecommendations: function(moodCounts, totalMoodInstances) {
    console.log('ResourceRecommender called with:', { moodCounts, totalMoodInstances });
    const recommendations = [];
    
    // Check if we have enough data
    if (!moodCounts || !totalMoodInstances || totalMoodInstances < 1) {
      console.log('Not enough mood data for recommendations');
      return recommendations;
    }
    
    // Calculate the frequency of each mood
    const moodFrequency = {};
    Object.entries(moodCounts).forEach(([mood, count]) => {
      moodFrequency[mood] = count / totalMoodInstances;
    });
    
    console.log('Mood frequencies:', moodFrequency);
    
    // Find the most common moods (>= 10% frequency, lowered from 20%)
    const significantMoods = Object.entries(moodFrequency)
      .filter(([mood, frequency]) => frequency >= 0.1) // Lowered threshold
      .sort((a, b) => b[1] - a[1])
      .map(([mood]) => mood);
    
    console.log('Significant moods:', significantMoods);
    
    // If no significant moods found, just use the top 2 moods
    if (significantMoods.length === 0) {
      const topMoods = Object.entries(moodFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([mood]) => mood);
      
      console.log('No significant moods found, using top moods:', topMoods);
      significantMoods.push(...topMoods);
    }
    
    // Get unique resource categories based on significant moods
    const resourceCategories = new Set();
    significantMoods.forEach(mood => {
      const category = this.moodToResourceMap[mood];
      if (category) {
        resourceCategories.add(category);
      }
    });
    
    console.log('Resource categories:', Array.from(resourceCategories));
    
    // If we still don't have any categories, add some defaults
    if (resourceCategories.size === 0) {
      console.log('No resource categories found, adding defaults');
      resourceCategories.add('mindfulness');
      resourceCategories.add('gratitude');
    }
    
    // Get one recommendation for each resource category (up to 3 categories)
    Array.from(resourceCategories).slice(0, 3).forEach(category => {
      if (this.resources[category]) {
        // Select a random resource from the category
        const resourceList = this.resources[category];
        const randomIndex = Math.floor(Math.random() * resourceList.length);
        const resource = resourceList[randomIndex];
        
        recommendations.push({
          category: category,
          title: resource.title,
          description: resource.description,
          type: resource.type,
          link: resource.link
        });
      }
    });
    
    console.log('Final recommendations:', recommendations);
    return recommendations;
  }
};

export default ResourceRecommender;