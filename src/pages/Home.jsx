import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  CardMedia,
} from '@mui/material';
import { TrendingUp, People, EmojiEvents, Assignment } from '@mui/icons-material';

export default function Home() {
  const stats = [
    { icon: <People />, count: "2,500+", label: "Active Citizens" },
    { icon: <Assignment />, count: "150+", label: "Letters Sent" },
    { icon: <EmojiEvents />, count: "45", label: "Civic Projects" },
    { icon: <TrendingUp />, count: "85%", label: "Engagement Rate" },
  ];

  const featuredUpdates = [
    {
      title: "City Council Meeting",
      date: "Next Tuesday, 6:00 PM",
      description: "Discussion on the new downtown development plan and public transportation initiatives.",
      image: "/images/citycouncil.jpeg"
    },
    {
      title: "Neighborhood Clean-up Drive",
      date: "Saturday, March 23",
      description: "Join your neighbors in beautifying the Kendall Whittier district.",
      image: "/images/cleanup.jpeg"
    },
    {
      title: "Budget Town Hall",
      date: "March 28, 5:30 PM",
      description: "Share your input on Tulsa's 2024 municipal budget priorities.",
      image: "/images/townhall.webp"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Shape Tulsa's Future
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Connect, engage, and make a difference in your community
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" component="div">
                  {stat.count}
                </Typography>
                <Typography color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Latest Updates
      </Typography>

      <Grid container spacing={4}>
        {featuredUpdates.map((update, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={update.image}
                alt={update.title}
              />
              <CardContent>
                <Typography variant="overline" color="primary">
                  {update.date}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                  {update.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {update.description}
                </Typography>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}