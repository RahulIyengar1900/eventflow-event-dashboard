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
  Snackbar,
  Alert
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  FileCopy as FileCopyIcon,
  Share as ShareIcon,
  Cancel as CancelIcon,
  Event as EventIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';
import { useEvents } from '../context/EventContext';

const Events = () => {
  const { events, addEvent } = useEvents();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);
  const [filter, setFilter] = useState('all');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

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

  const handleCreateEvent = async (eventData) => {
    try {
      const newEvent = await addEvent(eventData);
      setEditDialog(false);
      setSnackbar({
        open: true,
        message: 'Event created successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to create event:', error);
      setSnackbar({
        open: true,
        message: 'Failed to create event. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.status === filter);

  return (
    <Box>
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
        <Grid container spacing={3}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {event.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EventIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(event.date).toLocaleDateString()} {event.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PeopleIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.expectedAttendees} Expected Attendees
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {event.location}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <IconButton onClick={(e) => handleMenuClick(e, event)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
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
          <Button variant="contained" onClick={() => handleCreateEvent(selectedEvent)}>Save Changes</Button>
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

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
};

export default Events;
