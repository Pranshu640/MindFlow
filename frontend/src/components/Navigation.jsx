import { Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { MusicNote, Chat as ChatIcon } from '@mui/icons-material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1100,
        display: 'flex',
        gap: 2,
        background: theme => theme.palette.mode === 'dark'
          ? 'rgba(0, 0, 0, 0.3)'
          : 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(10px)',
        padding: '8px',
        borderRadius: '50px',
        border: theme => theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(255, 255, 255, 0.7)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        height: '60px',
      }}
    >
      <Button
        variant={location.pathname === '/music' ? 'contained' : 'text'}
        onClick={() => navigate('/music')}
        startIcon={<MusicNote />}
        sx={{
          borderRadius: '25px',
          px: 2,
          background: location.pathname === '/music' 
            ? theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, rgba(138, 43, 226, 0.8), rgba(0, 255, 255, 0.8))'
              : 'linear-gradient(45deg, rgba(255, 107, 107, 0.8), rgba(255, 217, 61, 0.8))'
            : 'transparent',
        }}
      >
        Music
      </Button>
      <Button
        variant={location.pathname === '/chat' ? 'contained' : 'text'}
        onClick={() => navigate('/chat')}
        startIcon={<ChatIcon />}
        sx={{
          borderRadius: '25px',
          px: 2,
          background: location.pathname === '/chat'
            ? theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, rgba(138, 43, 226, 0.8), rgba(0, 255, 255, 0.8))'
              : 'linear-gradient(45deg, rgba(255, 107, 107, 0.8), rgba(255, 217, 61, 0.8))'
            : 'transparent',
        }}
      >
        Chat
      </Button>
      <Button
        variant={location.pathname === '/assessment' ? 'contained' : 'text'}
        onClick={() => navigate('/assessment')}
        startIcon={<PsychologyIcon />}
        sx={{
          borderRadius: '25px',
          px: 2,
          background: location.pathname === '/assessment'
            ? theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, rgba(138, 43, 226, 0.8), rgba(0, 255, 255, 0.8))'
              : 'linear-gradient(45deg, rgba(255, 107, 107, 0.8), rgba(255, 217, 61, 0.8))'
            : 'transparent',
        }}
      >
        Assessment
      </Button>
    </Box>
  );
}

export default Navigation; 