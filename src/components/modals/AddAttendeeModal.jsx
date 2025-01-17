import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  Grid,
  IconButton,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AddAttendeeModal = ({ open, onClose, onSubmit }) => {
  const [attendeeData, setAttendeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    jobTitle: '',
    role: '',
    photo: null,
    dietaryRestrictions: [],
    notes: '',
  });

  const [customDietary, setCustomDietary] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field) => (event) => {
    setAttendeeData({
      ...attendeeData,
      [field]: event.target.value,
    });
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttendeeData({
          ...attendeeData,
          photo: {
            file,
            preview: reader.result,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDietary = () => {
    if (customDietary.trim()) {
      setAttendeeData({
        ...attendeeData,
        dietaryRestrictions: [...attendeeData.dietaryRestrictions, customDietary.trim()],
      });
      setCustomDietary('');
    }
  };

  const handleRemoveDietary = (restriction) => {
    setAttendeeData({
      ...attendeeData,
      dietaryRestrictions: attendeeData.dietaryRestrictions.filter(r => r !== restriction),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log(attendeeData);
    setShowSuccess(true);
    if (onSubmit) {
      onSubmit(attendeeData);
    }
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
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
            Add New Attendee
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: 120,
                  height: 120,
                  cursor: 'pointer',
                }}
                component="label"
              >
                <Avatar
                  src={attendeeData.photo?.preview}
                  sx={{
                    width: '100%',
                    height: '100%',
                    fontSize: '2.5rem',
                  }}
                >
                  {!attendeeData.photo && (attendeeData.firstName || attendeeData.lastName)
                    ? `${attendeeData.firstName?.[0] || ''}${attendeeData.lastName?.[0] || ''}`
                    : null}
                </Avatar>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#333',
                    borderRadius: '50%',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CloudUploadIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                required
                value={attendeeData.firstName}
                onChange={handleChange('firstName')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                required
                value={attendeeData.lastName}
                onChange={handleChange('lastName')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={attendeeData.email}
                onChange={handleChange('email')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                fullWidth
                value={attendeeData.phone}
                onChange={handleChange('phone')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Organization"
                fullWidth
                value={attendeeData.organization}
                onChange={handleChange('organization')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Job Title"
                fullWidth
                value={attendeeData.jobTitle}
                onChange={handleChange('jobTitle')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={attendeeData.role}
                  label="Role"
                  onChange={handleChange('role')}
                >
                  <MenuItem value="attendee">Attendee</MenuItem>
                  <MenuItem value="speaker">Speaker</MenuItem>
                  <MenuItem value="vip">VIP</MenuItem>
                  <MenuItem value="staff">Staff</MenuItem>
                  <MenuItem value="organizer">Organizer</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  label="Dietary Restrictions"
                  fullWidth
                  value={customDietary}
                  onChange={(e) => setCustomDietary(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddDietary();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddDietary}
                  sx={{
                    backgroundColor: '#333',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#000',
                    },
                  }}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {attendeeData.dietaryRestrictions.map((restriction, index) => (
                  <Chip
                    key={index}
                    label={restriction}
                    onDelete={() => handleRemoveDietary(restriction)}
                    sx={{
                      backgroundColor: '#333',
                      color: 'white',
                      '& .MuiChip-deleteIcon': {
                        color: 'white',
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Additional Notes"
                fullWidth
                multiline
                rows={4}
                value={attendeeData.notes}
                onChange={handleChange('notes')}
                placeholder="Any additional information about the attendee..."
              />
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
                Add Attendee
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AddAttendeeModal;
