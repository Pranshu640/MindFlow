import { Container } from '@mui/material';
import ChatInterface from '../components/Chat/ChatInterface';
import BreathingBackground from '../components/BreathingBackground';

function Chat() {
  return (
    <>
      <BreathingBackground />
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <ChatInterface />
      </Container>
    </>
  );
}

export default Chat; 