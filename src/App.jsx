import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Dashboard from './components/dashboard/Dashboard'
import Navigation from './components/layout/Navigation'
import Events from './pages/Events';
import Tasks from './pages/Tasks';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { TaskProvider } from './context/TaskContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Box } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#666666',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          fontFamily: 'Montserrat',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <EventProvider>
              <TaskProvider>
                <Router>
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    width: '100vw',
                    maxWidth: '100%',
                    overflowX: 'hidden'
                  }}>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <Box sx={{ 
                              width: '100%',
                              maxWidth: '100%',
                              overflowX: 'hidden'
                            }}>
                              <Navigation />
                              <Box component="main" sx={{ 
                                width: '100%',
                                maxWidth: '100%',
                                overflowX: 'hidden'
                              }}>
                                <Dashboard />
                              </Box>
                            </Box>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/events/*"
                        element={
                          <ProtectedRoute>
                            <Box sx={{ 
                              width: '100%',
                              maxWidth: '100%',
                              overflowX: 'hidden'
                            }}>
                              <Navigation />
                              <Box component="main" sx={{ 
                                width: '100%',
                                maxWidth: '100%',
                                overflowX: 'hidden'
                              }}>
                                <Events />
                              </Box>
                            </Box>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route
                        path="/tasks/*"
                        element={
                          <ProtectedRoute>
                            <Box sx={{ 
                              width: '100%',
                              maxWidth: '100%',
                              overflowX: 'hidden'
                            }}>
                              <Navigation />
                              <Box component="main" sx={{ 
                                width: '100%',
                                maxWidth: '100%',
                                overflowX: 'hidden'
                              }}>
                                <Tasks />
                              </Box>
                            </Box>
                          </ProtectedRoute>
                        }
                      />
                      
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </Box>
                </Router>
              </TaskProvider>
            </EventProvider>
          </AuthProvider>
        </LocalizationProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
