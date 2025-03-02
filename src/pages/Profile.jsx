import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Divider,
  Grid,
  Chip,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  School as EducationIcon,
} from '@mui/icons-material';

const Profile = () => {
  const userProfile = {
    username: 'CivicChampion',
    points: 450,
    level: 3,
    profileCompletion: 75,
    team: 'Downtown District',
    badges: [
      { id: 1, name: 'City Council Expert', icon: '🏛️', points: 100 },
      { id: 2, name: 'Community Leader', icon: '👥', points: 150 },
      { id: 3, name: 'Budget Master', icon: '📊', points: 200 },
    ],
    achievements: [
      { id: 1, name: 'Completed Government 101', progress: 100 },
      { id: 2, name: 'Local Nonprofits Explorer', progress: 60 },
      { id: 3, name: 'Community Initiatives Specialist', progress: 30 },
    ],
    stats: {
      modulesCompleted: 12,
      daysStreak: 7,
      totalHoursLearned: 8,
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Profile Header */}
        <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f5f9ff' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{ 
                width: 100, 
                height: 100, 
                mr: 3,
                backgroundColor: 'primary.main'
              }}
            >
              {userProfile.username[0]}
            </Avatar>
            <Box>
              <Typography variant="h4">{userProfile.username}</Typography>
              <Typography variant="h6" color="primary">
                Level {userProfile.level} • {userProfile.points} Points
              </Typography>
              <Chip 
                icon={<TrophyIcon />} 
                label={`Team: ${userProfile.team}`}
                color="secondary"
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Achievements Section */}
        <Typography variant="h5" gutterBottom>
          Learning Progress
        </Typography>
        <Paper sx={{ p: 3 }}>
          <List>
            {userProfile.achievements.map((achievement) => (
              <Box key={achievement.id}>
                <ListItem>
                  <ListItemIcon>
                    <EducationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={achievement.name}
                    secondary={`${achievement.progress}% Complete`}
                  />
                  <ListItemSecondaryAction>
                    <CircularProgress 
                      variant="determinate" 
                      value={achievement.progress} 
                      size={30}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        </Paper>

        {/* Badges Section */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Earned Badges
        </Typography>
        <Grid container spacing={2}>
          {userProfile.badges.map((badge) => (
            <Grid item xs={12} sm={4} key={badge.id}>
              <Paper 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Typography variant="h2" component="div">
                  {badge.icon}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {badge.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +{badge.points} points
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile; 