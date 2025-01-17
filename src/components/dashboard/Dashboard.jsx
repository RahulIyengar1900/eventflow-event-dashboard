import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Avatar,
  Divider,
  Checkbox,
  Chip,
  CardMedia,
  Container,
  Link,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import TaskIcon from '@mui/icons-material/Task';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CreateEventModal from '../modals/CreateEventModal';
import AddAttendeeModal from '../modals/AddAttendeeModal';
import AddTaskModal from '../modals/AddTaskModal';

const Dashboard = () => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const userName = "John"; // This would come from your auth context/state
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [openAddAttendee, setOpenAddAttendee] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);

  useEffect(() => {
    console.log('Dashboard component mounted');
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      let greeting = '';
      
      if (hours >= 5 && hours < 12) {
        greeting = 'Morning';
      } else if (hours >= 12 && hours < 17) {
        greeting = 'Afternoon';
      } else {
        greeting = 'Evening';
      }
      
      setTimeOfDay(greeting);
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Mock data for demonstration
  const recentAttendees = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', avatar: 'S' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@example.com', avatar: 'M' },
    { id: 3, name: 'Emma Davis', email: 'emma.d@example.com', avatar: 'E' },
    { id: 4, name: 'Alex Thompson', email: 'alex.t@example.com', avatar: 'A' },
    { id: 5, name: 'Lisa Wang', email: 'lisa.w@example.com', avatar: 'L' },
    { id: 6, name: 'David Kim', email: 'david.k@example.com', avatar: 'D' },
    { id: 7, name: 'Rachel Green', email: 'rachel.g@example.com', avatar: 'R' },
    { id: 8, name: 'James Wilson', email: 'james.w@example.com', avatar: 'J' },
    { id: 9, name: 'Nina Patel', email: 'nina.p@example.com', avatar: 'N' },
    { id: 10, name: 'Tom Anderson', email: 'tom.a@example.com', avatar: 'T' },
  ];

  const upcomingEvents = [
    {
      title: 'Tech Conference 2025',
      date: 'Jan 20',
      time: '09:00 AM',
      location: 'Convention Center',
      attendees: 120,
      image: 'https://idaete.com/wp-content/uploads/2025/01/ideal-websites-magazines-layouts-scaled.jpg',
      description: 'Join us for the biggest tech conference of the year.',
    },
    {
      title: 'Product Launch',
      date: 'Jan 25',
      time: '02:00 PM',
      location: 'Innovation Hub',
      attendees: 85,
      image: 'https://idaete.com/wp-content/uploads/2025/01/blurred-business-people-walking-trade-show-booths-including-copy-space-ideal-websites-magazines-layouts-scaled.jpg',
      description: 'Be part of our exclusive product launch event.',
    },
    {
      title: 'Design Workshop',
      date: 'Jan 28',
      time: '10:00 AM',
      location: 'Creative Studio',
      attendees: 45,
      image: 'https://idaete.com/wp-content/uploads/2025/01/art-school-student-consulting-drawing-master-scaled.jpg',
      description: 'Interactive workshop on modern design principles.',
    },
    {
      title: 'Networking Mixer',
      date: 'Feb 1',
      time: '06:00 PM',
      location: 'Skyline Lounge',
      attendees: 150,
      image: 'https://idaete.com/wp-content/uploads/2025/01/group-young-caucasian-people-celebrating-look-happy-have-corporate-party-office-bar-scaled.jpg',
      description: 'Evening of networking and collaboration.',
    },
  ];

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Prepare event proposal', status: 'open', assignee: 'Sarah Johnson', priority: 'high' },
    { id: 2, title: 'Book venue for conference', status: 'closed', assignee: 'Michael Chen', priority: 'medium' },
    { id: 3, title: 'Send invitations', status: 'open', assignee: 'Emma Davis', priority: 'high' },
    { id: 4, title: 'Order catering', status: 'open', assignee: 'Alex Thompson', priority: 'low' },
  ]);

  const handleTaskToggle = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'open' ? 'closed' : 'open' }
        : task
    ));
  };

  const StatsCard = ({ icon: Icon, value, label }) => (
    <Card sx={{ height: '100%', borderRadius: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ fontSize: 32, mr: 2, color: '#333' }} />
          <Typography variant="h3" sx={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
            {value}
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontFamily: 'Montserrat' }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      {/* Hero Header */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mb: 6,
          mt: -8, // Move header to top
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('https://idaete.com/wp-content/uploads/2025/01/ideal-websites-magazines-layouts-scaled.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            px: { xs: 3, md: 6 },
            pt: { xs: 12, md: 14 },
            pb: { xs: 8, md: 10 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Montserrat',
              fontWeight: 700,
              color: 'white',
              mb: 2,
            }}
          >
            Good {timeOfDay}, {userName}!
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Montserrat',
              color: 'white',
              opacity: 0.9,
            }}
          >
            It's {currentTime}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 3, md: 6 }, pb: 6 }}>
        {/* Stats Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={3}>
            <StatsCard icon={EventIcon} value="24" label="Total Events" />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatsCard icon={GroupIcon} value="1.2k" label="Total Attendees" />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatsCard icon={TaskIcon} value="18" label="Active Tasks" />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatsCard icon={TrendingUpIcon} value="89%" label="Success Rate" />
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ fontSize: 28 }} />}
              onClick={() => setOpenCreateEvent(true)}
              sx={{
                backgroundColor: '#333',
                color: 'white',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: '#000',
                },
              }}
            >
              Create Event
            </Button>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon sx={{ fontSize: 28 }} />}
              onClick={() => setOpenAddAttendee(true)}
              sx={{
                backgroundColor: '#333',
                color: 'white',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: '#000',
                },
              }}
            >
              Add Attendee
            </Button>
            <Button
              variant="contained"
              startIcon={<AssignmentIcon sx={{ fontSize: 28 }} />}
              onClick={() => setOpenAddTask(true)}
              sx={{
                backgroundColor: '#333',
                color: 'white',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: '#000',
                },
              }}
            >
              Add Task
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Latest Events Section */}
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Montserrat',
                fontWeight: 700,
                mb: 4,
                color: '#333',
              }}
            >
              Latest Events
            </Typography>

            <Grid container spacing={4}>
              {upcomingEvents.map((event, index) => (
                <Grid item xs={12} md={6} key={index}>
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
                        height="300"
                        image={event.image}
                        alt={event.title}
                      />
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
                          variant="h4"
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
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <CalendarTodayIcon sx={{ mr: 1, color: '#666', fontSize: 28 }} />
                            <Typography sx={{ fontFamily: 'Montserrat' }}>
                              {event.date}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon sx={{ mr: 1, color: '#666', fontSize: 28 }} />
                            <Typography sx={{ fontFamily: 'Montserrat' }}>
                              {event.time}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <LocationOnIcon sx={{ mr: 1, color: '#666', fontSize: 28 }} />
                            <Typography sx={{ fontFamily: 'Montserrat' }}>
                              {event.location}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <GroupIcon sx={{ mr: 1, color: '#666', fontSize: 28 }} />
                            <Typography sx={{ fontFamily: 'Montserrat' }}>
                              {event.attendees} Attendees
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: 'Montserrat',
                          color: '#666',
                          lineHeight: 1.6,
                        }}
                      >
                        {event.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Side Sections */}
          <Grid item xs={12} md={4}>
            {/* Recent Attendees Section */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  mb: 4,
                  color: '#333',
                }}
              >
                Recent Attendees
              </Typography>

              <Card sx={{ borderRadius: 0 }}>
                <List sx={{ maxHeight: '400px', overflow: 'auto' }}>
                  {recentAttendees.map((attendee, index) => (
                    <React.Fragment key={attendee.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#333' }}>
                            {attendee.avatar}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
                              {attendee.name}
                            </Typography>
                          }
                          secondary={
                            <Typography sx={{ fontFamily: 'Montserrat', color: '#666' }}>
                              {attendee.email}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" sx={{ color: '#666', mr: 1 }}>
                            <EditIcon sx={{ fontSize: 28 }} />
                          </IconButton>
                          <IconButton edge="end" sx={{ color: '#666' }}>
                            <DeleteIcon sx={{ fontSize: 28 }} />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < recentAttendees.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
                <Box sx={{ p: 2, textAlign: 'center', borderTop: '1px solid #eee' }}>
                  <Button
                    sx={{
                      color: '#333',
                      fontFamily: 'Montserrat',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      },
                    }}
                  >
                    See More Attendees
                  </Button>
                </Box>
              </Card>
            </Box>

            {/* Tasks Section */}
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  mb: 4,
                  color: '#333',
                }}
              >
                Tasks
              </Typography>

              <Card sx={{ borderRadius: 0 }}>
                <List>
                  {tasks.map((task, index) => (
                    <React.Fragment key={task.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Checkbox
                            checked={task.status === 'closed'}
                            onChange={() => handleTaskToggle(task.id)}
                            icon={<RadioButtonUncheckedIcon sx={{ fontSize: 28 }} />}
                            checkedIcon={<CheckCircleIcon sx={{ fontSize: 28 }} />}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography 
                              sx={{ 
                                fontFamily: 'Montserrat', 
                                fontWeight: 500,
                                textDecoration: task.status === 'closed' ? 'line-through' : 'none',
                                color: task.status === 'closed' ? '#666' : '#333',
                              }}
                            >
                              {task.title}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <Typography 
                                sx={{ 
                                  fontFamily: 'Montserrat', 
                                  color: '#666',
                                  fontSize: '0.875rem',
                                  mr: 2,
                                }}
                              >
                                {task.assignee}
                              </Typography>
                              <Chip
                                label={task.priority}
                                size="small"
                                sx={{
                                  backgroundColor: 
                                    task.status === 'closed' ? '#e0e0e0' :
                                    task.priority === 'high' ? '#ef5350' :
                                    task.priority === 'medium' ? '#fb8c00' : 
                                    '#66bb6a',
                                  color: task.status === 'closed' ? '#666' : 'white',
                                  fontFamily: 'Montserrat',
                                  textTransform: 'capitalize',
                                  height: '24px',
                                }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < tasks.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
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
              &copy; 2025 EventFlow. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Modals */}
      <CreateEventModal
        open={openCreateEvent}
        onClose={() => setOpenCreateEvent(false)}
        onSubmit={(eventData) => {
          console.log('New event:', eventData);
          setOpenCreateEvent(false);
        }}
        attendees={recentAttendees.map(a => ({
          id: a.id,
          firstName: a.name.split(' ')[0],
          lastName: a.name.split(' ')[1],
          email: a.email
        }))}
      />
      
      <AddAttendeeModal
        open={openAddAttendee}
        onClose={() => setOpenAddAttendee(false)}
        onSubmit={(attendeeData) => {
          console.log('New attendee:', attendeeData);
          setOpenAddAttendee(false);
        }}
      />
      
      <AddTaskModal
        open={openAddTask}
        onClose={() => setOpenAddTask(false)}
        onSubmit={(taskData) => {
          console.log('New task:', taskData);
          setOpenAddTask(false);
        }}
        attendees={recentAttendees.map(a => ({
          id: a.id,
          firstName: a.name.split(' ')[0],
          lastName: a.name.split(' ')[1],
          email: a.email
        }))}
      />
    </Box>
  );
};

export default Dashboard;
