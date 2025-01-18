import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Add as AddIcon, Event as EventIcon, Person as PersonIcon, Assignment as TaskIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

const PageHeader = ({ 
  title,
  subtitle,
  showActions = false,
  onCreateEvent,
  onAddAttendee,
  onAddTask,
  onLogout
}) => {
  const { user } = useAuth();
  const [greeting, setGreeting] = React.useState('');
  const [currentTime, setCurrentTime] = React.useState('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 17) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
      setCurrentTime(format(now, 'h:mm a'));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const userName = user?.fullName || user?.firstName || user?.displayName || '';

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '300px',
          position: 'relative',
          mt: 0,
          backgroundImage: `url('https://idaete.com/wp-content/uploads/2025/01/blurred-people-walking-scaled.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 0,
          },
        }}
      >
        <Container 
          maxWidth={false}
          sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'left' }}>
            <Typography variant="h3" sx={{ mb: 1, fontFamily: 'Montserrat' }}>
              {title || `${greeting}, ${userName}`}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8, fontFamily: 'Montserrat' }}>
              {subtitle || `${currentTime} - Welcome back to your dashboard`}
            </Typography>
          </Box>
        </Container>
      </Box>

      {showActions && (
        <Container 
          maxWidth={false}
          sx={{ 
            mt: -8,
            mb: 6,
            position: 'relative',
            zIndex: 1,
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            {onCreateEvent && (
              <Button
                variant="contained"
                startIcon={<EventIcon />}
                onClick={onCreateEvent}
                sx={{
                  bgcolor: '#333',
                  '&:hover': { bgcolor: '#000' },
                  py: 1.5,
                }}
              >
                Create Event
              </Button>
            )}
            {onAddAttendee && (
              <Button
                variant="contained"
                startIcon={<PersonIcon />}
                onClick={onAddAttendee}
                sx={{
                  bgcolor: '#333',
                  '&:hover': { bgcolor: '#000' },
                  py: 1.5,
                }}
              >
                Add Attendee
              </Button>
            )}
            {onAddTask && (
              <Button
                variant="contained"
                startIcon={<TaskIcon />}
                onClick={onAddTask}
                sx={{
                  bgcolor: '#333',
                  '&:hover': { bgcolor: '#000' },
                  py: 1.5,
                }}
              >
                Add Task
              </Button>
            )}
          </Box>
        </Container>
      )}
    </>
  );
};

export default PageHeader;
