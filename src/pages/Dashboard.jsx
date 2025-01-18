import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  Container,
  Paper,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Assignment as TaskIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const stats = [
    { title: 'Total Events', value: '24', icon: EventIcon, color: '#2196f3' },
    { title: 'Total Attendees', value: '487', icon: PeopleIcon, color: '#4caf50' },
    { title: 'Active Tasks', value: '18', icon: TaskIcon, color: '#ff9800' },
    { title: 'Total Revenue', value: '$24,500', icon: MoneyIcon, color: '#f44336' },
  ];

  const recentEvents = [
    {
      id: 1,
      title: 'Tech Conference 2025',
      date: '2025-02-15',
      location: 'San Francisco, CA',
      image: 'https://idaete.com/wp-content/uploads/2025/01/group-diverse-people-attending-startup-business-course-scaled.jpg',
    },
    {
      id: 2,
      title: 'Product Launch',
      date: '2025-03-01',
      location: 'New York, NY',
      image: 'https://idaete.com/wp-content/uploads/2025/01/art-school-student-consulting-drawing-master-scaled.jpg',
    },
    {
      id: 3,
      title: 'Team Building Event',
      date: '2025-03-15',
      location: 'Austin, TX',
      image: 'https://idaete.com/wp-content/uploads/2025/01/group-young-caucasian-people-celebrating-look-happy-have-corporate-party-office-bar-scaled.jpg',
    },
    {
      id: 4,
      title: 'Marketing Summit',
      date: '2025-03-20',
      location: 'Chicago, IL',
      image: 'https://idaete.com/wp-content/uploads/2025/01/ideal-websites-magazines-layouts-scaled.jpg',
    },
  ];

  const recentTasks = [
    {
      id: 1,
      title: 'Finalize venue details',
      event: 'Tech Conference 2025',
      assignedTo: 'Sarah Johnson',
      dueDate: '2025-02-01',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Send invitations',
      event: 'Product Launch',
      assignedTo: 'Mike Chen',
      dueDate: '2025-02-15',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Order catering',
      event: 'Team Building Event',
      assignedTo: 'Emma Davis',
      dueDate: '2025-03-01',
      status: 'in_progress',
    },
    {
      id: 4,
      title: 'Book speakers',
      event: 'Marketing Summit',
      assignedTo: 'John Smith',
      dueDate: '2025-03-05',
      status: 'pending',
    },
    {
      id: 5,
      title: 'Prepare presentation',
      event: 'Tech Conference 2025',
      assignedTo: 'Lisa Wong',
      dueDate: '2025-02-10',
      status: 'completed',
    },
  ];

  const recentAttendees = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      event: 'Tech Conference 2025',
      avatar: 'S',
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.c@example.com',
      event: 'Product Launch',
      avatar: 'M',
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.d@example.com',
      event: 'Team Building Event',
      avatar: 'E',
    },
    {
      id: 4,
      name: 'John Smith',
      email: 'john.s@example.com',
      event: 'Marketing Summit',
      avatar: 'J',
    },
    {
      id: 5,
      name: 'Lisa Wong',
      email: 'lisa.w@example.com',
      event: 'Tech Conference 2025',
      avatar: 'L',
    },
  ];

  const monthlyEventData = [
    { name: 'Jan', events: 4 },
    { name: 'Feb', events: 6 },
    { name: 'Mar', events: 8 },
    { name: 'Apr', events: 5 },
    { name: 'May', events: 7 },
    { name: 'Jun', events: 9 },
  ];

  const attendanceData = [
    { name: 'Week 1', attendees: 120 },
    { name: 'Week 2', attendees: 180 },
    { name: 'Week 3', attendees: 150 },
    { name: 'Week 4', attendees: 220 },
  ];

  const taskStatusData = [
    { name: 'Completed', value: 8 },
    { name: 'In Progress', value: 5 },
    { name: 'Pending', value: 3 },
  ];

  const COLORS = ['#4caf50', '#ff9800', '#f44336'];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'pending': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Header */}
      <Box
        sx={{
          width: '100vw',
          height: '300px',
          position: 'relative',
          backgroundImage: 'url("https://idaete.com/wp-content/uploads/2025/01/blurred-people-walking-scaled.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ position: 'relative', zIndex: 1, pt: 8, color: 'white' }}>
            <Typography variant="h3" sx={{ mb: 1, fontFamily: 'Montserrat' }}>
              {`${greeting}, ${user?.firstName || 'User'}`}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8, fontFamily: 'Montserrat' }}>
              Welcome back to your dashboard
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* CTA Buttons */}
      <Container maxWidth={false} sx={{ mt: -4, mb: 6, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<EventIcon />}
            sx={{
              bgcolor: '#333',
              '&:hover': { bgcolor: '#000' },
            }}
          >
            Create Event
          </Button>
          <Button
            variant="contained"
            startIcon={<PersonIcon />}
            sx={{
              bgcolor: '#333',
              '&:hover': { bgcolor: '#000' },
            }}
          >
            Add Attendee
          </Button>
          <Button
            variant="contained"
            startIcon={<TaskIcon />}
            sx={{
              bgcolor: '#333',
              '&:hover': { bgcolor: '#000' },
            }}
          >
            Add Task
          </Button>
        </Box>
      </Container>

      {/* Main Content */}
      <Container maxWidth={false} sx={{ flex: 1, pb: 6 }}>
        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${stat.color}15`,
                      mr: 2,
                    }}
                  >
                    <stat.icon sx={{ color: stat.color, fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Montserrat', textAlign: 'left' }}>
                Monthly Events
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyEventData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="events" fill="#2196f3" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Montserrat', textAlign: 'left' }}>
                Attendance Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="attendees" stroke="#4caf50" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Montserrat', textAlign: 'left' }}>
                Task Status
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Recent Events */}
        <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Montserrat', textAlign: 'left' }}>
          Recent Events
        </Typography>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {recentEvents.map((event) => (
            <Grid item xs={12} sm={6} key={event.id}>
              <Card sx={{ display: 'flex', height: '100%' }}>
                <Box sx={{ width: '35%', position: 'relative' }}>
                  <Box
                    component="img"
                    src={event.image}
                    alt={event.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <CardContent sx={{ flex: 1, textAlign: 'left' }}>
                  <Typography variant="h6" gutterBottom>
                    {event.title}
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

        {/* Tasks and Attendees Grid */}
        <Grid container spacing={4}>
          {/* Recent Tasks */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Montserrat', textAlign: 'left' }}>
                Recent Tasks
              </Typography>
              {recentTasks.map((task) => (
                <Box key={task.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        size="small"
                        sx={{ mr: 1 }}
                        color={task.status === 'completed' ? 'success' : 'default'}
                      >
                        {task.status === 'completed' ? <CheckCircleIcon /> : <CloseIcon />}
                      </IconButton>
                      <Box>
                        <Typography variant="subtitle1">{task.title}</Typography>
                        <Chip
                          label={getStatusLabel(task.status)}
                          color={getStatusColor(task.status)}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          Due: {task.dueDate}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Event: {task.event}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Assigned to: {task.assignedTo}
                    </Typography>
                  </Box>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Recent Attendees */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Montserrat', textAlign: 'left' }}>
                Recent Attendees
              </Typography>
              {recentAttendees.map((attendee) => (
                <Box key={attendee.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: '#333' }}>{attendee.avatar}</Avatar>
                      <Box>
                        <Typography variant="subtitle1">{attendee.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {attendee.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {attendee.event}
                    </Typography>
                  </Box>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: '100vw',
          bgcolor: '#333',
          color: 'white',
          py: 6,
          mt: 6,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Montserrat' }}>
                EventFlow
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Streamline your event management process with our powerful platform.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Montserrat' }}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    sx={{
                      opacity: 0.8,
                      cursor: 'pointer',
                      '&:hover': { opacity: 1 },
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Montserrat' }}>
                Subscribe to Our Newsletter
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Enter your email"
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'white',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#000',
                    '&:hover': { bgcolor: '#222' },
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.8 }}>
            &copy; 2025 EventFlow. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
