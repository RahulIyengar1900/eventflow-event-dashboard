import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddTaskModal = ({ open, onClose, attendees }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assignedTo: null,
    dueDate: '',
    priority: 'medium',
    status: 'open',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field) => (event) => {
    setTaskData({
      ...taskData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log(taskData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  const priorities = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' },
  ];

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            p: 4,
            maxWidth: 600,
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
              Add New Task
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Task Title"
                  fullWidth
                  required
                  value={taskData.title}
                  onChange={handleChange('title')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  value={taskData.description}
                  onChange={handleChange('description')}
                  placeholder="Enter task details, requirements, and any specific instructions..."
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={attendees || []}
                  getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                  value={taskData.assignedTo}
                  onChange={(event, newValue) => {
                    setTaskData({
                      ...taskData,
                      assignedTo: newValue,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assign To"
                      required
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Due Date"
                  type="date"
                  fullWidth
                  required
                  value={taskData.dueDate}
                  onChange={handleChange('dueDate')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={taskData.priority}
                    label="Priority"
                    onChange={handleChange('priority')}
                  >
                    {priorities.map((priority) => (
                      <MenuItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={taskData.status}
                    label="Status"
                    onChange={handleChange('status')}
                  >
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="review">Review</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    borderColor: '#333',
                    color: '#333',
                    '&:hover': {
                      borderColor: '#000',
                      backgroundColor: 'rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#333',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#000',
                    },
                  }}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Task created successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddTaskModal;
