import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import { Send as SendIcon, Person as RepIcon } from '@mui/icons-material';

export default function LetterWriter() {
  const [topic, setTopic] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [stance, setStance] = useState('');
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState('');
  const [representatives, setRepresentatives] = useState([]);
  const [error, setError] = useState('');

  const generateLetter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // First get representatives based on zip code
      const repsResponse = await fetch(`/api/representatives?zipCode=${zipCode}`);
      const repsData = await repsResponse.json();
      if (!repsResponse.ok) throw new Error(repsData.message);
      setRepresentatives(repsData);

      // Generate letter using OpenAI
      const response = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          stance,
          zipCode,
          representatives: repsData
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setLetter(data.letter);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Error generating letter. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        AI Letter Writer
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Generate a personalized letter to your representatives about issues that matter to you
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Write Your Letter
            </Typography>
            <form onSubmit={generateLetter}>
              <TextField
                fullWidth
                label="What issue do you care about?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Public Transportation, Education, Housing"
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Your ZIP Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="74103"
                margin="normal"
                inputProps={{ pattern: "[0-9]{5}" }}
                required
              />

              <TextField
                fullWidth
                label="Your Position"
                value={stance}
                onChange={(e) => setStance(e.target.value)}
                placeholder="Briefly describe your position on this issue..."
                margin="normal"
                multiline
                rows={4}
                required
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                sx={{ mt: 3 }}
                fullWidth
              >
                {loading ? 'Generating...' : 'Generate Letter'}
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {letter && (
            <Box>
              <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Your Generated Letter
                </Typography>
                <Box sx={{ 
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'serif',
                  fontSize: '1.1rem',
                  lineHeight: 1.8 
                }}>
                  {letter}
                </Box>
                <Button
                  variant="outlined"
                  sx={{ mt: 3 }}
                  onClick={() => {
                    navigator.clipboard.writeText(letter);
                  }}
                >
                  Copy Letter
                </Button>
              </Paper>

              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Your Representatives
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {representatives.map((rep, index) => (
                  <Card key={index}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <RepIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">
                          {rep.name}
                        </Typography>
                      </Box>
                      <Typography color="text.secondary" gutterBottom>
                        {rep.office}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2">
                        {rep.address}
                      </Typography>
                      <Typography variant="body2">
                        {rep.email}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
} 