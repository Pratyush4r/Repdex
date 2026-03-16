import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

const BmiCalculator = () => {
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');

  const toggleUnit = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setStatus('');
    setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  const calculateBMI = () => {
    if (!weight || !height) return;

    let bmiValue;

    if (unit === 'metric') {
      const heightInMeters = height / 100;
      bmiValue = weight / (heightInMeters * heightInMeters);
    } else {
      bmiValue = (703 * weight) / (height * height); // height in inches, weight in lbs
    }

    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) setStatus('Underweight');
    else if (bmiValue < 24.9) setStatus('Normal weight');
    else if (bmiValue < 29.9) setStatus('Overweight');
    else setStatus('Obese');
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setStatus('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: { xs: 6, md: 10 }, mb: 10 }}>
      <Typography variant="h3" fontWeight="bold" align="center" mb={4} color="#FF2625">
        BMI Calculator
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant="outlined"
          onClick={toggleUnit}
          sx={{
            borderColor: '#FF2625',
            color: '#FF2625',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#ffeaea',
              borderColor: '#e01b1b',
              color: '#e01b1b',
            },
          }}
        >
          Switch to {unit === 'metric' ? 'Imperial (lbs/in)' : 'Metric (kg/cm)'}
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          label={`Weight (${unit === 'metric' ? 'kg' : 'lbs'})`}
          variant="outlined"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
        />

        <TextField
          label={`Height (${unit === 'metric' ? 'cm' : 'in'})`}
          variant="outlined"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          fullWidth
        />

        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#FF2625',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '18px',
              py: '10px',
              '&:hover': {
                backgroundColor: '#e01b1b',
              },
            }}
            onClick={calculateBMI}
          >
            Calculate BMI
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              color: '#FF2625',
              borderColor: '#FF2625',
              fontWeight: 'bold',
              fontSize: '18px',
              py: '10px',
              '&:hover': {
                borderColor: '#e01b1b',
                color: '#e01b1b',
              },
            }}
            onClick={resetForm}
          >
            Reset
          </Button>
        </Box>

        {bmi && (
          <Box mt={4} textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="#3A1212" gutterBottom>
              Your BMI: {bmi}
            </Typography>
            <Typography variant="h5" color="#757575">
              Status: {status}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default BmiCalculator;
