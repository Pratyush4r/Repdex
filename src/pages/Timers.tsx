/** Module: Timers.tsx */
import React from 'react';
import { Box } from '@mui/material';

import TimerStudio from '../components/TimerStudio';

const Timers = () => (
  <Box sx={{ mt: { lg: '44px', xs: '24px' }, pb: { xs: 2, sm: 3 } }}>
    <TimerStudio />
  </Box>
);

export default Timers;
