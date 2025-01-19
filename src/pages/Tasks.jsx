import React from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from '@mui/icons-material';
import { useTasks } from '../context/TaskContext';
import PageHeader from '../components/layout/PageHeader';

const Tasks = () => {
  const { tasks, updateTask } = useTasks();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
      <PageHeader
        title="Tasks"
        subtitle="Manage and track all your event-related tasks"
        showActions={true}
        onAddTask={() => {
          // Add task functionality
        }}
      />

      <Box sx={{ flex: 1, py: 6, width: '100%' }}>
        <Paper sx={{ p: 3, mt: 3, width: '100%' }}>
          <List>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                disablePadding
                sx={{ mb: 2, display: 'block' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <IconButton
                      size="small"
                      onClick={() => updateTask(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                    >
                      {task.status === 'completed' ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                          color: task.status === 'completed' ? 'text.secondary' : 'text.primary'
                        }}
                      >
                        {task.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary" component="div">
                          Due: {new Date(task.dueDate).toLocaleDateString()} | {task.event}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="div">
                          Assigned to: {task.assignedTo}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Chip
                            label={task.status}
                            color={task.status === 'completed' ? 'success' : 'default'}
                            size="small"
                          />
                        </Box>
                      </Box>
                    }
                  />
                </Box>
                <Divider sx={{ mt: 2 }} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

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
