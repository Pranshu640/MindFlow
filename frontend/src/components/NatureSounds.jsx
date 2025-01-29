import { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Typography, Slider, Paper } from '@mui/material';
import { WaterDrop, Air, VolumeUp, VolumeMute } from '@mui/icons-material';

const NATURE_SOUNDS = {
  rain: {
    name: 'Rain',
    path: '/sounds/rain.mp3',
    icon: WaterDrop,
  },
  wind: {
    name: 'Wind',
    path: '/sounds/wind.mp3',
    icon: Air,
  },
};

function NatureSound({ type, sound, onVolumeChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio on component mount
    audioRef.current = new Audio(sound.path);
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = volume;

    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [sound.path]); // Reinitialize if path changes

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      onVolumeChange(type, volume);
    }
  }, [volume, type, onVolumeChange]);

  const togglePlay = () => {
    if (!audioRef.current) {
      return;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
          });
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const Icon = sound.icon;

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: 2,
    }}>
      <IconButton 
        onClick={togglePlay}
        sx={{
          p: 2,
          background: theme => isPlaying 
            ? theme.palette.mode === 'dark'
              ? 'rgba(138, 43, 226, 0.2)'
              : 'rgba(255, 107, 107, 0.2)'
            : 'transparent',
          '&:hover': {
            background: theme => theme.palette.mode === 'dark'
              ? 'rgba(138, 43, 226, 0.3)'
              : 'rgba(255, 107, 107, 0.3)',
          }
        }}
      >
        <Icon 
          sx={{ 
            fontSize: '2rem',
            color: theme => isPlaying 
              ? theme.palette.mode === 'dark'
                ? 'primary.main'
                : 'primary.dark'
              : 'text.secondary',
          }} 
        />
      </IconButton>
      
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" sx={{ minWidth: 80 }}>
          {sound.name}
        </Typography>
        <Slider
          size="small"
          value={volume * 100}
          onChange={(_, newValue) => setVolume(newValue / 100)}
          disabled={!isPlaying}
          sx={{
            '& .MuiSlider-thumb': {
              width: 16,
              height: 16,
            }
          }}
        />
        {isPlaying ? <VolumeUp fontSize="small" /> : <VolumeMute fontSize="small" />}
      </Box>
    </Box>
  );
}

function NatureSounds() {
  const handleVolumeChange = (type, volume) => {
    // You can use this to sync with other app state if needed
    console.log(`${type} volume changed to ${volume}`);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        background: theme => theme.palette.mode === 'dark'
          ? 'rgba(138, 43, 226, 0.05)'
          : 'rgba(255, 107, 107, 0.05)',
        borderRadius: 2,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Typography 
        variant="subtitle1" 
        gutterBottom 
        sx={{ 
          color: theme => theme.palette.mode === 'dark'
            ? 'primary.main'
            : 'primary.dark',
          fontWeight: 600,
        }}
      >
        Nature Sounds
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {Object.entries(NATURE_SOUNDS).map(([type, sound]) => (
          <NatureSound
            key={type}
            type={type}
            sound={sound}
            onVolumeChange={handleVolumeChange}
          />
        ))}
      </Box>
    </Paper>
  );
}

export default NatureSounds; 