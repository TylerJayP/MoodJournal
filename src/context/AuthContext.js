import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in (on app load)
  useEffect(() => {
    const checkLoggedIn = () => {
      const userData = localStorage.getItem('moodJournalUser');
      
      if (userData) {
        const parsedUser = JSON.parse(userData);
        
        // Load user profile if available
        if (parsedUser.username) {
          const profileKey = `userProfile_${parsedUser.username}`;
          const savedProfile = localStorage.getItem(profileKey);
          
          if (savedProfile) {
            const profileData = JSON.parse(savedProfile);
            // Merge profile data with user data
            parsedUser.displayName = profileData.displayName || parsedUser.username;
            parsedUser.icon = profileData.icon || 'default';
            parsedUser.bio = profileData.bio || '';
          } else {
            // Set defaults if no profile exists
            parsedUser.displayName = parsedUser.username;
            parsedUser.icon = 'default';
            parsedUser.bio = '';
          }
        }
        
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    };
    
    checkLoggedIn();
  }, []);

  // Login function
  const login = (userData) => {
    // Check if there's a profile for this user
    if (userData.username) {
      const profileKey = `userProfile_${userData.username}`;
      const savedProfile = localStorage.getItem(profileKey);
      
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        // Merge profile data with user data
        userData.displayName = profileData.displayName || userData.username;
        userData.icon = profileData.icon || 'default';
        userData.bio = profileData.bio || '';
      } else {
        // Set defaults
        userData.displayName = userData.username;
        userData.icon = 'default';
        userData.bio = '';
      }
    }
    
    setUser(userData);
    setIsAuthenticated(true);
    
    // Update localStorage
    localStorage.setItem('moodJournalUser', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('moodJournalUser');
    setUser(null);
    setIsAuthenticated(false);
  };
  
  // Update user profile
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('moodJournalUser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;