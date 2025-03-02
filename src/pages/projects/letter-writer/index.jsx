import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import ZipCodeStep from './components/ZipCodeStep';
import IssueStep from './components/IssueStep';
import ReviewStep from './components/ReviewStep';

const steps = ['Enter ZIP Code', 'Select Issue', 'Review & Send'];

function TestLetterGeneration() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState(null);

  const handleTestGeneration = async () => {
    setLoading(true);
    setError('');
    setResult('');
    setDebugInfo(null);

    try {
      console.log('Starting test letter generation...');
      const requestBody = {
        zipCode: '74103',
        issue: {
          title: 'Downtown Revitalization',
          description: 'Need for improved infrastructure and business development in downtown Tulsa.'
        }
      };
      console.log('Request body:', requestBody);

      const response = await fetch('http://localhost:3000/api/generate-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', responseData);

      setDebugInfo({
        status: response.status,
        responseData,
        requestBody,
      });

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'Failed to generate test letter');
      }

      setResult(responseData.letter);
    } catch (err) {
      console.error('Test generation error:', err);
      setError(`Error: ${err.message}. Check console for details.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ mt: 4, p: 3, bgcolor: '#fff3e0' }}>
      <Typography variant="h6" gutterBottom>
        🧪 Test Letter Generation
      </Typography>
      
      <Button
        variant="contained"
        onClick={handleTestGeneration}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Generate Test Letter'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {debugInfo && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
          <Typography variant="subtitle2" gutterBottom>Debug Information:</Typography>
          <pre style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </Paper>
      )}

      {result && (
        <Paper sx={{ p: 2, bgcolor: 'white' }}>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>
            {result}
          </Typography>
        </Paper>
      )}
    </Paper>
  );
}

export default function LetterWriter() {
  const [activeStep, setActiveStep] = useState(0);
  const [letterData, setLetterData] = useState({
    zipCode: '',
    issue: null,
    letter: '',
    representative: null,
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleZipCodeSubmit = async (zipCode) => {
    setLetterData(prev => ({ ...prev, zipCode }));
    handleNext();
  };

  const handleIssueSelect = async (issue) => {
    setLetterData(prev => ({ ...prev, issue }));
    handleNext();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ZipCodeStep onSubmit={handleZipCodeSubmit} />;
      case 1:
        return <IssueStep zipCode={letterData.zipCode} onSelect={handleIssueSelect} onBack={handleBack} />;
      case 2:
        return <ReviewStep letterData={letterData} onBack={handleBack} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Write to Your Representative
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" paragraph>
          Make your voice heard on issues that matter in your community
        </Typography>

        <Paper sx={{ mt: 4, p: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {getStepContent(activeStep)}
        </Paper>

        {/* <TestLetterGeneration /> */}
      </Box>
    </Container>
  );
} 