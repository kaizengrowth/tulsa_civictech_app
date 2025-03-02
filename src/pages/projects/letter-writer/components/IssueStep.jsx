import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

export default function IssueStep({ zipCode, onSelect, onBack }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLocalIssues();
  }, [zipCode]);

  const fetchLocalIssues = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/get-local-issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zipCode }),
      });

      if (!response.ok) throw new Error('Failed to fetch issues');
      
      const data = await response.json();
      setIssues(data.issues);
    } catch (err) {
      setError('Error loading local issues. Please try again.');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 2 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button onClick={onBack}>Go Back</Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select an Issue for Your Area
      </Typography>
      
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {issues.map((issue) => (
          <Grid item xs={12} key={issue.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
              onClick={() => onSelect(issue)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {issue.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {issue.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button onClick={onBack}>
          Back
        </Button>
      </Box>
    </Box>
  );
} 