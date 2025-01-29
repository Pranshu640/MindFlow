import { Box } from '@mui/material';

function AudioPlayer({ url }) {
  return (
    <Box sx={{ width: '100%' }}>
      <audio controls style={{ width: '100%' }}>
        <source src={url} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
}

export default AudioPlayer; 