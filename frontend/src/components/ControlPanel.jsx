import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormGroup,
  Slider,
  Typography,
  CircularProgress,
} from '@mui/material';
import CustomCheckbox from './CustomCheckbox';

function ControlPanel({ onGenerate, isLoading }) {
  const [settings, setSettings] = useState({
    prompt: '',
    genre: {
      lofi: false,
      ambient: false,
      meditation: false,
      nature: false,
    },
    mood: {
      calm: false,
      focus: false,
      sleep: false,
      relax: false,
    },
    duration: 30,
    includeInstruments: {
      piano: true,
      synth: false,
      bells: false,
      whitenoise: false,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const promptParts = [];
    
    // Add user's custom prompt if provided
    if (settings.prompt.trim()) {
      promptParts.push(settings.prompt);
    }
    
    // Add genre to prompt
    const selectedGenres = Object.entries(settings.genre)
      .filter(([_, selected]) => selected)
      .map(([genre]) => genre);
    if (selectedGenres.length) {
      promptParts.push(`${selectedGenres.join(', ')} style music`);
    }
    
    // Add mood to prompt
    const selectedMoods = Object.entries(settings.mood)
      .filter(([_, selected]) => selected)
      .map(([mood]) => mood);
    if (selectedMoods.length) {
      promptParts.push(`for ${selectedMoods.join(' and ')} purposes`);
    }
    
    // Add instruments to prompt
    const selectedInstruments = Object.entries(settings.includeInstruments)
      .filter(([_, selected]) => selected)
      .map(([instrument]) => instrument);
    if (selectedInstruments.length) {
      promptParts.push(`with ${selectedInstruments.join(', ')}`);
    }

    // If no options selected, add a default prompt
    if (promptParts.length === 0) {
      promptParts.push('Create peaceful background music');
    }

    onGenerate({
      prompt: promptParts.join(' '),
      duration: settings.duration,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Describe your music (optional)"
        value={settings.prompt}
        onChange={(e) => setSettings({ ...settings, prompt: e.target.value })}
        sx={{ mb: 3 }}
      />

      <Typography gutterBottom>Style</Typography>
      <FormGroup row sx={{ mb: 3 }}>
        {Object.keys(settings.genre).map((genre) => (
          <CustomCheckbox
            key={genre}
            label={genre.charAt(0).toUpperCase() + genre.slice(1)}
            checked={settings.genre[genre]}
            onChange={(e) => setSettings({
              ...settings,
              genre: { ...settings.genre, [genre]: e.target.checked }
            })}
          />
        ))}
      </FormGroup>

      <Typography gutterBottom>Purpose</Typography>
      <FormGroup row sx={{ mb: 3 }}>
        {Object.keys(settings.mood).map((mood) => (
          <CustomCheckbox
            key={mood}
            label={mood.charAt(0).toUpperCase() + mood.slice(1)}
            checked={settings.mood[mood]}
            onChange={(e) => setSettings({
              ...settings,
              mood: { ...settings.mood, [mood]: e.target.checked }
            })}
          />
        ))}
      </FormGroup>

      <Typography gutterBottom>Sounds</Typography>
      <FormGroup row sx={{ mb: 3 }}>
        {Object.keys(settings.includeInstruments).map((instrument) => (
          <CustomCheckbox
            key={instrument}
            label={instrument.charAt(0).toUpperCase() + instrument.slice(1)}
            checked={settings.includeInstruments[instrument]}
            onChange={(e) => setSettings({
              ...settings,
              includeInstruments: {
                ...settings.includeInstruments,
                [instrument]: e.target.checked
              }
            })}
          />
        ))}
      </FormGroup>

      <Typography gutterBottom>Duration (seconds)</Typography>
      <Slider
        value={settings.duration}
        onChange={(_, value) => setSettings({ ...settings, duration: value })}
        min={5}
        max={60}
        step={5}
        marks
        valueLabelDisplay="auto"
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={isLoading}
        sx={{ height: 48 }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Generate Music'}
      </Button>
    </Box>
  );
}

export default ControlPanel; 