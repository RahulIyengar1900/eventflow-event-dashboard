import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData && !isAuthenticated) {
      login(JSON.parse(userData));
    }
  }, []);

  if (!isAuthenticated && !localStorage.getItem('userData')) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
