import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

const AttendeeList = ({ attendees: initialAttendees }) => {
  const theme = useTheme();
  const [attendees, setAttendees] = useState(initialAttendees);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    dietaryRestrictions: '',
  });

  const handleEditClick = (attendee) => {
    setSelectedAttendee(attendee);
    setEditForm({
      name: attendee.name,
      email: attendee.email,
      phone: attendee.phone || '',
      dietaryRestrictions: attendee.dietaryRestrictions || '',
    });
    setOpenEdit(true);
  };

  const handleDeleteClick = (attendee) => {
    setSelectedAttendee(attendee);
    setOpenDelete(true);
  };

  const handleEditSave = () => {
    setAttendees(prevAttendees =>
      prevAttendees.map(att =>
        att.id === selectedAttendee.id
          ? { ...att, ...editForm }
          : att
      )
    );
    setOpenEdit(false);
  };

  const handleDelete = () => {
    setAttendees(prevAttendees =>
      prevAttendees.filter(att => att.id !== selectedAttendee.id)
    );
    setOpenDelete(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {attendees.map((attendee) => (
          <ListItem
            key={attendee.id}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={attendee.avatar}
                alt={attendee.name}
                sx={{ width: 50, height: 50 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {attendee.name}
                </Typography>
              }
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {attendee.email}
                  </Typography>
                  {attendee.dietaryRestrictions && (
                    <Chip
                      label={attendee.dietaryRestrictions}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                onClick={() => handleEditClick(attendee)}
                sx={{ mr: 1, color: '#666' }}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                edge="end" 
                onClick={() => handleDeleteClick(attendee)}
                sx={{ color: '#666' }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
          Edit Attendee
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={editForm.phone}
              onChange={handleEditChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Dietary Restrictions"
              name="dietaryRestrictions"
              value={editForm.dietaryRestrictions}
              onChange={handleEditChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenEdit(false)}
            sx={{ color: '#666' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleEditSave}
            variant="contained"
            sx={{
              backgroundColor: '#333',
              '&:hover': { backgroundColor: '#000' },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle sx={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove {selectedAttendee?.name} from the attendee list?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDelete(false)}
            sx={{ color: '#666' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AttendeeList;
