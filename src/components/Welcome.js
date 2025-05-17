import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Welcome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Tutorial steps
  const tutorialSteps = [
    {
      title: `Welcome to Mood Journal, ${user?.username}!`,
      description: "Track your moods, reflect on your feelings, and gain insights into your emotional well-being.",
      features: [
        { icon: "📝", text: "Record daily entries" },
        { icon: "😊", text: "Track your moods" },
        { icon: "📊", text: "View mood insights" },
        { icon: "🙏", text: "Practice gratitude" }
      ]
    },
    {
      title: "Record Your Feelings",
      description: "Your journal entries can include your mood, a title, and your thoughts. Express yourself freely in a safe, private space.",
      image: "journal-entry"
    },
    {
      title: "Track Your Mood",
      description: "Select from various mood options to track how you're feeling each day. This helps identify patterns over time.",
      image: "mood-tracking"
    },
    {
      title: "Practice Gratitude",
      description: "Use the gratitude section to record things you're thankful for. Gratitude practice has been shown to improve mental well-being.",
      image: "gratitude"
    },
    {
      title: "View Your Insights",
      description: "As you continue journaling, you'll get personalized mood insights and visualizations to better understand your emotional patterns.",
      image: "insights"
    }
  ];
  
  // Handler for the Skip button
  const handleSkip = () => {
    // Save that user has completed onboarding
    localStorage.setItem(`welcomeCompleted_${user.username}`, 'true');
    navigate('/');
  };
  
  // Handler for the "Start Journaling" button
  const handleStartJournal = () => {
    // Save that user has completed onboarding
    localStorage.setItem(`welcomeCompleted_${user.username}`, 'true');
    // Navigate to home page instead of new entry
    navigate('/');
  };
  
  // Navigate to the next tutorial step
  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Navigate to the previous tutorial step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Current step data
  const step = tutorialSteps[currentStep];
  
  // Render image for steps with images
  const renderStepImage = (imageName) => {
    // For demonstration, we'll use colored divs with icons as placeholders
    // In a real app, you would use actual images
    const imageStyles = {
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '60px',
      margin: '20px 0',
      borderRadius: '8px'
    };
    
    switch(imageName) {
      case 'journal-entry':
        return (
          <div style={{...imageStyles, background: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)'}}>
            📝
          </div>
        );
      case 'mood-tracking':
        return (
          <div style={{...imageStyles, background: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)'}}>
            😊😔😡
          </div>
        );
      case 'gratitude':
        return (
          <div style={{...imageStyles, background: 'linear-gradient(135deg, #84fab0, #8fd3f4)'}}>
            🙏
          </div>
        );
      case 'insights':
        return (
          <div style={{...imageStyles, background: 'linear-gradient(135deg, #fa709a, #fee140)'}}>
            📊
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-header">
          <h2>{step.title}</h2>
          <button 
            className="welcome-close" 
            onClick={handleSkip}
            title="Skip tutorial"
          >
            ×
          </button>
        </div>
        
        <div className="welcome-content">
          <p>{step.description}</p>
          
          {/* Features grid for the first step */}
          {step.features && (
            <div className="welcome-features">
              {step.features.map((feature, index) => (
                <div className="welcome-feature" key={index}>
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-text">{feature.text}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* Image for other steps */}
          {step.image && renderStepImage(step.image)}
          
          {/* Progress indicators */}
          <div className="welcome-progress">
            {tutorialSteps.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${index === currentStep ? 'active' : ''}`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="welcome-footer">
          {/* Navigation buttons */}
          <div className="welcome-navigation">
            {currentStep > 0 && (
              <button 
                className="nav-button prev-button"
                onClick={prevStep}
              >
                Previous
              </button>
            )}
            
            {currentStep < tutorialSteps.length - 1 ? (
              <button 
                className="nav-button next-button"
                onClick={nextStep}
              >
                Next
              </button>
            ) : (
              <button 
                className="start-journal-button"
                onClick={handleStartJournal}
              >
                Start Journaling
              </button>
            )}
          </div>
          
          {/* Skip tutorial link */}
          <div className="tutorial-skip">
            <span onClick={handleSkip}>Skip tutorial</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;