import React from 'react';
import { Box, Typography } from '@mui/material';

const PageHeader = ({ title }) => {
  const timeOfDay = () => {
    const hour = new Date('2025-01-17T09:56:38+05:30').getHours();
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  };

  const userName = 'John'; // This should come from your auth context

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mb: 6,
        mt: -8,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('https://idaete.com/wp-content/uploads/2025/01/ideal-websites-magazines-layouts-scaled.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          px: { xs: 3, md: 6 },
          pt: { xs: 12, md: 14 },
          pb: { xs: 8, md: 10 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Montserrat',
            fontWeight: 700,
            color: 'white',
            mb: 2,
          }}
        >
          Good {timeOfDay()}, {userName}!
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Montserrat',
            color: 'white',
            opacity: 0.9,
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default PageHeader;
