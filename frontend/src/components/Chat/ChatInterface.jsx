import { useState, useRef, useEffect, useContext } from 'react';
import { Box, Paper, TextField, Button, Typography, Avatar, CircularProgress } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// Comprehensive response system
const RESPONSES = {
  // Mental Health Related
  anxiety: {
    keywords: ['anxiety', 'anxious', 'worried', 'panic', 'stress', 'stressed'],
    responses: [
      "I understand you're feeling anxious. Our Anxiety Relief mode uses calming 396Hz frequencies combined with gentle ocean waves. Would you like to try that?",
      "For anxiety relief, I recommend our special combination of slow tempo music (60 BPM) with soft rain sounds. This can help regulate your breathing.",
      "Let's try our anxiety-relief preset with binaural beats and nature sounds. Many users find it helpful during anxious moments."
    ]
  },
  depression: {
    keywords: ['sad', 'depressed', 'depression', 'down', 'unhappy', 'lonely'],
    responses: [
      "I hear you. Our Mood Lifter preset uses uplifting frequencies and bright, gentle melodies to help elevate your mood.",
      "Music can be a powerful tool when you're feeling down. Try our special composition with 432Hz tuning - it's known for its mood-enhancing properties.",
      "Let's explore our positive energy soundscape with bird songs and uplifting melodies. It's designed to gently lift your spirits."
    ]
  },
  sleep: {
    keywords: ['sleep', 'insomnia', 'cant sleep', "can't sleep", 'tired', 'rest'],
    responses: [
      "Our Sleep Mode uses delta waves (0.5-4Hz) combined with ultra-soft ambient sounds to help you drift off naturally.",
      "I recommend our sleep-inducing combination of gentle rain sounds and very slow tempo melodies (50 BPM) for better rest.",
      "Try our Deep Sleep preset with binaural beats and soft wind chimes - it's designed to help you fall asleep faster."
    ]
  },
  meditation: {
    keywords: ['meditate', 'meditation', 'mindfulness', 'peace', 'calm', 'relax'],
    responses: [
      "For meditation, I suggest our special preset with 432Hz tuning and subtle Tibetan singing bowls.",
      "Our Meditation mode combines alpha waves (8-12Hz) with gentle water sounds to help you achieve deeper mindfulness.",
      "Let's try our meditation soundscape with soft wind sounds and occasional wind chimes for a peaceful session."
    ]
  },
  focus: {
    keywords: ['focus', 'concentrate', 'study', 'work', 'attention', 'productivity'],
    responses: [
      "Our Focus mode uses beta waves (15-20Hz) and minimal nature sounds to help you maintain concentration.",
      "Try our productivity-enhancing preset with 40Hz gamma waves - it's great for deep focus and mental clarity.",
      "I recommend our focus-boosting combination of light rain sounds and subtle background harmonies."
    ]
  },

  // Feature Inquiries
  features: {
    keywords: ['feature', 'offer', 'provide', 'help', 'what can you do', 'how does this work'],
    responses: [
      "MindFlow offers several specialized features: 1) Mood-based music generation 2) Nature sound therapy 3) Binaural beats 4) Customizable ambient sounds. What interests you?",
      "I can help you with: Anxiety relief, Depression support, Sleep improvement, Meditation guidance, and Focus enhancement. What would you like to explore?",
      "Our main features include personalized music therapy, nature sounds, and frequency-based healing. Would you like to know more about any of these?"
    ]
  },

  // Greeting and Default
  greeting: {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'start'],
    responses: [
      "Hello! I'm MindFlow's assistant. I can help you find the perfect sound therapy for your current needs. How are you feeling?",
      "Welcome to MindFlow! I'm here to help you with music therapy and emotional support. What brings you here today?",
      "Hi! I'm your personal music therapy assistant. Would you like to explore our mood-based music or discuss how you're feeling?"
    ]
  }
};

