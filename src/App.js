import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import JournalList from './components/JournalList';
import JournalEditor from './components/JournalEditor';
import Header from './components/Header';
import Login from './components/auth/Login';
import { JournalProvider } from './context/JournalContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppContent() {
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();

  return (
    <div className="container">
      {isAuthenticated && <Header />}
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="page-transition"
        >
          <Routes location={location}>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/" /> : <Login onLogin={login} />
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <JournalList />
              </ProtectedRoute>
            } />
            <Route path="/edit/:id" element={
              <ProtectedRoute>
                <JournalEditor />
              </ProtectedRoute>
            } />
            <Route path="/new" element={
              <ProtectedRoute>
                <JournalEditor />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <JournalProvider>
        <AppContent />
      </JournalProvider>
    </AuthProvider>
  );
}

export default App;