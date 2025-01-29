from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")

# Response system
RESPONSES = {
    "focus": [
        "For better focus, I recommend trying our Focus mode with 40Hz binaural beats.",
        "Our Focus mode combines gentle rhythms with clear textures to help maintain concentration."
    ],
    "relaxation": [
        "Our Relaxation mode uses warm pad sounds and gentle waves to help you unwind.",
        "For relaxation, I suggest combining our calming melodies with rain sounds."
    ],
    "sleep": [
        "Our Sleep mode uses delta wave frequencies (0.5-4Hz) and extremely soft dynamics.",
        "For better sleep, try our Sleep preset combined with gentle wind sounds."
    ],
    "meditation": [
        "Our Meditation mode includes subtle singing bowls and 432Hz tuning.",
        "For meditation, try combining our ambient sounds with wind chimes."
    ],
    "anxiety": [
        "To help with anxiety, our system generates calming music at 60 BPM.",
        "Try our Anxiety Relief mode with soft ocean waves and 396Hz frequency."
    ]
}

def get_response(message):
    message = message.lower()
    for category, responses in RESPONSES.items():
        if category in message:
            return responses[0]
    return "I can help you with music for focus, relaxation, sleep, meditation, or anxiety relief. What would you like to explore?"

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('message')
def handle_message(data):
    try:
        user_message = data.get('message', '')
        response = get_response(user_message)
        emit('response', {'response': response})
    except Exception as e:
        emit('error', {'error': str(e)})

if __name__ == '__main__':
    socketio.run(app, debug=True) 