import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Card,
  CardContent,
  IconButton,
  Button,
} from '@mui/material';
import {
  AccessTime,
  Star,
  EmojiEvents,
  Share,
  Facebook,
  Twitter,
  LinkedIn,
} from '@mui/icons-material';

export default function VolunteerDashboard() {
  const volunteerStats = {
    hoursCompleted: 45,
    upcomingShifts: 3,
    projectsJoined: 4,
    impactScore: 850,
  };

  const achievements = [
    {
      title: "First Time Volunteer",
      description: "Completed your first volunteer shift",
      date: "Jan 15, 2024",
      icon: <Star color="primary" />,
    },
    {
      title: "Community Champion",
      description: "Volunteered 25+ hours",
      date: "Feb 28, 2024",
      icon: <EmojiEvents color="primary" />,
    },
  ];

  const upcomingShifts = [
    {
      role: "Digital Literacy Coach",
      organization: "Tulsa Library",
      date: "March 25, 2024",
      time: "2:00 PM - 4:00 PM",
    },
    {
      role: "Community Garden Leader",
      organization: "Tulsa Food Security",
      date: "March 28, 2024",
      time: "9:00 AM - 12:00 PM",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        My Volunteer Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Stats Cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Hours Completed
                </Typography>
                <Typography variant="h3">
                  {volunteerStats.hoursCompleted}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={75} 
                  sx={{ mt: 2 }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Impact Score
                </Typography>
                <Typography variant="h3">
                  {volunteerStats.impactScore}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <IconButton size="small">
                    <Facebook />
                  </IconButton>
                  <IconButton size="small">
                    <Twitter />
                  </IconButton>
                  <IconButton size="small">
                    <LinkedIn />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Upcoming Shifts */}
          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Shifts
            </Typography>
            <List>
              {upcomingShifts.map((shift, index) => (
                <Box key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <AccessTime />
                    </ListItemIcon>
                    <ListItemText
                      primary={shift.role}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            {shift.organization}
                          </Typography>
                          <br />
                          {`${shift.date} • ${shift.time}`}
                        </>
                      }
                    />
                    <Button variant="outlined" size="small">
                      View Details
                    </Button>
                  </ListItem>
                  {index < upcomingShifts.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Achievements
              </Typography>
              <List>
                {achievements.map((achievement, index) => (
                  <Box key={index}>
                    <ListItem>
                      <ListItemIcon>
                        {achievement.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={achievement.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {achievement.description}
                            </Typography>
                            <br />
                            {achievement.date}
                          </>
                        }
                      />
                      <IconButton size="small">
                        <Share fontSize="small" />
                      </IconButton>
                    </ListItem>
                    {index < achievements.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
} 