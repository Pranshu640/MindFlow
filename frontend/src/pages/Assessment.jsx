import { Box } from '@mui/material';
import Assessment from '../components/MentalHealthTest/Assessment';
import BreathingBackground from '../components/BreathingBackground';

function AssessmentPage() {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <BreathingBackground />
      <Assessment />
    </Box>
  );
}

export default AssessmentPage; 