// Default response when no keywords match
const DEFAULT_RESPONSES = [
  "I'm here to help with music therapy and emotional support. Could you tell me more about what you're looking for?",
  "I can assist you with anxiety, sleep, focus, meditation, or mood enhancement through music. What would you like to explore?",
  "Whether you're looking to relax, focus, or feel better, I can help find the perfect sound therapy. What's on your mind?"
];

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (message) => {
    const lowercaseMessage = message.toLowerCase();
    
    // Check each category for keyword matches
    for (const category of Object.values(RESPONSES)) {
      if (category.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        return category.responses[Math.floor(Math.random() * category.responses.length)];
      }
    }
    
    // Return random default response if no matches
    return DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate network delay for more natural feeling
    setTimeout(() => {
      const botMessage = {
        text: getResponse(input),
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: '80vh',
        maxWidth: 800,
        mx: 'auto',
        mt: 2,
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme => theme.palette.mode === 'dark'
            ? 'rgba(0, 0, 0, 0.7)'
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: 'inherit',
          zIndex: -1,
        },
        background: theme.palette.mode === 'dark'
          ? 'transparent'
          : 'transparent',
        backdropFilter: 'blur(10px)',
        border: theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.2)'
          : '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 32px rgba(0, 0, 0, 0.3)'
          : '0 8px 32px rgba(31, 38, 135, 0.15)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 38px rgba(0, 0, 0, 0.4)'
            : '0 8px 38px rgba(31, 38, 135, 0.2)',
        },
      }}
    >
      {/* Chat Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(45deg, rgba(41, 41, 41, 0.6), rgba(51, 51, 51, 0.6))'
          : 'linear-gradient(45deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))',
      }}>
        <Typography 
          variant="h6"
          sx={{
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #7C3AED, #2DD4BF)'
              : 'linear-gradient(45deg, #F472B6, #FB923C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}
        >
          MindFlow Chat Assistant
        </Typography>
      </Box>

      {/* Messages Area with updated styling */}
      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.mode === 'dark'
            ? 'rgba(0, 0, 0, 0.2)'
            : 'rgba(0, 0, 0, 0.2)',
          borderRadius: '4px',
        },
      }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              gap: 1,
            }}
          >
            {message.sender === 'bot' && (
              <Avatar
                sx={{
                  bgcolor: theme.palette.mode === 'dark'
                    ? '#7C3AED'
                    : '#F472B6',
                }}
              >
                AI
              </Avatar>
            )}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                maxWidth: '70%',
                borderRadius: 2,
                background: message.sender === 'user'
                  ? theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, rgba(124, 58, 237, 0.8), rgba(45, 212, 191, 0.8))'
                    : 'linear-gradient(45deg, rgba(244, 114, 182, 0.8), rgba(251, 146, 60, 0.8))'
                  : theme.palette.mode === 'dark'
                    ? 'rgba(41, 41, 41, 0.6)'
                    : 'rgba(255, 255, 255, 0.7)',
                color: message.sender === 'user' ? 'white' : 'inherit',
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
            </Paper>
            {message.sender === 'user' && (
              <Avatar
                sx={{
                  bgcolor: theme.palette.mode === 'dark'
                    ? '#2DD4BF'
                    : '#FB923C',
                }}
              >U</Avatar>
            )}
          </Box>
        ))}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
            <Avatar
              sx={{
                bgcolor: theme.palette.mode === 'dark'
                  ? 'primary.main'
                  : 'primary.light',
              }}
            >
              AI
            </Avatar>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(0, 0, 0, 0.4)'
                  : 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <CircularProgress size={20} />
            </Paper>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area with updated styling */}
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(45deg, rgba(138, 43, 226, 0.1), rgba(0, 255, 255, 0.1))'
          : 'linear-gradient(45deg, rgba(255, 107, 107, 0.1), rgba(255, 217, 61, 0.1))',
        display: 'flex',
        gap: 1,
      }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(0, 0, 0, 0.2)'
                : 'rgba(255, 255, 255, 0.7)',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          sx={{
            minWidth: 100,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, rgba(138, 43, 226, 0.8), rgba(0, 255, 255, 0.8))'
              : 'linear-gradient(45deg, rgba(255, 107, 107, 0.8), rgba(255, 217, 61, 0.8))',
            '&:hover': {
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, rgba(138, 43, 226, 1), rgba(0, 255, 255, 1))'
                : 'linear-gradient(45deg, rgba(255, 107, 107, 1), rgba(255, 217, 61, 1))',
            }
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
        </Button>
      </Box>
    </Paper>
  );
}

export default ChatInterface; 