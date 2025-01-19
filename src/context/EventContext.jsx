import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
  // Initial events data
  const initialEvents = [
    {
      id: 1,
      title: 'Tech Conference 2025',
      description: 'Annual technology conference featuring industry leaders',
      date: '2025-03-15',
      time: '09:00',
      location: 'San Francisco, CA',
      expectedAttendees: 120,
      image: 'https://idaete.com/wp-content/uploads/2025/01/group-diverse-people-attending-startup-business-course-scaled.jpg'
    },
    {
      id: 2,
      title: 'Product Launch',
      description: 'Launch event for our new software platform',
      date: '2025-04-05',
      time: '14:00',
      location: 'New York, NY',
      expectedAttendees: 85,
      image: 'https://idaete.com/wp-content/uploads/2025/01/art-school-student-consulting-drawing-master-scaled.jpg'
    },
    {
      id: 3,
      title: 'Design Workshop',
      description: 'Interactive workshop on UI/UX design principles',
      date: '2025-04-20',
      time: '10:00',
      location: 'Austin, TX',
      expectedAttendees: 40,
      image: 'https://idaete.com/wp-content/uploads/2025/01/group-young-caucasian-people-celebrating-look-happy-have-corporate-party-office-bar-scaled.jpg'
    }
  ];

  // Initial attendees data
  const initialAttendees = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', event: 'Tech Conference 2025', avatar: 'S' },
    { id: 2, name: 'Mike Chen', email: 'mike.c@example.com', event: 'Product Launch', avatar: 'M' },
    { id: 3, name: 'Emma Davis', email: 'emma.d@example.com', event: 'Team Building Event', avatar: 'E' },
    { id: 4, name: 'John Smith', email: 'john.s@example.com', event: 'Marketing Summit', avatar: 'J' },
    { id: 5, name: 'Lisa Wong', email: 'lisa.w@example.com', event: 'Tech Conference 2025', avatar: 'L' },
  ];

  const [events, setEvents] = useState(initialEvents);
  const [attendees, setAttendees] = useState(initialAttendees);

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now(),
      image: newEvent.image || 'https://idaete.com/wp-content/uploads/2025/01/group-diverse-people-attending-startup-business-course-scaled.jpg'
    };
    setEvents(prev => [eventWithId, ...prev]);
    return eventWithId;
  };

  const addAttendee = (newAttendee) => {
    const attendeeWithId = {
      ...newAttendee,
      id: Date.now(),
      avatar: newAttendee.name.charAt(0).toUpperCase()
    };
    setAttendees(prev => [attendeeWithId, ...prev]);
    return attendeeWithId;
  };

  const updateAttendee = (updatedAttendee) => {
    setAttendees(prev => prev.map(a => 
      a.id === updatedAttendee.id ? updatedAttendee : a
    ));
  };

  const deleteAttendee = (attendeeId) => {
    setAttendees(prev => prev.filter(a => a.id !== attendeeId));
  };

  const getRecentEvents = () => events.slice(0, 6);
  const getRecentAttendees = () => attendees.slice(0, 5);

  return (
    <EventContext.Provider value={{ 
      events, 
      attendees,
      addEvent,
      addAttendee,
      updateAttendee,
      deleteAttendee,
      getRecentEvents,
      getRecentAttendees
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
