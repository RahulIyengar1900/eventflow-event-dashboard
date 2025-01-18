import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  Divider,
  Container,
  Paper,
  Chip,
  TextField,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Event as EventIcon,
  People as PeopleIcon,
  Assignment as TaskIcon,
  AttachMoney as MoneyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import PageHeader from '../layout/PageHeader';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [openEventModal, setOpenEventModal] = useState(false);
  const [openAttendeeModal, setOpenAttendeeModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [editingAttendee, setEditingAttendee] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTaskComplete = (taskId) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleEditAttendee = (attendee) => {
    setEditingAttendee(attendee);
    setOpenAttendeeModal(true);
  };

  const handleDeleteAttendee = (attendeeId) => {
    const updatedAttendees = recentAttendees.filter(a => a.id !== attendeeId);
    // Update your state or make API call here
    console.log('Deleting attendee:', attendeeId);
  };

  const stats = [
    { title: 'Total Events', value: '24', icon: EventIcon, color: '#2196f3' },
    { title: 'Total Attendees', value: '487', icon: PeopleIcon, color: '#4caf50' },
    { title: 'Active Tasks', value: '12', icon: TaskIcon, color: '#ff9800' },
    { title: 'Revenue', value: '$15,200', icon: MoneyIcon, color: '#f44336' },
  ];

  const monthlyEventData = [
    { name: 'Jan', events: 4 },
    { name: 'Feb', events: 3 },
    { name: 'Mar', events: 5 },
    { name: 'Apr', events: 7 },
    { name: 'May', events: 2 },
    { name: 'Jun', events: 6 },
  ];

  const attendanceData = [
    { name: 'Week 1', attendees: 45 },
    { name: 'Week 2', attendees: 52 },
    { name: 'Week 3', attendees: 49 },
    { name: 'Week 4', attendees: 63 },
    { name: 'Week 5', attendees: 58 },
    { name: 'Week 6', attendees: 71 },
  ];

  const taskStatusData = [
    { name: 'Completed', value: 8, fill: '#4caf50' },
    { name: 'In Progress', value: 5, fill: '#ff9800' },
    { name: 'Pending', value: 3, fill: '#f44336' },
  ];

  const recentEvents = [
    {
      id: 1,
      title: 'Tech Conference 2025',
      description: 'Annual technology conference featuring industry leaders',
      date: 'Mar 15, 2025',
      attendees: 120,
      location: 'San Francisco, CA',
      image: 'https://idaete.com/wp-content/uploads/2025/01/group-diverse-people-attending-startup-business-course-scaled.jpg',
    },
    {
      id: 2,
      title: 'Product Launch',
      description: 'Launch event for our new software platform',
      date: 'Apr 5, 2025',
      attendees: 85,
      location: 'New York, NY',
      image: 'https://idaete.com/wp-content/uploads/2025/01/art-school-student-consulting-drawing-master-scaled.jpg',
    },
    {
      id: 3,
      title: 'Design Workshop',
      description: 'Interactive workshop on UI/UX design principles',
      date: 'Apr 20, 2025',
      attendees: 40,
      location: 'Austin, TX',
      image: 'https://idaete.com/wp-content/uploads/2025/01/group-young-caucasian-people-celebrating-look-happy-have-corporate-party-office-bar-scaled.jpg',
    },
  ];

  const recentTasks = [
    { id: 1, title: 'Finalize venue contract', status: 'pending', dueDate: 'Jan 25', event: 'Tech Conference 2025', assignedTo: 'Sarah Johnson' },
    { id: 2, title: 'Send speaker invitations', status: 'completed', dueDate: 'Jan 28', event: 'Tech Conference 2025', assignedTo: 'Michael Chen' },
    { id: 3, title: 'Order promotional materials', status: 'in_progress', dueDate: 'Feb 1', event: 'Product Launch', assignedTo: 'Emma Davis' },
    { id: 4, title: 'Review catering options', status: 'pending', dueDate: 'Feb 5', event: 'Design Workshop', assignedTo: 'Alex Thompson' },
  ];

  const recentAttendees = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', event: 'Tech Conference 2025', avatar: 'S' },
    { id: 2, name: 'Mike Chen', email: 'mike.c@example.com', event: 'Product Launch', avatar: 'M' },
    { id: 3, name: 'Emma Davis', email: 'emma.d@example.com', event: 'Team Building Event', avatar: 'E' },
    { id: 4, name: 'John Smith', email: 'john.s@example.com', event: 'Marketing Summit', avatar: 'J' },
    { id: 5, name: 'Lisa Wong', email: 'lisa.w@example.com', event: 'Tech Conference 2025', avatar: 'L' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader 
        showActions={true}
        onCreateEvent={() => setOpenEventModal(true)}
        onAddAttendee={() => setOpenAttendeeModal(true)}
        onAddTask={() => setOpenTaskModal(true)}
      />

      {/* Main Content */}
      <Container 
        maxWidth={false} 
        disableGutters
        sx={{ 
          width: '100%',
          maxWidth: '100%',
          px: { xs: 2, sm: 3 },
          py: 3,
          overflowX: 'hidden'
        }}
      >
        {/* Stats Grid */}
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3 }} 
          sx={{ 
            mb: { xs: 4, sm: 6 },
            width: '100%',
            mx: 0,
            '& .MuiGrid-item': {
              width: '100%',
              pl: { xs: '16px !important', sm: '24px !important' }
            }
          }}
        >
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${stat.color}15`,
                      mr: 2,
                    }}
                  >
                    <stat.icon sx={{ color: stat.color, fontSize: { xs: 24, sm: 32 } }} />
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
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3 }} 
          sx={{ 
            mb: { xs: 4, sm: 6 },
            width: '100%',
            mx: 0,
            '& .MuiGrid-item': {
              width: '100%',
              pl: { xs: '16px !important', sm: '24px !important' }
            }
          }}
        >
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
                  <RechartsTooltip />
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
                  <RechartsTooltip />
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
                <BarChart
                  data={taskStatusData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <RechartsTooltip />
                  <Bar dataKey="value" fill={(entry) => entry.fill} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Recent Events */}
        <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Montserrat', textAlign: 'left' }}>
          Recent Events
        </Typography>
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3 }} 
          sx={{ 
            mb: { xs: 4, sm: 6 },
            width: '100%',
            mx: 0,
            '& .MuiGrid-item': {
              width: '100%',
              pl: { xs: '16px !important', sm: '24px !important' }
            }
          }}
        >
          {recentEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent sx={{ textAlign: 'left' }}>
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {event.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EventIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PeopleIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.attendees} Attendees
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {event.location}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tasks and Attendees Grid */}
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3 }} 
          sx={{ 
            width: '100%',
            mx: 0,
            '& .MuiGrid-item': {
              width: '100%',
              pl: { xs: '16px !important', sm: '24px !important' }
            }
          }}
        >
          {/* Recent Tasks */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Montserrat', textAlign: 'left' }}>
                Recent Tasks
              </Typography>
              {recentTasks.map((task) => (
                <Box key={task.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                    <IconButton
                      onClick={() => handleTaskComplete(task.id)}
                      size="small"
                      sx={{ mr: 1, mt: 0.5 }}
                    >
                      {completedTasks.has(task.id) ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </IconButton>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                          textDecoration: completedTasks.has(task.id) ? 'line-through' : 'none',
                          color: completedTasks.has(task.id) ? 'text.secondary' : 'text.primary',
                          textAlign: 'left',
                        }}
                      >
                        {task.title}
                      </Typography>
                      <Typography variant="body2" component="div" color="text.secondary" sx={{ textAlign: 'left' }}>
                        Due: {task.dueDate}
                      </Typography>
                      <Typography variant="body2" component="div" color="text.secondary" sx={{ textAlign: 'left' }}>
                        Event: {task.event}
                      </Typography>
                      <Typography variant="body2" component="div" color="text.secondary" sx={{ textAlign: 'left' }}>
                        Assigned to: {task.assignedTo}
                      </Typography>
                    </Box>
                    <Chip
                      label={task.status}
                      color={
                        task.status === 'completed' ? 'success' :
                        task.status === 'in_progress' ? 'warning' : 'error'
                      }
                      size="small"
                      sx={{ ml: 1 }}
                    />
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
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#333' }}>{attendee.avatar}</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                        {attendee.name}
                      </Typography>
                      <Typography variant="body2" component="div" color="text.secondary" sx={{ textAlign: 'left' }}>
                        {attendee.email}
                      </Typography>
                      <Typography variant="body2" component="div" color="text.secondary" sx={{ textAlign: 'left' }}>
                        Event: {attendee.event}
                      </Typography>
                    </Box>
                    <Box>
                      <Tooltip title="Edit">
                        <IconButton 
                          size="small" 
                          sx={{ mr: 1 }}
                          onClick={() => handleEditAttendee(attendee)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          size="small"
                          onClick={() => handleDeleteAttendee(attendee.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Modals */}
      <Dialog open={openEventModal} onClose={() => setOpenEventModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Event Title"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={4}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Expected Attendees"
                  type="number"
                  margin="normal"
                />
              </Grid>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Event Date & Time"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal'
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEventModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenEventModal(false)}>Create Event</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAttendeeModal} onClose={() => setOpenAttendeeModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingAttendee ? 'Edit Attendee' : 'Add New Attendee'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              required
              defaultValue={editingAttendee?.name || ''}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
              defaultValue={editingAttendee?.email || ''}
            />
            <TextField
              fullWidth
              label="Event"
              margin="normal"
              required
              defaultValue={editingAttendee?.event || ''}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenAttendeeModal(false);
            setEditingAttendee(null);
          }}>Cancel</Button>
          <Button variant="contained" onClick={() => {
            setOpenAttendeeModal(false);
            setEditingAttendee(null);
          }}>{editingAttendee ? 'Save Changes' : 'Add Attendee'}</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTaskModal} onClose={() => setOpenTaskModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Task Title"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Assigned To"
              margin="normal"
              required
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Due Date"
                renderInput={(props) => <TextField {...props} fullWidth margin="normal" />}
                onChange={() => {}}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenTaskModal(false)}>Add Task</Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: '100%',
          bgcolor: '#333',
          color: 'white',
          py: { xs: 4, sm: 6 },
          mt: 6,
        }}
      >
        <Container maxWidth={false} disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Montserrat', fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
                EventFlow
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Streamline your event management process with our powerful platform.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Montserrat', fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
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
              <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Montserrat', fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
                Subscribe to Our Newsletter
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
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
                    width: { xs: '100%', sm: 'auto' }
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.8 }}>
            2025 EventFlow. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
