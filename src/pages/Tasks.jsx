import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Chip,
  Menu,
  MenuItem,
  Checkbox,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddTaskModal from '../components/modals/AddTaskModal';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/common/Footer';

const Tasks = () => {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const tasks = [
    { id: 1, title: 'Prepare event proposal', status: 'open', assignee: 'Sarah Johnson', priority: 'high', dueDate: 'Jan 20' },
    { id: 2, title: 'Book venue for conference', status: 'closed', assignee: 'Michael Chen', priority: 'medium', dueDate: 'Jan 22' },
    { id: 3, title: 'Send invitations', status: 'open', assignee: 'Emma Davis', priority: 'high', dueDate: 'Jan 25' },
    { id: 4, title: 'Order catering', status: 'open', assignee: 'Alex Thompson', priority: 'medium', dueDate: 'Jan 28' },
    { id: 5, title: 'Arrange transportation', status: 'open', assignee: 'Lisa Wang', priority: 'low', dueDate: 'Jan 30' },
    { id: 6, title: 'Set up registration system', status: 'closed', assignee: 'David Kim', priority: 'high', dueDate: 'Feb 1' },
    { id: 7, title: 'Design event badges', status: 'open', assignee: 'Rachel Green', priority: 'medium', dueDate: 'Feb 3' },
    { id: 8, title: 'Coordinate with speakers', status: 'open', assignee: 'James Wilson', priority: 'high', dueDate: 'Feb 5' },
  ];

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleTaskToggle = (taskId) => {
    // Implement task toggle logic
  };

  const getPriorityColor = (priority, status) => {
    if (status === 'closed') return '#e0e0e0';
    switch (priority) {
      case 'high':
        return '#ef5350';
      case 'medium':
        return '#fb8c00';
      case 'low':
        return '#66bb6a';
      default:
        return '#333';
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100vw',
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      <PageHeader title="Manage Your Tasks" />
      
      <Box sx={{ 
        flex: 1,
        width: '100%',
        px: { xs: 3, md: 6 },
        pb: 6
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          width: '100%'
        }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleFilterClick}
              sx={{
                borderColor: '#333',
                color: '#333',
                '&:hover': {
                  borderColor: '#000',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                },
              }}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddTask(true)}
              sx={{
                backgroundColor: '#333',
                '&:hover': {
                  backgroundColor: '#000',
                },
              }}
            >
              Add Task
            </Button>
          </Box>
        </Box>

        {/* Search and Filter Bar */}
        <Box sx={{ mb: 4, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#666' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#333',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Tasks List */}
        <Card sx={{ 
          borderRadius: 0, 
          width: '100%',
          maxWidth: '100%',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <List sx={{ 
            width: '100%',
            maxWidth: '100%',
            p: 0
          }}>
            {tasks.map((task, index) => (
              <React.Fragment key={task.id}>
                <ListItem sx={{ width: '100%' }}>
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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
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
                        <Chip
                          label={task.priority}
                          size="small"
                          sx={{
                            backgroundColor: getPriorityColor(task.priority, task.status),
                            color: 'white',
                            fontFamily: 'Montserrat',
                            textTransform: 'capitalize',
                            height: '24px',
                          }}
                        />
                      </Box>
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
                          Assigned to: {task.assignee}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: 'Montserrat',
                            color: '#666',
                            fontSize: '0.875rem',
                          }}
                        >
                          Due: {task.dueDate}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" sx={{ color: '#666', mr: 1 }}>
                      <EditIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                    <IconButton edge="end" sx={{ color: '#666' }}>
                      <DeleteIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < tasks.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Card>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 180,
            },
          }}
        >
          <MenuItem onClick={handleFilterClose}>All Tasks</MenuItem>
          <MenuItem onClick={handleFilterClose}>Open Tasks</MenuItem>
          <MenuItem onClick={handleFilterClose}>Completed Tasks</MenuItem>
          <MenuItem onClick={handleFilterClose}>High Priority</MenuItem>
          <MenuItem onClick={handleFilterClose}>Medium Priority</MenuItem>
          <MenuItem onClick={handleFilterClose}>Low Priority</MenuItem>
        </Menu>

        {/* Add Task Modal */}
        <AddTaskModal
          open={openAddTask}
          onClose={() => setOpenAddTask(false)}
        />
      </Box>

      <Footer />
    </Box>
  );
};

export default Tasks;
