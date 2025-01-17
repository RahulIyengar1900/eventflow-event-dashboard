import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Custom Logo component
const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="24" height="20" rx="0" fill="#333"/>
    <rect x="8" y="4" width="4" height="6" rx="0" fill="#333"/>
    <rect x="20" y="4" width="4" height="6" rx="0" fill="#333"/>
    <rect x="8" y="14" width="16" height="2" fill="white"/>
    <rect x="8" y="18" width="12" height="2" fill="white"/>
    <rect x="8" y="22" width="8" height="2" fill="white"/>
  </svg>
);

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <AppBar 
      position="absolute" 
      sx={{ 
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        margin: '20px',
        width: 'calc(100% - 40px)',
        borderRadius: '8px',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <Logo />
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: 'flex',
            fontFamily: 'Montserrat',
            fontWeight: 700,
            color: '#333',
            textDecoration: 'none',
            letterSpacing: '-0.5px',
          }}
        >
          EventFlow
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          {!isLoginPage && (
            <>
              <Button
                sx={{ 
                  color: '#333',
                  fontFamily: 'Montserrat',
                  fontWeight: 500,
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  },
                }}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              <Button
                sx={{ 
                  color: '#333',
                  fontFamily: 'Montserrat',
                  fontWeight: 500,
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  },
                }}
                onClick={() => navigate('/events')}
              >
                Events
              </Button>
              <Button
                sx={{ 
                  color: '#333',
                  fontFamily: 'Montserrat',
                  fontWeight: 500,
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  },
                }}
                onClick={() => navigate('/tasks')}
              >
                Tasks
              </Button>
            </>
          )}
        </Box>

        {!isLoginPage && (
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{ 
              color: '#333', 
              borderColor: '#333',
              fontFamily: 'Montserrat',
              fontWeight: 500,
              borderRadius: 0,
              '&:hover': {
                borderColor: '#000',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
