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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
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
import { useEvents } from '../../context/EventContext';
import { useTasks } from '../../context/TaskContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { 
    events,
    attendees,
    addEvent,
    addAttendee,
    updateAttendee,
    deleteAttendee,
    getRecentEvents,
    getRecentAttendees
  } = useEvents();
  const {
    addTask,
    updateTask,
    getRecentTasks
  } = useTasks();
  const navigate = useNavigate();
  const [openEventModal, setOpenEventModal] = useState(false);
  const [openAttendeeModal, setOpenAttendeeModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [editingAttendee, setEditingAttendee] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    status: 'pending',
    dueDate: null,
    event: '',
    assignedTo: ''
  });
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: null,
    time: '',
    location: '',
    expectedAttendees: '',
    image: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
  const [attendeeToDelete, setAttendeeToDelete] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      // Clear any additional state or localStorage items if needed
      localStorage.clear(); // Clear all stored data
      window.location.href = '/login'; // Force a full page reload to /login
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCreateTask = () => {
    try {
      const taskData = {
        ...newTask,
        dueDate: newTask.dueDate ? new Date(newTask.dueDate).toISOString().split('T')[0] : null
      };
      addTask(taskData);
      setOpenTaskModal(false);
      setNewTask({
        title: '',
        status: 'pending',
        dueDate: null,
        event: '',
        assignedTo: ''
      });
      setSnackbar({
        open: true,
        message: 'Task created successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to create task:', error);
      setSnackbar({
        open: true,
        message: 'Failed to create task. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleEditAttendee = (attendee) => {
    setEditingAttendee(attendee);
    setOpenAttendeeModal(true);
  };

  const handleDeleteAttendee = (attendee) => {
    setAttendeeToDelete(attendee);
    setDeleteConfirmDialog(true);
  };

  const confirmDeleteAttendee = () => {
    deleteAttendee(attendeeToDelete.id);
    setDeleteConfirmDialog(false);
    setAttendeeToDelete(null);
    setSnackbar({
      open: true,
      message: 'Attendee deleted successfully',
      severity: 'success'
    });
  };

  const handleSaveAttendee = () => {
    try {
      if (editingAttendee?.id) {
        updateAttendee(editingAttendee);
      } else {
        addAttendee(editingAttendee);
      }
      setOpenAttendeeModal(false);
      setEditingAttendee(null);
      setSnackbar({
        open: true,
        message: `Attendee ${editingAttendee?.id ? 'updated' : 'added'} successfully`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to save attendee:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save attendee. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCreateEvent = async () => {
    try {
      await addEvent(newEvent);
      setOpenEventModal(false);
      setNewEvent({
        title: '',
        description: '',
        date: null,
        time: '',
        location: '',
        expectedAttendees: '',
        image: ''
      });
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

  const stats = [
    { title: 'Total Events', value: '24', icon: EventIcon, color: '#2196f3' },
    { title: 'Total Attendees', value: '487', icon: PeopleIcon, color: '#4caf50' },
    { title: 'Active Tasks', value: '12', icon: TaskIcon, color: '#ff9800' },
    { title: 'Revenue', value: '₹34,70,500', icon: MoneyIcon, color: '#f44336' },
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

  const recentTasks = [
    { id: 1, title: 'Finalize venue contract', status: 'pending', dueDate: 'Jan 25', event: 'Tech Conference 2025', assignedTo: 'Sarah Johnson' },
    { id: 2, title: 'Send speaker invitations', status: 'completed', dueDate: 'Jan 28', event: 'Tech Conference 2025', assignedTo: 'Michael Chen' },
    { id: 3, title: 'Order promotional materials', status: 'in_progress', dueDate: 'Feb 1', event: 'Product Launch', assignedTo: 'Emma Davis' },
    { id: 4, title: 'Review catering options', status: 'pending', dueDate: 'Feb 5', event: 'Design Workshop', assignedTo: 'Alex Thompson' },
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
          {getRecentEvents().map((event) => (
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
                      {new Date(event.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PeopleIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.expectedAttendees} Attendees
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontFamily: 'Montserrat' }}>
                  Recent Tasks
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setOpenTaskModal(true)}
                  sx={{ textTransform: 'none' }}
                >
                  Add Task
                </Button>
              </Box>
              {getRecentTasks().map((task) => (
                <Box key={task.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <IconButton
                        size="small"
                        onClick={() => updateTask(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                        sx={{ mr: 1, mt: 0.5 }}
                      >
                        {task.status === 'completed' ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <RadioButtonUncheckedIcon />
                        )}
                      </IconButton>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                            color: task.status === 'completed' ? 'text.secondary' : 'text.primary'
                          }}
                        >
                          {task.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Due: {new Date(task.dueDate).toLocaleDateString()} | {task.event}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Assigned to: {task.assignedTo}
                        </Typography>
                      </Box>
                    </Box>
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
              {getRecentAttendees().map((attendee) => (
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
                          onClick={() => handleDeleteAttendee(attendee)}
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
              value={newEvent.title}
              onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={4}
              value={newEvent.description}
              onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={newEvent.date}
                    onChange={(date) => setNewEvent(prev => ({ ...prev, date }))}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  margin="normal"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Location"
              margin="normal"
              value={newEvent.location}
              onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
            />
            <TextField
              fullWidth
              label="Expected Attendees"
              type="number"
              margin="normal"
              value={newEvent.expectedAttendees}
              onChange={(e) => setNewEvent(prev => ({ ...prev, expectedAttendees: e.target.value }))}
            />
            <TextField
              fullWidth
              label="Image URL (Optional)"
              margin="normal"
              value={newEvent.image}
              onChange={(e) => setNewEvent(prev => ({ ...prev, image: e.target.value }))}
              helperText="Leave empty to use default event image"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEventModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateEvent}>Create Event</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAttendeeModal} onClose={() => {
        setOpenAttendeeModal(false);
        setEditingAttendee(null);
      }} maxWidth="sm" fullWidth>
        <DialogTitle>{editingAttendee ? 'Edit Attendee' : 'Add New Attendee'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              required
              value={editingAttendee?.name || ''}
              onChange={(e) => setEditingAttendee(prev => ({ ...prev, name: e.target.value }))}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
              value={editingAttendee?.email || ''}
              onChange={(e) => setEditingAttendee(prev => ({ ...prev, email: e.target.value }))}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Event</InputLabel>
              <Select
                value={editingAttendee?.event || ''}
                onChange={(e) => setEditingAttendee(prev => ({ ...prev, event: e.target.value }))}
                label="Event"
              >
                {getRecentEvents().map((event) => (
                  <MenuItem key={event.id} value={event.title}>
                    {event.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenAttendeeModal(false);
            setEditingAttendee(null);
          }}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveAttendee}>
            {editingAttendee ? 'Save Changes' : 'Add Attendee'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTaskModal} onClose={() => setOpenTaskModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Event</InputLabel>
              <Select
                value={newTask.event}
                label="Event"
                onChange={(e) => setNewTask(prev => ({ ...prev, event: e.target.value }))}
              >
                {events.map((event) => (
                  <MenuItem key={event.id} value={event.title}>
                    {event.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Due Date"
                value={newTask.dueDate}
                onChange={(date) => setNewTask(prev => ({ ...prev, dueDate: date }))}
                slotProps={{ textField: { fullWidth: true, sx: { mb: 2 } } }}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              label="Assigned To"
              value={newTask.assignedTo}
              onChange={(e) => setNewTask(prev => ({ ...prev, assignedTo: e.target.value }))}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskModal(false)}>Cancel</Button>
          <Button onClick={handleCreateTask} variant="contained" color="primary">
            Create Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmDialog}
        onClose={() => setDeleteConfirmDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {attendeeToDelete?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmDialog(false)}>Cancel</Button>
          <Button onClick={confirmDeleteAttendee} color="error" variant="contained">
            Delete
          </Button>
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
    </Box>
  );
};

export default Dashboard;
