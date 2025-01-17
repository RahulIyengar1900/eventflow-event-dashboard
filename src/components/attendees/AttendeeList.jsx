import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  ListItemAvatar,
} from '@mui/material';
import { Edit, Delete, Add, Person } from '@mui/icons-material';

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [open, setOpen] = useState(false);
  const [attendeeData, setAttendeeData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    // TODO: Implement attendee creation/editing logic
    setAttendees([...attendees, attendeeData]);
    handleClose();
  };

  return (
    <>
      <Button
        startIcon={<Add />}
        variant="contained"
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Add Attendee
      </Button>

      <List>
        {attendees.map((attendee, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit">
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={attendee.name}
              secondary={`${attendee.email} | ${attendee.phone}`}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Attendee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={attendeeData.name}
            onChange={(e) =>
              setAttendeeData({ ...attendeeData, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={attendeeData.email}
            onChange={(e) =>
              setAttendeeData({ ...attendeeData, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            value={attendeeData.phone}
            onChange={(e) =>
              setAttendeeData({ ...attendeeData, phone: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AttendeeList;
