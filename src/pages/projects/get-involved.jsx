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
  Divider,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Favorite,
  AccessTime,
  LocationOn,
  Group,
  FilterList,
} from '@mui/icons-material';
import { useState } from 'react';
import VolunteerApplicationModal from '../../components/VolunteerApplicationModal';

export default function GetInvolved() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [applicationOpen, setApplicationOpen] = useState(false);

  const opportunities = [
    {
      title: "Digital Literacy Coach",
      organization: "Tulsa Library",
      type: "Teaching",
      commitment: "2-4 hours/week",
      location: "Multiple Locations",
      impact: "Help seniors and adults learn essential digital skills",
      skills: ["Teaching", "Technology", "Patience"],
      image: "/images/digital-literacy.jpg",
      openings: 5
    },
    {
      title: "Community Garden Leader",
      organization: "Tulsa Food Security",
      type: "Environment",
      commitment: "5-10 hours/week",
      location: "North Tulsa",
      impact: "Lead sustainable food initiatives in underserved areas",
      skills: ["Gardening", "Leadership", "Community Outreach"],
      image: "/images/community-garden.jpg",
      openings: 3
    },
    {
      title: "Youth Mentor",
      organization: "Big Brothers Big Sisters of Tulsa",
      type: "Mentoring",
      commitment: "4-6 hours/month",
      location: "Various",
      impact: "Guide and support local youth in their personal development",
      skills: ["Mentoring", "Communication", "Reliability"],
      image: "/images/youth-mentor.jpg",
      openings: 10
    },
    {
      title: "Civic Tech Developer",
      organization: "Code for Tulsa",
      type: "Technology",
      commitment: "Flexible",
      location: "Remote/Hybrid",
      impact: "Build technology solutions for local civic challenges",
      skills: ["Programming", "Problem Solving", "Collaboration"],
      image: "/images/civic-tech.jpg",
      openings: 8
    },
    {
      title: "Housing Advocate",
      organization: "Tulsa Housing Solutions",
      type: "Advocacy",
      commitment: "3-5 hours/week",
      location: "Downtown Tulsa",
      impact: "Support initiatives for affordable housing and tenant rights",
      skills: ["Advocacy", "Research", "Communication"],
      image: "/images/housing-advocacy.jpg",
      openings: 4
    },
    {
      title: "Emergency Response Volunteer",
      organization: "Tulsa CERT",
      type: "Emergency Services",
      commitment: "On-call + Monthly Training",
      location: "Citywide",
      impact: "Assist in community emergency preparedness and response",
      skills: ["First Aid", "Emergency Response", "Team Work"],
      image: "/images/emergency-response.jpg",
      openings: 15
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => 
    opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplyClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setApplicationOpen(true);
  };

  const handleCloseApplication = () => {
    setApplicationOpen(false);
    setSelectedOpportunity(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Volunteer Opportunities
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Make a difference in your community through meaningful volunteer work
      </Typography>

      <Box sx={{ mb: 6, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search opportunities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <IconButton color="primary" aria-label="filter">
          <FilterList />
        </IconButton>
      </Box>

      <Grid container spacing={4}>
        {filteredOpportunities.map((opportunity, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={opportunity.image}
                alt={opportunity.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={opportunity.type}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Chip 
                    label={`${opportunity.openings} openings`}
                    color="secondary"
                    size="small"
                    sx={{ mb: 2, ml: 1 }}
                  />
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {opportunity.title}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {opportunity.organization}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {opportunity.impact}
                </Typography>
                
                <Box sx={{ mt: 2, mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {opportunity.skills.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {opportunity.commitment}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {opportunity.location}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<Group />}
                  onClick={() => handleApplyClick(opportunity)}
                >
                  Apply Now
                </Button>
                <IconButton 
                  color="primary"
                  aria-label="save opportunity"
                >
                  <Favorite />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <VolunteerApplicationModal
        open={applicationOpen}
        onClose={handleCloseApplication}
        opportunity={selectedOpportunity}
      />
    </Container>
  );
} 