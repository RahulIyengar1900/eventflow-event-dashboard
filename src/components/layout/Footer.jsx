import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 3,
        px: { xs: 3, md: 6 },
        mt: 'auto',
        backgroundColor: '#333',
        color: 'white',
      }}
    >
      <Typography variant="body2" sx={{ textAlign: 'left' }}>
        © {new Date().getFullYear()} EventFlow. All rights reserved.{' '}
        <Link
          color="inherit"
          href="#"
          sx={{
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Terms
        </Link>
        {' • '}
        <Link
          color="inherit"
          href="#"
          sx={{
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Privacy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
