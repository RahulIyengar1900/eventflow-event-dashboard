import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import { Edit, Delete, Add, Person, Task } from '@mui/icons-material';
import CreateEventModal from '../modals/CreateEventModal';
import AddAttendeeModal from '../modals/AddAttendeeModal';
import AddTaskModal from '../modals/AddTaskModal';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [openEventModal, setOpenEventModal] = useState(false);
  const [openAttendeeModal, setOpenAttendeeModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  
  // Mock attendees data
  const [attendees, setAttendees] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
  ]);

  const handleCreateEvent = (eventData) => {
    setEvents([...events, eventData]);
  };

  const handleAddAttendee = (attendeeData) => {
    setAttendees([...attendees, { id: attendees.length + 1, ...attendeeData }]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => setOpenEventModal(true)}
          sx={{
            backgroundColor: '#333',
            '&:hover': { backgroundColor: '#000' },
          }}
        >
          Create Event
        </Button>
        
        <Button
          startIcon={<Person />}
          variant="contained"
          onClick={() => setOpenAttendeeModal(true)}
          sx={{
            backgroundColor: '#333',
            '&:hover': { backgroundColor: '#000' },
          }}
        >
          Add Attendee
        </Button>
        
        <Button
          startIcon={<Task />}
          variant="contained"
          onClick={() => setOpenTaskModal(true)}
          sx={{
            backgroundColor: '#333',
            '&:hover': { backgroundColor: '#000' },
          }}
        >
          Add Task
        </Button>
      </Box>

      <List>
        {events.map((event, index) => (
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
            <ListItemText
              primary={event.title}
              secondary={
                <>
                  <div>{event.description}</div>
                  <div>{`Location: ${event.location}`}</div>
                  <div>{`Date: ${event.startDateTime ? new Date(event.startDateTime).toLocaleString() : 'TBD'}`}</div>
                  <div>{`Attendees: ${event.selectedAttendees?.length || 0}`}</div>
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      <CreateEventModal
        open={openEventModal}
        onClose={() => setOpenEventModal(false)}
        onSubmit={handleCreateEvent}
        attendees={attendees}
      />
      
      <AddAttendeeModal
        open={openAttendeeModal}
        onClose={() => setOpenAttendeeModal(false)}
        onSubmit={handleAddAttendee}
      />
      
      <AddTaskModal
        open={openTaskModal}
        onClose={() => setOpenTaskModal(false)}
        onSubmit={(taskData) => console.log('Task created:', taskData)}
        attendees={attendees}
      />
    </Box>
  );
};

export default EventList;
