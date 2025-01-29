import { Box, Paper, Typography, Slider, Select, MenuItem } from '@mui/material';

const SliderWithLabel = ({ label, value, onChange, min = 0, max = 100, step = 1 }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography 
        variant="body2" 
        sx={{ 
          color: theme => theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.7)'
            : 'rgba(0, 0, 0, 0.7)',
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <Slider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        sx={{
          '& .MuiSlider-thumb': {
            background: theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #8a2be2, #00ffff)'
              : 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
            boxShadow: theme => theme.palette.mode === 'dark'
              ? '0 0 8px rgba(138, 43, 226, 0.5)'
              : '0 0 4px rgba(255, 107, 107, 0.3)',
          },
          '& .MuiSlider-track': {
            background: theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #8a2be2, #00ffff)'
              : 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
          },
          '& .MuiSlider-rail': {
            background: theme => theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(0, 0, 0, 0.1)',
          }
        }}
      />
    </Box>
  );
};

function MusicControls({ settings, onSettingsChange }) {
  const handleElementChange = (element, property, value) => {
    onSettingsChange({
      ...settings,
      elements: {
        ...settings.elements,
        [element]: {
          ...settings.elements[element],
          [property]: value,
        },
      },
    });
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, overflow: 'auto' }}>
      {/* Synth Controls */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          background: theme => theme.palette.mode === 'dark' 
            ? 'rgba(138, 43, 226, 0.05)'
            : 'rgba(255, 107, 107, 0.05)',
          borderColor: theme => theme.palette.mode === 'dark'
            ? 'rgba(138, 43, 226, 0.2)'
            : 'rgba(255, 107, 107, 0.3)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
          boxShadow: theme => theme.palette.mode === 'dark'
            ? 'none'
            : '0 4px 12px rgba(0, 0, 0, 0.05)',
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
          Synth
        </Typography>
        <SliderWithLabel
          label="Level"
          value={settings.elements.synth.level}
          onChange={(_, value) => handleElementChange('synth', 'level', value)}
        />
        <Select
          fullWidth
          size="small"
          value={settings.elements.synth.type}
          onChange={(e) => handleElementChange('synth', 'type', e.target.value)}
          sx={{ 
            mb: 2,
            backgroundColor: theme => theme.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.2)'
              : 'rgba(255, 255, 255, 0.9)',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme => theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.1)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme => theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.3)'
                : 'rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <MenuItem value="warm">Warm</MenuItem>
          <MenuItem value="digital">Digital</MenuItem>
          <MenuItem value="atmospheric">Atmospheric</MenuItem>
        </Select>
      </Paper>

      {/* Beats Controls */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          background: theme => theme.palette.mode === 'dark' 
            ? 'rgba(0, 255, 255, 0.05)'
            : 'rgba(255, 255, 255, 0.9)',
          borderColor: theme => theme.palette.mode === 'dark'
            ? 'rgba(0, 255, 255, 0.2)'
            : 'rgba(0, 183, 199, 0.3)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
          boxShadow: theme => theme.palette.mode === 'dark'
            ? 'none'
            : '0 4px 12px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Typography 
          variant="subtitle1" 
          gutterBottom 
          sx={{ 
            color: theme => theme.palette.mode === 'dark'
              ? 'secondary.main'
              : 'secondary.dark',
            fontWeight: 600,
          }}
        >
          Beats
        </Typography>
        <SliderWithLabel
          label="Level"
          value={settings.elements.beats.level}
          onChange={(_, value) => handleElementChange('beats', 'level', value)}
        />
        <Select
          fullWidth
          size="small"
          value={settings.elements.beats.type}
          onChange={(e) => handleElementChange('beats', 'type', e.target.value)}
          sx={{ 
            mb: 2,
            backgroundColor: theme => theme.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.2)'
              : 'rgba(255, 255, 255, 0.9)',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme => theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.1)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme => theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.3)'
                : 'rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <MenuItem value="lofi">Lo-Fi</MenuItem>
          <MenuItem value="ambient">Ambient</MenuItem>
          <MenuItem value="none">None</MenuItem>
        </Select>
      </Paper>

      {/* Binaural Controls */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          background: 'rgba(138, 43, 226, 0.05)',
          borderColor: 'rgba(138, 43, 226, 0.2)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ color: 'primary.main' }}>
          Binaural Beats
        </Typography>
        <SliderWithLabel
          label="Level"
          value={settings.elements.binauralFrequency.level}
          onChange={(_, value) => handleElementChange('binauralFrequency', 'level', value)}
        />
        <Select
          fullWidth
          size="small"
          value={settings.elements.binauralFrequency.frequency}
          onChange={(e) => handleElementChange('binauralFrequency', 'frequency', e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value={432}>432 Hz (Relaxation)</MenuItem>
          <MenuItem value={528}>528 Hz (Healing)</MenuItem>
          <MenuItem value={639}>639 Hz (Connection)</MenuItem>
        </Select>
      </Paper>

      {/* Atmosphere Controls */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          background: 'rgba(0, 255, 255, 0.05)',
          borderColor: 'rgba(0, 255, 255, 0.2)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ color: 'secondary.main' }}>
          Atmosphere
        </Typography>
        <SliderWithLabel
          label="Level"
          value={settings.elements.atmosphere.level}
          onChange={(_, value) => handleElementChange('atmosphere', 'level', value)}
        />
        <Select
          fullWidth
          size="small"
          value={settings.elements.atmosphere.type}
          onChange={(e) => handleElementChange('atmosphere', 'type', e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="rain">Rain</MenuItem>
          <MenuItem value="waves">Ocean Waves</MenuItem>
          <MenuItem value="forest">Forest</MenuItem>
        </Select>
      </Paper>

      {/* Melody Controls */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          background: 'rgba(138, 43, 226, 0.05)',
          borderColor: 'rgba(138, 43, 226, 0.2)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ color: 'primary.main' }}>
          Melody
        </Typography>
        <SliderWithLabel
          label="Level"
          value={settings.elements.melody.level}
          onChange={(_, value) => handleElementChange('melody', 'level', value)}
        />
        <SliderWithLabel
          label="Complexity"
          value={settings.elements.melody.complexity}
          onChange={(_, value) => handleElementChange('melody', 'complexity', value)}
        />
      </Paper>

      {/* Duration Control */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          background: 'rgba(0, 255, 255, 0.05)',
          borderColor: 'rgba(0, 255, 255, 0.2)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ color: 'secondary.main' }}>
          Duration
        </Typography>
        <SliderWithLabel
          label="Seconds"
          value={settings.duration}
          onChange={(_, value) => onSettingsChange({ ...settings, duration: value })}
          min={5}
          max={60}
          step={5}
        />
      </Paper>
    </Box>
  );
}

export default MusicControls; 