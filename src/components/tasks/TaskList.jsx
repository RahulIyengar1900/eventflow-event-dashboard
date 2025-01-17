import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemIcon,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    name: '',
    deadline: '',
    status: 'pending',
    assignedTo: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    // TODO: Implement task creation/editing logic
    setTasks([...tasks, taskData]);
    handleClose();
  };

  const toggleTaskStatus = (index) => {
    const newTasks = [...tasks];
    newTasks[index].status = newTasks[index].status === 'completed' ? 'pending' : 'completed';
    setTasks(newTasks);
  };

  return (
    <>
      <Button
        startIcon={<Add />}
        variant="contained"
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Add Task
      </Button>

      <List>
        {tasks.map((task, index) => (
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
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.status === 'completed'}
                onChange={() => toggleTaskStatus(index)}
              />
            </ListItemIcon>
            <ListItemText
              primary={task.name}
              secondary={`Due: ${task.deadline} | Assigned to: ${task.assignedTo}`}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Name"
            fullWidth
            value={taskData.name}
            onChange={(e) =>
              setTaskData({ ...taskData, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={taskData.deadline}
            onChange={(e) =>
              setTaskData({ ...taskData, deadline: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={taskData.status}
              label="Status"
              onChange={(e) =>
                setTaskData({ ...taskData, status: e.target.value })
              }
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Assigned To"
            fullWidth
            value={taskData.assignedTo}
            onChange={(e) =>
              setTaskData({ ...taskData, assignedTo: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskList;
