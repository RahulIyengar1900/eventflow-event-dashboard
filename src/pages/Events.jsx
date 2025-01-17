import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import CreateEventModal from '../components/modals/CreateEventModal';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/common/Footer';

const Events = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  const events = [
    {
      title: 'Tech Conference 2025',
      date: 'Jan 20',
      time: '09:00 AM',
      location: 'Convention Center',
      attendees: 120,
      image: 'https://idaete.com/wp-content/uploads/2025/01/ideal-websites-magazines-layouts-scaled.jpg',
      description: 'Join us for the biggest tech conference of the year.',
      status: 'Upcoming',
    },
    {
      title: 'Product Launch',
      date: 'Jan 25',
      time: '02:00 PM',
      location: 'Innovation Hub',
      attendees: 85,
      image: 'https://idaete.com/wp-content/uploads/2025/01/blurred-business-people-walking-trade-show-booths-including-copy-space-ideal-websites-magazines-layouts-scaled.jpg',
      description: 'Be part of our exclusive product launch event.',
      status: 'Upcoming',
    },
    {
      title: 'Design Workshop',
      date: 'Jan 28',
      time: '10:00 AM',
      location: 'Creative Studio',
      attendees: 45,
      image: 'https://idaete.com/wp-content/uploads/2025/01/art-school-student-consulting-drawing-master-scaled.jpg',
      description: 'Interactive workshop on modern design principles.',
      status: 'Upcoming',
    },
    {
      title: 'Networking Mixer',
      date: 'Feb 1',
      time: '06:00 PM',
      location: 'Skyline Lounge',
      attendees: 150,
      image: 'https://idaete.com/wp-content/uploads/2025/01/group-young-caucasian-people-celebrating-look-happy-have-corporate-party-office-bar-scaled.jpg',
      description: 'Evening of networking and collaboration.',
      status: 'Upcoming',
    },
    // Add more events here...
  ];

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Manage Your Events" />
      
      <Box sx={{ px: { xs: 3, md: 6 }, pb: 6, flex: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleFilterClick}
              sx={{
                borderColor: '#333',
                color: '#333',
                '&:hover': {
                  borderColor: '#000',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                },
              }}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateEvent(true)}
              sx={{
                backgroundColor: '#333',
                '&:hover': {
                  backgroundColor: '#000',
                },
              }}
            >
              Create Event
            </Button>
          </Box>
        </Box>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem onClick={handleFilterClose}>All Events</MenuItem>
          <MenuItem onClick={handleFilterClose}>Upcoming Events</MenuItem>
          <MenuItem onClick={handleFilterClose}>Past Events</MenuItem>
          <MenuItem onClick={handleFilterClose}>This Month</MenuItem>
        </Menu>

        {/* Events Grid */}
        <Grid container spacing={4}>
          {events.map((event, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 0,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={event.image}
                    alt={event.title}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 2,
                    }}
                  >
                    <IconButton
                      sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}
                      onClick={handleMenuClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: 'rgba(0, 0, 0, 0.6)',
                      color: 'white',
                      p: 3,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 600,
                      }}
                    >
                      {event.title}
                    </Typography>
                  </Box>
                </Box>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={event.status}
                      size="small"
                      sx={{
                        backgroundColor: '#333',
                        color: 'white',
                        fontFamily: 'Montserrat',
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: 'Montserrat',
                        color: '#666',
                        mb: 2,
                      }}
                    >
                      {event.description}
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CalendarTodayIcon sx={{ mr: 1, color: '#666' }} />
                        <Typography sx={{ fontFamily: 'Montserrat' }}>
                          {event.date}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon sx={{ mr: 1, color: '#666' }} />
                        <Typography sx={{ fontFamily: 'Montserrat' }}>
                          {event.time}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOnIcon sx={{ mr: 1, color: '#666' }} />
                        <Typography sx={{ fontFamily: 'Montserrat' }}>
                          {event.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <GroupIcon sx={{ mr: 1, color: '#666' }} />
                        <Typography sx={{ fontFamily: 'Montserrat' }}>
                          {event.attendees} Attendees
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Event Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Edit Event</MenuItem>
          <MenuItem onClick={handleMenuClose}>Duplicate Event</MenuItem>
          <MenuItem onClick={handleMenuClose}>Share Event</MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: '#ef5350' }}>
            Cancel Event
          </MenuItem>
        </Menu>

        {/* Create Event Modal */}
        <CreateEventModal
          open={openCreateEvent}
          onClose={() => setOpenCreateEvent(false)}
        />
      </Box>

      <Footer />
    </Box>
  );
};

export default Events;
