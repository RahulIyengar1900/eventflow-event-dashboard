import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#333',
        color: 'white',
        py: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontFamily: 'Montserrat', fontWeight: 700, mb: 2 }}>
              EventFlow
            </Typography>
            <Typography sx={{ fontFamily: 'Montserrat', color: 'rgba(255,255,255,0.7)' }}>
              Streamline your event management with our powerful platform.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontFamily: 'Montserrat', fontWeight: 700, mb: 2 }}>
              Quick Links
            </Typography>
            <Link href="#" sx={{ display: 'block', color: 'rgba(255,255,255,0.7)', mb: 1, textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Events
            </Link>
            <Link href="#" sx={{ display: 'block', color: 'rgba(255,255,255,0.7)', mb: 1, textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Attendees
            </Link>
            <Link href="#" sx={{ display: 'block', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
              Tasks
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontFamily: 'Montserrat', fontWeight: 700, mb: 2 }}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, color: 'rgba(255,255,255,0.7)' }} />
              <Typography sx={{ fontFamily: 'Montserrat', color: 'rgba(255,255,255,0.7)' }}>
                support@eventflow.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ mr: 1, color: 'rgba(255,255,255,0.7)' }} />
              <Typography sx={{ fontFamily: 'Montserrat', color: 'rgba(255,255,255,0.7)' }}>
                +1 (555) 123-4567
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <Typography sx={{ fontFamily: 'Montserrat', color: 'rgba(255,255,255,0.7)' }}>
            © 2025 EventFlow. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
