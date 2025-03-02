import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  CardMedia,
  Divider
} from '@mui/material';
import { 
  LocationOn, 
  AccessTime, 
  Category 
} from '@mui/icons-material';

export default function Events() {
  const events = [
    {
      title: "Civic Tech Hackathon",
      date: "March 30, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "36 Degrees North",
      category: "Technology",
      description: "Join local developers and civic leaders to build solutions for Tulsa's community challenges.",
      image: "/images/hackathon.jpg"
    },
    {
      title: "Community Budget Workshop",
      date: "April 2, 2024",
      time: "6:30 PM - 8:00 PM",
      location: "Central Library",
      category: "Government",
      description: "Learn how the city budget works and provide input on spending priorities.",
      image: "/images/budget.jpg"
    },
    {
      title: "Youth Leadership Summit",
      date: "April 15, 2024",
      time: "10:00 AM - 3:00 PM",
      location: "OSU Tulsa",
      category: "Education",
      description: "Empowering the next generation of Tulsa's leaders through workshops and mentorship.",
      image: "/images/youth.jpg"
    },
    {
      title: "Neighborhood Association Meeting",
      date: "April 5, 2024",
      time: "7:00 PM - 8:30 PM",
      location: "Pearl District Community Center",
      category: "Community",
      description: "Monthly meeting to discuss local developments and community initiatives.",
      image: "/images/neighborhood.jpg"
    },
    {
      title: "Environmental Action Day",
      date: "April 22, 2024",
      time: "8:00 AM - 12:00 PM",
      location: "Gathering Place",
      category: "Environment",
      description: "Earth Day celebration with tree planting and sustainability workshops.",
      image: "/images/environment.jpg"
    },
    {
      title: "City Council Open House",
      date: "April 8, 2024",
      time: "5:00 PM - 7:00 PM",
      location: "City Hall",
      category: "Government",
      description: "Meet your council members and learn about ongoing city projects.",
      image: "/images/council.jpg"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Upcoming Events
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Get involved in shaping Tulsa's future
      </Typography>

      <Grid container spacing={4}>
        {events.map((event, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={event.image}
                alt={event.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={event.category}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {event.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {event.date} • {event.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {event.location}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
                <Button size="small" variant="contained">
                  Register
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 