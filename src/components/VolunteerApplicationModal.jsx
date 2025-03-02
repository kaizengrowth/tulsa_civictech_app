import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { useState } from 'react';

const steps = ['Personal Info', 'Experience', 'Availability'];

export default function VolunteerApplicationModal({ open, onClose, opportunity }) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    skills: '',
    availability: [],
    references: '',
    emergencyContact: '',
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/send-application-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicant: formData,
          opportunity: {
            ...opportunity,
            organizationEmail: getOrganizationEmail(opportunity.organization),
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setNotification({
        open: true,
        message: 'Application submitted successfully! Check your email for confirmation.',
        severity: 'success'
      });

      // Close modal after delay
      setTimeout(() => {
        onClose();
        setActiveStep(0);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          experience: '',
          skills: '',
          availability: [],
          references: '',
          emergencyContact: '',
        });
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      setNotification({
        open: true,
        message: 'Error submitting application. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Helper function to get organization email
  const getOrganizationEmail = (org) => {
    const emailMap = {
      'Tulsa Library': 'volunteer@tulsalibrary.org',
      'Tulsa Food Security': 'volunteer@tulsafood.org',
      'Big Brothers Big Sisters of Tulsa': 'volunteer@bbbstulsa.org',
      'Code for Tulsa': 'volunteer@codefortulsa.org',
      'Tulsa Housing Solutions': 'volunteer@tulsahousing.org',
      'Tulsa CERT': 'volunteer@tulsacert.org',
    };
    return emailMap[org] || 'volunteer@tulsacivictech.org';
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={handleChange('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={handleChange('phone')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={formData.address}
                onChange={handleChange('address')}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Relevant Experience"
                multiline
                rows={4}
                value={formData.experience}
                onChange={handleChange('experience')}
                helperText="Describe any relevant experience you have for this role"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills"
                multiline
                rows={3}
                value={formData.skills}
                onChange={handleChange('skills')}
                helperText="List relevant skills and certifications"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="References"
                multiline
                rows={3}
                value={formData.references}
                onChange={handleChange('references')}
                helperText="Please provide 2-3 references with contact information"
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select
                  multiple
                  value={formData.availability}
                  onChange={handleChange('availability')}
                >
                  <MenuItem value="weekday-morning">Weekday Mornings</MenuItem>
                  <MenuItem value="weekday-afternoon">Weekday Afternoons</MenuItem>
                  <MenuItem value="weekday-evening">Weekday Evenings</MenuItem>
                  <MenuItem value="weekend-morning">Weekend Mornings</MenuItem>
                  <MenuItem value="weekend-afternoon">Weekend Afternoons</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Emergency Contact"
                value={formData.emergencyContact}
                onChange={handleChange('emergencyContact')}
                helperText="Name and phone number"
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Volunteer Application: {opportunity?.title}
          <Typography variant="subtitle2" color="text.secondary">
            {opportunity?.organization}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 4 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {renderStepContent(activeStep)}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          {activeStep > 0 && (
            <Button onClick={handleBack}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleSubmit} variant="contained">
              Submit Application
            </Button>
          ) : (
            <Button onClick={handleNext} variant="contained">
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
} 