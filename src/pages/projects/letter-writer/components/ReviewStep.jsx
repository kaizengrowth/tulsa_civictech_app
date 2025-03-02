import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Alert,
} from '@mui/material';

export default function ReviewStep({ letterData, onBack }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');

  const handleGenerateLetter = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zipCode: letterData.zipCode,
          issue: letterData.issue,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate letter');
      
      const data = await response.json();
      setGeneratedLetter(data.letter);
      setSuccess(true);
    } catch (error) {
      setError(error.message || 'Error generating letter. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review and Generate Letter
      </Typography>

      <Paper sx={{ p: 3, mb: 3, bgcolor: '#f5f9ff' }}>
        <Typography variant="subtitle1" gutterBottom>
          Selected Issue:
        </Typography>
        <Typography variant="body1" paragraph>
          {letterData.issue?.title}
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom>
          Description:
        </Typography>
        <Typography variant="body1" paragraph>
          {letterData.issue?.description}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          ZIP Code:
        </Typography>
        <Typography variant="body1">
          {letterData.zipCode}
        </Typography>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && generatedLetter && (
        <Paper sx={{ p: 3, mb: 3, bgcolor: '#fff' }}>
          <Typography variant="subtitle1" gutterBottom>
            Generated Letter:
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {generatedLetter}
          </Typography>
        </Paper>
      )}

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button onClick={onBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateLetter}
          disabled={loading || success}
        >
          {loading ? <CircularProgress size={24} /> : 'Generate Letter'}
        </Button>
        {success && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {/* Add download or copy functionality */}}
          >
            Download Letter
          </Button>
        )}
      </Box>
    </Box>
  );
} 