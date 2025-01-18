import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import { Box, Paper, Typography, Grid } from '@mui/material';

const taskCompletionData = [
  { event: 'Design Workshop', completed: 15, pending: 5, total: 20 },
  { event: 'Tech Conference', completed: 8, pending: 4, total: 12 },
  { event: 'Team Building', completed: 5, pending: 3, total: 8 },
  { event: 'Product Launch', completed: 12, pending: 3, total: 15 },
  { event: 'Networking Mixer', completed: 6, pending: 4, total: 10 },
];

const attendeeGrowthData = [
  { month: 'Jan', attendees: 50 },
  { month: 'Feb', attendees: 80 },
  { month: 'Mar', attendees: 120 },
  { month: 'Apr', attendees: 180 },
  { month: 'May', attendees: 250 },
  { month: 'Jun', attendees: 310 },
];

const eventsGrowthData = [
  { month: 'Jan', events: 3 },
  { month: 'Feb', events: 5 },
  { month: 'Mar', events: 8 },
  { month: 'Apr', events: 12 },
  { month: 'May', events: 15 },
  { month: 'Jun', events: 20 },
];

const DashboardCharts = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">{label}</Typography>
          {payload.map((entry, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color }}
            >
              {entry.name}: {entry.value}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Task Completion Chart */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontFamily: 'Montserrat',
                fontWeight: 600,
              }}
            >
              Task Completion by Event
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={taskCompletionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="event"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="completed"
                  name="Completed Tasks"
                  fill="#4CAF50"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="pending"
                  name="Pending Tasks"
                  fill="#FFA726"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Attendee Growth Chart */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontFamily: 'Montserrat',
                fontWeight: 600,
              }}
            >
              Monthly Attendee Growth
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={attendeeGrowthData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="attendees"
                  name="Total Attendees"
                  stroke="#FF5722"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Events Growth Chart */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontFamily: 'Montserrat',
                fontWeight: 600,
              }}
            >
              Events Added Growth
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={eventsGrowthData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="events"
                  name="Total Events"
                  stroke="#2196F3"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCharts;
