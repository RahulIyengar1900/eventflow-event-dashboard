import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  Grid,
  IconButton,
  Autocomplete,
  Chip,
  Snackbar,
  Alert,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CreateEventModal = ({ open, onClose, attendees, onSubmit }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    startDateTime: null,
    endDateTime: null,
    selectedAttendees: [],
    image: null,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field) => (event) => {
    setEventData({
      ...eventData,
      [field]: event.target.value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventData({
          ...eventData,
          image: {
            file,
            preview: reader.result,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log(eventData);
    setShowSuccess(true);
    if (onSubmit) {
      onSubmit(eventData);
    }
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            p: 4,
            maxWidth: 800,
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
              Create New Event
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Event Title"
                  fullWidth
                  required
                  value={eventData.title}
                  onChange={handleChange('title')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  value={eventData.description}
                  onChange={handleChange('description')}
                  placeholder="Enter event description, agenda, and any special instructions..."
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Location"
                  fullWidth
                  required
                  value={eventData.location}
                  onChange={handleChange('location')}
                  placeholder="Enter venue address or virtual meeting link"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Start Date & Time"
                    value={eventData.startDateTime}
                    onChange={(newValue) => setEventData({ ...eventData, startDateTime: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="End Date & Time"
                    value={eventData.endDateTime}
                    onChange={(newValue) => setEventData({ ...eventData, endDateTime: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                    minDateTime={eventData.startDateTime}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={attendees || []}
                  getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                  value={eventData.selectedAttendees}
                  onChange={(event, newValue) => {
                    setEventData({
                      ...eventData,
                      selectedAttendees: newValue,
                    });
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={`${option.firstName} ${option.lastName}`}
                        {...getTagProps({ index })}
                        sx={{ 
                          backgroundColor: '#333',
                          color: 'white',
                          '& .MuiChip-deleteIcon': {
                            color: 'white',
                          },
                        }}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Invite Attendees"
                      placeholder="Search and select attendees"
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    border: '2px dashed #ccc',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: '#999',
                    },
                  }}
                  component="label"
                >
                  {eventData.image ? (
                    <Box>
                      <img
                        src={eventData.image.preview}
                        alt="Event preview"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          objectFit: 'contain',
                        }}
                      />
                      <Typography sx={{ mt: 2 }}>Click to change image</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <CloudUploadIcon sx={{ fontSize: 48, color: '#666', mb: 1 }} />
                      <Typography>Click to upload event image</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Recommended size: 1200x600px
                      </Typography>
                    </Box>
                  )}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    borderColor: '#333',
                    color: '#333',
                    '&:hover': {
                      borderColor: '#000',
                      backgroundColor: 'rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#333',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#000',
                    },
                  }}
                >
                  Create Event
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Event created successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateEventModal;
