import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  FileCopy as FileCopyIcon,
  Share as ShareIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';

const Events = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleMenuClick = (event, eventData) => {
    setAnchorEl(event.currentTarget);
    setSelectedEvent(eventData);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    setEditDialog(true);
  };

  const handleDuplicate = () => {
    // Implement duplicate logic
    handleMenuClose();
  };

  const handleShare = () => {
    handleMenuClose();
    setShareDialog(true);
  };

  const handleCancel = () => {
    handleMenuClose();
    setCancelDialog(true);
  };

  const events = [
    {
      id: 1,
      title: 'Design Workshop 2025',
      date: '2025-02-15',
      location: 'San Francisco, CA',
      status: 'upcoming',
      image: 'https://idaete.com/wp-content/uploads/2025/01/group-diverse-people-attending-startup-business-course-scaled.jpg',
      description: 'Join us for an immersive design workshop focused on the latest UI/UX trends.',
    },
    {
      id: 2,
      title: 'Tech Conference',
      date: '2025-03-01',
      location: 'New York, NY',
      status: 'this-month',
      image: 'https://idaete.com/wp-content/uploads/2025/01/art-school-student-consulting-drawing-master-scaled.jpg',
      description: 'The biggest tech conference of the year featuring industry leaders and innovators.',
    },
    {
      id: 3,
      title: 'Team Building Event',
      date: '2025-03-15',
      location: 'Austin, TX',
      status: 'upcoming',
      image: 'https://idaete.com/wp-content/uploads/2025/01/group-young-caucasian-people-celebrating-look-happy-have-corporate-party-office-bar-scaled.jpg',
      description: 'A day of team-building activities and networking opportunities.',
    },
    {
      id: 4,
      title: 'Product Launch',
      date: '2025-01-10',
      location: 'Seattle, WA',
      status: 'past',
      image: 'https://idaete.com/wp-content/uploads/2025/01/expo-essence-dynamic-crowd-dynamics-blurred-hues-scaled.jpg',
      description: 'Join us for the launch of our revolutionary new product.',
    },
    {
      id: 5,
      title: 'Innovation Summit',
      date: '2025-02-28',
      location: 'Boston, MA',
      status: 'this-month',
      image: 'https://idaete.com/wp-content/uploads/2025/01/blurred-people-trade-fair-2-scaled.jpg',
      description: 'A gathering of thought leaders discussing future innovations.',
    },
    {
      id: 6,
      title: 'Marketing Symposium',
      date: '2025-04-05',
      location: 'Chicago, IL',
      status: 'upcoming',
      image: 'https://idaete.com/wp-content/uploads/2025/01/ideal-websites-magazines-layouts-scaled.jpg',
      description: 'Learn about the latest marketing strategies and trends.',
    },
    {
      id: 7,
      title: 'Startup Showcase',
      date: '2025-01-20',
      location: 'Miami, FL',
      status: 'past',
      image: 'https://idaete.com/wp-content/uploads/2025/01/trade-show-visitors-walking-trade-fair-booths-scaled.jpg',
      description: 'A platform for startups to showcase their innovative solutions.',
    },
    {
      id: 8,
      title: 'Leadership Conference',
      date: '2025-03-25',
      location: 'Los Angeles, CA',
      status: 'upcoming',
      image: 'https://idaete.com/wp-content/uploads/2025/01/ideal-websites-magazines-layouts-2-scaled.jpg',
      description: 'Develop your leadership skills with industry experts.',
    },
  ];

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.status === filter);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <PageHeader
        title="Events"
        subtitle="Manage and track all your events in one place"
      />
      
      <Box sx={{ px: { xs: 3, md: 6 }, pb: 6 }}>
        {/* Filter */}
        <Box sx={{ mb: 4 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter Events</InputLabel>
            <Select
              value={filter}
              label="Filter Events"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="all">All Events</MenuItem>
              <MenuItem value="upcoming">Upcoming Events</MenuItem>
              <MenuItem value="this-month">This Month</MenuItem>
              <MenuItem value="past">Past Events</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Events Grid */}
        <Grid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ height: '100%', position: 'relative' }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.image}
                    alt={event.title}
                  />
                  {event.status === 'upcoming' && (
                    <Chip
                      label="Upcoming"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        bgcolor: 'error.main',
                        color: 'white',
                        border: '1px solid white',
                      }}
                    />
                  )}
                </Box>
                <CardContent sx={{ textAlign: 'left' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" gutterBottom>
                      {event.title}
                    </Typography>
                    <IconButton onClick={(e) => handleMenuClick(e, event)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {event.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {event.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {event.location}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Event Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDuplicate}>
          <FileCopyIcon sx={{ mr: 1 }} /> Duplicate
        </MenuItem>
        <MenuItem onClick={handleShare}>
          <ShareIcon sx={{ mr: 1 }} /> Share
        </MenuItem>
        <MenuItem onClick={handleCancel}>
          <CancelIcon sx={{ mr: 1 }} /> Cancel
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            defaultValue={selectedEvent?.title}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            defaultValue={selectedEvent?.date}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            variant="outlined"
            defaultValue={selectedEvent?.location}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            defaultValue={selectedEvent?.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareDialog} onClose={() => setShareDialog(false)}>
        <DialogTitle>Share Event</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Email Addresses"
            fullWidth
            variant="outlined"
            helperText="Enter email addresses separated by commas"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialog(false)}>Cancel</Button>
          <Button variant="contained">Share</Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialog} onClose={() => setCancelDialog(false)}>
        <DialogTitle>Cancel Event</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel {selectedEvent?.title}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialog(false)}>No, Keep Event</Button>
          <Button color="error" variant="contained">Yes, Cancel Event</Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default Events;
