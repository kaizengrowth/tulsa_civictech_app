import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@mui/material';
import ZipCodeStep from './components/ZipCodeStep';
import IssueStep from './components/IssueStep';
import ReviewStep from './components/ReviewStep';

const steps = ['Enter ZIP Code', 'Select Issue', 'Review & Send'];

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
      </Box>
    </Container>
  );
} 