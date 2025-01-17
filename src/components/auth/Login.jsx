import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import EventIcon from '@mui/icons-material/Event';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    console.log('Login attempt with:', { email, password });
    // For demo purposes, we'll just navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
      }}
    >
      <Grid container>
        {/* Left Section - Hero Image */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            position: 'relative',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 8,
            color: 'white',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url('https://idaete.com/wp-content/uploads/2025/01/business-people-walking-trade-show-booths-ideal-websites-magazines-layouts-scaled.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
            },
          }}
        >
          <Box sx={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <EventIcon sx={{ fontSize: 72, mb: 4 }} />
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                fontFamily: 'Montserrat',
                letterSpacing: '-1px'
              }}
            >
              EventFlow
            </Typography>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                mb: 4, 
                fontWeight: 500,
                fontFamily: 'Montserrat',
                letterSpacing: '-0.5px'
              }}
            >
              Streamline Your Event Management
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.9, 
                lineHeight: 1.6,
                fontFamily: 'Montserrat',
                fontWeight: 400
              }}
            >
              Create, manage, and track your events with ease. Assign tasks, manage attendees,
              and keep everything organized in one place. Perfect for event planners and organizers.
            </Typography>
          </Box>
        </Grid>

        {/* Right Section - Login Form */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: { xs: 4, md: 6 },
            backgroundColor: 'white',
          }}
        >
          <Box sx={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                mb: 4,
                fontFamily: 'Montserrat',
                letterSpacing: '-0.5px',
                color: '#333'
              }}
            >
              Welcome Back
            </Typography>
            <Box component="form" onSubmit={handleLogin}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  mb: 2,
                  '& .MuiInputLabel-root': {
                    fontFamily: 'Montserrat'
                  },
                  '& .MuiInputBase-input': {
                    fontFamily: 'Montserrat'
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#333',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#333',
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  mb: 3,
                  '& .MuiInputLabel-root': {
                    fontFamily: 'Montserrat'
                  },
                  '& .MuiInputBase-input': {
                    fontFamily: 'Montserrat'
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#333',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#333',
                    },
                  },
                }}
              />
              <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Link
                  href="#"
                  sx={{
                    color: '#666',
                    textDecoration: 'none',
                    fontFamily: 'Montserrat',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#333',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  borderRadius: '8px',
                  fontFamily: 'Montserrat',
                  fontWeight: 600,
                  backgroundColor: '#333',
                  '&:hover': {
                    backgroundColor: '#000',
                  },
                }}
              >
                Sign In
              </Button>
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'Montserrat',
                    color: '#666',
                  }}
                >
                  Don't have an account?{' '}
                  <Link
                    href="#"
                    sx={{
                      color: '#333',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign up here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
