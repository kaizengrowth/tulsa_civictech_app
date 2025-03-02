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
    setError('');
    try {
      console.log('Fetching issues for ZIP:', zipCode);
      const response = await fetch('/api/get-local-issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zipCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch issues');
      }
      
      const data = await response.json();
      console.log('Received issues:', data);
      
      if (!data.issues || !Array.isArray(data.issues)) {
        throw new Error('Invalid response format');
      }

      setIssues(data.issues);
    } catch (err) {
      console.error('Error in fetchLocalIssues:', err);
      setError(err.message || 'Error loading local issues. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchLocalIssues();
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
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button onClick={onBack}>
            Go Back
          </Button>
          <Button variant="contained" onClick={handleRetry}>
            Retry
          </Button>
        </Box>
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