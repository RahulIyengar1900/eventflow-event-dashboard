import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Container,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    try {
      if (isSignUp) {
        if (!formData.fullName || !formData.email || !formData.password) {
          setSnackbar({
            open: true,
            message: 'Please fill in all fields',
            severity: 'error'
          });
          return;
        }
        
        // Create account
        const userData = {
          firstName: formData.fullName.split(' ')[0],
          lastName: formData.fullName.split(' ').slice(1).join(' '),
          fullName: formData.fullName,
          email: formData.email,
        };
        
        login(userData);
        setSnackbar({
          open: true,
          message: 'Account created successfully!',
          severity: 'success'
        });
        
        // Wait for snackbar to show before navigating
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        // Handle login
        if (!formData.email || !formData.password) {
          setSnackbar({
            open: true,
            message: 'Please enter both email and password',
            severity: 'error'
          });
          return;
        }
        
        // For demo, allow any login
        const userData = {
          firstName: 'Demo',
          lastName: 'User',
          fullName: 'Demo User',
          email: formData.email,
        };
        
        login(userData);
        navigate('/dashboard');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'An error occurred. Please try again.',
        severity: 'error'
      });
    }
  };

  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://idaete.com/wp-content/uploads/2025/01/blurred-people-walking-scaled.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        }}
      />

      {/* Content */}
      <Container 
        maxWidth={false} 
        sx={{ 
          display: 'flex',
          position: 'relative',
          zIndex: 1,
          m: 0,
          p: { xs: 2, md: 6 },
          overflow: 'hidden',
        }}
      >
        {/* Left Side - Text */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white',
            pr: 6,
            textAlign: 'left',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontFamily: 'Montserrat',
            }}
          >
            EventFlow
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontFamily: 'Montserrat',
            }}
          >
            Streamline Your Event Management
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: '600px',
              opacity: 0.8,
              fontFamily: 'Montserrat',
            }}
          >
            Efficiently manage your events, track attendees, and organize tasks all in one place.
            Join thousands of event planners who trust EventFlow for their event management needs.
          </Typography>
        </Box>

        {/* Right Side - Form */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 4,
              width: '100%',
              maxWidth: '400px',
              backgroundColor: 'white',
              position: 'relative',
            }}
          >
            {isSignUp && (
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                }}
                onClick={() => setIsSignUp(false)}
              >
                <CloseIcon />
              </IconButton>
            )}
            
            <Typography variant="h4" sx={{ mb: 4, fontFamily: 'Montserrat' }}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </Typography>
            
            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  margin="normal"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              )}
              
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                margin="normal"
                required
                type="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Password"
                name="password"
                margin="normal"
                required
                type="password"
                value={formData.password}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{
                  mb: 2,
                  bgcolor: '#333',
                  '&:hover': {
                    bgcolor: '#000',
                  },
                }}
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
              
              {isSignUp ? (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setIsSignUp(false)}
                    sx={{
                      flex: 1,
                      borderColor: '#333',
                      color: '#333',
                      '&:hover': {
                        borderColor: '#000',
                        bgcolor: 'rgba(0,0,0,0.05)',
                      },
                    }}
                  >
                    Back
                  </Button>
                </Box>
              ) : (
                <Button
                  fullWidth
                  onClick={() => setIsSignUp(true)}
                  sx={{
                    color: '#666',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  Don't have an account? Sign Up
                </Button>
              )}
            </form>
          </Paper>
        </Box>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
