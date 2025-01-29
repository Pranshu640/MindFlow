import { Box, keyframes } from '@mui/material';
import { useEffect, useState } from 'react';

const breathe = (scale) => keyframes`
  0% { transform: scaleY(1); opacity: 0.7; }
  50% { transform: scaleY(${scale}); opacity: 1; }
  100% { transform: scaleY(1); opacity: 0.7; }
`;

const rgbShift = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

const moveGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function BreathingSegment({ index, total, isDark }) {
  const [breathingDuration, setBreathingDuration] = useState(2 + Math.random() * 1.5);
  const segmentWidth = 100 / total; // Width percentage for each segment
  const gradientColors = [
    '#ff0000', '#ff8a00', '#ffe100', '#14ff00', '#00fff5', '#0500ff', '#c800ff'
  ];
  
  // Calculate gradient colors for this segment
  const startColor = gradientColors[index % gradientColors.length];
  const endColor = gradientColors[(index + 1) % gradientColors.length];

  useEffect(() => {
    const updateDuration = () => {
      const newDuration = 2 + Math.random() * 1.5;
      setBreathingDuration(newDuration);
    };

    const interval = setInterval(updateDuration, breathingDuration * 1000);
    return () => clearInterval(interval);
  }, [breathingDuration]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: `${index * segmentWidth}%`,
        width: `${segmentWidth}%`,
        height: '2rem',
        transform: 'translateY(-50%)',
        background: `linear-gradient(90deg, ${startColor}, ${endColor})`,
        animation: `${breathe(1.5 + Math.random() * 0.5)} ${breathingDuration}s ease-in-out infinite`,
        filter: 'blur(4rem)',
        boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
        transformOrigin: 'center',
        opacity: isDark ? 0.8 : 0.4,
      }}
    />
  );
}

function BreathingBackground({ isDark }) {
  const numberOfSegments = 7; // Number of rainbow segments

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        background: isDark ? '#000000' : '#ffffff',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease',
      }}
    >
      {[...Array(numberOfSegments)].map((_, index) => (
        <BreathingSegment 
          key={index} 
          index={index} 
          total={numberOfSegments}
          isDark={isDark}
        />
      ))}
    </Box>
  );
}

export default BreathingBackground; 