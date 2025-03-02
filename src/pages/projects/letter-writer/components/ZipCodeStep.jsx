import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

export default function ZipCodeStep({ onSubmit }) {
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateZipCode = (zip) => {
    return /^\d{5}$/.test(zip);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateZipCode(zipCode)) {
      setError('Please enter a valid 5-digit ZIP code');
      return;
    }

    setLoading(true);
    try {
      // Here we could validate if the ZIP is in Tulsa
      if (zipCode.startsWith('741')) {
        await onSubmit(zipCode);
      } else {
        setError('Please enter a valid Tulsa ZIP code');
      }
    } catch (error) {
      setError('Error validating ZIP code. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Enter your ZIP code to find your representative
      </Typography>
      
      <TextField
        fullWidth
        label="ZIP Code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        error={!!error}
        helperText={error}
        disabled={loading}
        sx={{ mb: 3 }}
        inputProps={{
          maxLength: 5,
          pattern: '[0-9]*',
        }}
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        disabled={loading || zipCode.length !== 5}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Find Representative'}
      </Button>
    </Box>
  );
} 