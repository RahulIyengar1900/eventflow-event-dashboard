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
import { Box, Paper, Typography, useTheme } from '@mui/material';

const taskCompletionData = [
  { event: 'Design Workshop', completed: 15, total: 20 },
  { event: 'Tech Conference', completed: 8, total: 12 },
  { event: 'Team Building', completed: 5, total: 8 },
  { event: 'Product Launch', completed: 12, total: 15 },
  { event: 'Networking Mixer', completed: 6, total: 10 },
];

const attendeeGrowthData = [
  { month: 'Jan', attendees: 50 },
  { month: 'Feb', attendees: 80 },
  { month: 'Mar', attendees: 120 },
  { month: 'Apr', attendees: 180 },
  { month: 'May', attendees: 250 },
  { month: 'Jun', attendees: 310 },
];

const DashboardCharts = () => {
  const theme = useTheme();

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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4,
        }}
      >
        {/* Task Completion Chart */}
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
                dataKey="total"
                name="Total Tasks"
                fill="#2196F3"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Attendee Growth Chart */}
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
      </Box>
    </Box>
  );
};

export default DashboardCharts;
