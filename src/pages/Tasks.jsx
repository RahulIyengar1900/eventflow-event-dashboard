import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import PageHeader from '../components/layout/PageHeader';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finalize venue contract', status: 'pending', dueDate: '2025-01-25', event: 'Tech Conference 2025', assignedTo: 'Sarah Johnson' },
    { id: 2, title: 'Send speaker invitations', status: 'completed', dueDate: '2025-01-28', event: 'Tech Conference 2025', assignedTo: 'Michael Chen' },
    { id: 3, title: 'Order promotional materials', status: 'in_progress', dueDate: '2025-02-01', event: 'Product Launch', assignedTo: 'Emma Davis' },
    { id: 4, title: 'Review catering options', status: 'pending', dueDate: '2025-02-05', event: 'Design Workshop', assignedTo: 'Alex Thompson' },
  ]);

  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [selectedDate, setSelectedDate] = useState(null);

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

  const handleEditTask = (task) => {
    setEditingTask(task);
    setOpenTaskModal(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
      <PageHeader
        title="Tasks"
        subtitle="Manage your event tasks"
        showActions={true}
        onAddTask={() => {
          setEditingTask(null);
          setOpenTaskModal(true);
        }}
      />

      <Container maxWidth={false} sx={{ flex: 1, py: 6, width: '100%' }}>
        <Paper sx={{ width: '100%', p: 3 }}>
          <List sx={{ width: '100%' }}>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                sx={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                  py: 2,
                  listStyle: 'none',
                }}
                secondaryAction={
                  <Box>
                    <IconButton edge="end" onClick={() => handleEditTask(task)} sx={{ mr: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteTask(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemIcon>
                  <IconButton onClick={() => handleTaskComplete(task.id)}>
                    {completedTasks.has(task.id) ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textDecoration: completedTasks.has(task.id) ? 'line-through' : 'none',
                        color: completedTasks.has(task.id) ? 'text.secondary' : 'text.primary',
                      }}
                    >
                      {task.title}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Due: {task.dueDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Event: {task.event}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Assigned to: {task.assignedTo}
                      </Typography>
                      <Chip
                        label={task.status}
                        color={
                          task.status === 'completed' ? 'success' :
                          task.status === 'in_progress' ? 'warning' : 'error'
                        }
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>

      <Dialog open={openTaskModal} onClose={() => {
        setOpenTaskModal(false);
        setEditingTask(null);
      }} maxWidth="sm" fullWidth>
        <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Task Title"
              margin="normal"
              required
              defaultValue={editingTask?.title || ''}
            />
            <TextField
              fullWidth
              label="Event"
              margin="normal"
              required
              defaultValue={editingTask?.event || ''}
            />
            <TextField
              fullWidth
              label="Assigned To"
              margin="normal"
              required
              defaultValue={editingTask?.assignedTo || ''}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Due Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
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
          <Button onClick={() => {
            setOpenTaskModal(false);
            setEditingTask(null);
          }}>Cancel</Button>
          <Button variant="contained" onClick={() => {
            setOpenTaskModal(false);
            setEditingTask(null);
          }}>{editingTask ? 'Save Changes' : 'Add Task'}</Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: '100%',
          bgcolor: '#333',
          color: 'white',
          py: 6,
          mt: 6,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Montserrat' }}>
                EventFlow
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Streamline your event management process with our powerful platform.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
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
            <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
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
          <Box sx={{ mt: 4, textAlign: 'center', opacity: 0.8 }}>
            <Typography variant="body2">
              2025 EventFlow. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Tasks;
