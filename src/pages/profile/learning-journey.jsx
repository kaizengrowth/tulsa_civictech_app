import { Box, Container, Typography, Paper, Grid, LinearProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LearningJourney() {
  const navigate = useNavigate();
  const userProgress = {
    points: 120,
    level: 2,
    completedModules: 3,
    totalModules: 10,
    dailyStreak: 5
  };

  const learningModules = [
    {
      title: "City Council Basics",
      duration: "15 min",
      points: 50,
      description: "Learn how Tulsa's City Council works and makes decisions.",
      path: "/modules/city-council"
    },
    {
      title: "Local Nonprofits",
      duration: "20 min",
      points: 75,
      description: "Discover key nonprofit organizations making an impact in Tulsa.",
      path: "/modules/nonprofits"
    },
    {
      title: "Community Initiatives",
      duration: "25 min",
      points: 100,
      description: "Explore current initiatives shaping Tulsa's future.",
      path: "/modules/community-initiatives"
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, mb: 4, backgroundColor: '#f5f9ff' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>
                Welcome back, Civic Leader!
              </Typography>
              <Typography variant="body1" gutterBottom>
                Level {userProgress.level} • {userProgress.points} Points
              </Typography>
              <Box sx={{ width: '100%', mt: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={(userProgress.completedModules / userProgress.totalModules) * 100}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {userProgress.completedModules} of {userProgress.totalModules} modules completed
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Paper elevation={3} sx={{ p: 2, backgroundColor: '#fff' }}>
                <Typography variant="h6" color="primary">
                  🔥 {userProgress.dailyStreak} Day Streak!
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        <Typography variant="h5" sx={{ mb: 3 }}>
          Today's Learning Path
        </Typography>

        <Grid container spacing={3}>
          {learningModules.map((module, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  cursor: 'pointer',
                  '&:hover': { 
                    backgroundColor: '#f5f9ff',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
                onClick={() => navigate(module.path)}
              >
                <Typography variant="h6" gutterBottom color="primary">
                  {module.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {module.duration} • {module.points} points
                </Typography>
                <Typography>
                  {module.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/modules')}
          >
            View All Learning Modules
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 