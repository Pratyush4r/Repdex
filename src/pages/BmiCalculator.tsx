/** Module: BmiCalculator.tsx */
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

const BmiCalculator = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<string | null>(null);
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

    const numericWeight = Number(weight);
    const numericHeight = Number(height);

    if (!numericWeight || !numericHeight) return;

    let bmiValue: number;

    if (unit === 'metric') {
      const heightInMeters = numericHeight / 100;
      bmiValue = numericWeight / (heightInMeters * heightInMeters);
    } else {
      bmiValue = (703 * numericWeight) / (numericHeight * numericHeight);
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
    <Container
      maxWidth="sm"
      sx={{
        mt: { xs: 6, md: 10 },
        mb: 10,
        py: 4,
        borderRadius: '22px',
        background: 'var(--surface-color)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        align="center"
        mb={4}
        color="var(--accent)"
        sx={{ fontSize: { xs: '36px', md: '48px' } }}
      >
        BMI Calculator
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant="outlined"
          onClick={toggleUnit}
          sx={{
            borderColor: 'var(--accent)',
            color: 'var(--accent)',
            fontWeight: 'bold',
            fontSize: { xs: '16px', md: '18px' },
            py: '10px',
            '&:hover': {
              backgroundColor: 'var(--muted-surface)',
              borderColor: 'var(--accent-strong)',
              color: 'var(--accent-strong)',
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
          sx={{
            '& .MuiInputBase-input': {
              color: 'var(--text-primary)',
              fontSize: { xs: '18px', md: '20px' },
              py: '14px',
            },
            '& .MuiInputLabel-root': {
              color: 'var(--text-secondary)',
              fontSize: { xs: '16px', md: '18px' },
            },
          }}
        />

        <TextField
          label={`Height (${unit === 'metric' ? 'cm' : 'in'})`}
          variant="outlined"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          fullWidth
          sx={{
            '& .MuiInputBase-input': {
              color: 'var(--text-primary)',
              fontSize: { xs: '18px', md: '20px' },
              py: '14px',
            },
            '& .MuiInputLabel-root': {
              color: 'var(--text-secondary)',
              fontSize: { xs: '16px', md: '18px' },
            },
          }}
        />

        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-text)',
              fontWeight: 'bold',
              fontSize: { xs: '18px', md: '20px' },
              py: '12px',
              '&:hover': {
                backgroundColor: 'var(--accent-strong)',
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
              color: 'var(--accent)',
              borderColor: 'var(--accent)',
              fontWeight: 'bold',
              fontSize: { xs: '18px', md: '20px' },
              py: '12px',
              '&:hover': {
                borderColor: 'var(--accent-strong)',
                color: 'var(--accent-strong)',
              },
            }}
            onClick={resetForm}
          >
            Reset
          </Button>
        </Box>

        {bmi && (
          <Box mt={4} textAlign="center">
            <Typography
              variant="h4"
              fontWeight="bold"
              color="var(--text-primary)"
              gutterBottom
              sx={{ fontSize: { xs: '30px', md: '36px' } }}
            >
              Your BMI: {bmi}
            </Typography>
            <Typography
              variant="h5"
              color="var(--text-secondary)"
              sx={{ fontSize: { xs: '24px', md: '30px' } }}
            >
              Status: {status}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default BmiCalculator;
