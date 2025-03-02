import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  CardMedia 
} from '@mui/material';
import { Edit as LetterIcon, GroupAdd as GetInvolvedIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const projects = [
  {
    title: "Write to Representatives",
    description: "Generate AI-assisted letters to your local representatives about issues you care about in Tulsa.",
    icon: LetterIcon,
    path: "/projects/letter-writer",
    image: "/images/letter-writing.png"
  },
  {
    title: "Get Involved",
    description: "Find opportunities to participate in local civic activities and community service.",
    icon: GetInvolvedIcon,
    path: "/projects/get-involved",
    image: "/images/get-involved.jpg"
  }
];

export default function Projects() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Civic Projects
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Choose a project to make a difference in your community
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {projects.map((project) => (
          <Grid item key={project.title} xs={12} sm={6}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'scale(1.02)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={project.image}
                alt={project.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {project.title}
                </Typography>
                <Typography>
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="large" 
                  startIcon={<project.icon />}
                  onClick={() => navigate(project.path)}
                  sx={{ ml: 1, mb: 1 }}
                >
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 