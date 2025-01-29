import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import { getRandomImage } from '../assets/imagePool';

function SeamlessPlayer({ url }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const primaryAudioRef = useRef(null);
  const secondaryAudioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentImage] = useState(getRandomImage);

  useEffect(() => {
    // Create two audio elements for crossfading
    primaryAudioRef.current = new Audio(url);
    secondaryAudioRef.current = new Audio(url);

    // Set up the audio elements
    [primaryAudioRef.current, secondaryAudioRef.current].forEach(audio => {
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });

      // Crossfade setup
      audio.addEventListener('timeupdate', () => {
        const timeLeft = audio.duration - audio.currentTime;
        if (timeLeft < 0.5 && !audio.crossfading) {
          audio.crossfading = true;
          startCrossfade();
        }
        setCurrentTime(audio.currentTime);
      });
    });

    return () => {
      // Cleanup
      [primaryAudioRef.current, secondaryAudioRef.current].forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, [url]);

  const startCrossfade = () => {
    const current = primaryAudioRef.current.paused ? 
      secondaryAudioRef.current : primaryAudioRef.current;
    const next = primaryAudioRef.current.paused ? 
      primaryAudioRef.current : secondaryAudioRef.current;

    // Reset and start the next audio
    next.currentTime = 0;
    next.play();

    // Fade out current audio
    const fadeInterval = setInterval(() => {
      if (current.volume > 0.1) {
        current.volume -= 0.1;
        next.volume += 0.1;
      } else {
        current.pause();
        current.volume = 1;
        current.crossfading = false;
        clearInterval(fadeInterval);
      }
    }, 50);
  };

  const togglePlay = () => {
    if (isPlaying) {
      primaryAudioRef.current.pause();
      secondaryAudioRef.current.pause();
    } else {
      primaryAudioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          height: 200,
          mb: 2,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: theme => theme.palette.mode === 'dark'
            ? '0 0 20px rgba(138, 43, 226, 0.2)'
            : '0 0 20px rgba(255, 107, 107, 0.2)',
        }}
      >
        <Box
          component="img"
          src={currentImage}
          alt="Music Visualization"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            pointerEvents: 'none',
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <IconButton onClick={togglePlay}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <Slider
          value={currentTime}
          max={duration}
          onChange={(_, value) => {
            const audio = primaryAudioRef.current.paused ? 
              secondaryAudioRef.current : primaryAudioRef.current;
            audio.currentTime = value;
          }}
          sx={{ mx: 2 }}
        />
        <Typography variant="caption">
          {Math.floor(currentTime)}/{Math.floor(duration)}s
        </Typography>
      </Box>
    </Box>
  );
}

export default SeamlessPlayer; 