from flask import Flask, render_template, request, send_file, jsonify
from transformers import AutoProcessor, MusicgenForConditionalGeneration
import torch
import torchaudio
import soundfile as sf
import io
import logging
import numpy as np
import wave
import pretty_midi
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={
    r"/generate": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "methods": ["POST"],
        "allow_headers": ["Content-Type"]
    }
})

# Load model once at startup with specific configuration
logger.info("Loading model...")
processor = AutoProcessor.from_pretrained(
    "facebook/musicgen-small",
    attn_implementation="eager"  # This should silence the warning
)
model = MusicgenForConditionalGeneration.from_pretrained(
    "facebook/musicgen-small",
    attn_implementation="eager"
)
logger.info("Model loaded successfully")

def create_audio_from_notes(notes_list):
    """Helper function to create audio from a list of (frequency, duration) pairs"""
    from synthesizer import Player, Synthesizer, Waveform
    
    # Create synthesizer
    synthesizer = Synthesizer(
        osc1_waveform=Waveform.sine,
        osc1_volume=1.0,
        use_osc2=False
    )
    
    # Create audio data
    sample_rate = 44100
    audio_data = []
    
    # Generate audio for each note
    for freq, duration in notes_list:
        # Generate samples for this note
        num_samples = int(duration * sample_rate)
        samples = synthesizer.generate_constant_frequency(
            freq,
            num_samples
        )
        audio_data.extend(samples)
    
    # Normalize audio
    audio_data = np.array(audio_data)
    audio_data = audio_data / np.max(np.abs(audio_data))
    audio_data = (audio_data * 32767).astype(np.int16)
    
    # Save as WAV
    buffer = io.BytesIO()
    with wave.open(buffer, 'wb') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(audio_data.tobytes())
    
    return buffer.getvalue()

def create_fallback_melody():
    """Create a simple fallback melody when the model fails"""
    
    # Create a simple melody
    notes = [
        ('C4', 0.5), ('E4', 0.5), ('G4', 0.5), ('C5', 1.0),
        ('G4', 0.5), ('E4', 0.5), ('C4', 1.0)
    ]
    
    # Convert note names to frequencies
    freq_duration_pairs = [
        (pretty_midi.note_name_to_hz(pretty_midi.note_name_to_number(note)), duration)
        for note, duration in notes
    ]
    
    return create_audio_from_notes(freq_duration_pairs)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    try:
        logger.info("Received generate request")
        data = request.get_json()
        logger.info(f"Request data: {data}")
        prompt = data.get('prompt', '')
        duration = data.get('duration', 30)

        logger.info(f"Received request - Prompt: {prompt}, Duration: {duration}")
        
        try:
            # Process with model...
            inputs = processor(
                text=[prompt],
                padding=True,
                return_tensors="pt",
            )
            
            logger.info("Processing with model...")
            audio_values = model.generate(**inputs, max_new_tokens=512)
            logger.info("Generation complete")
            
            # Convert to numpy array
            audio_data = audio_values.cpu().numpy().squeeze()
        except Exception as model_error:
            logger.error(f"Model error: {str(model_error)}")
            return jsonify({
                'error': 'Failed to generate audio with the model. Please try again.'
            }), 500
        
        try:
            # Create in-memory buffer
            buffer = io.BytesIO()
            
            # Save audio to buffer using soundfile
            sf.write(buffer, audio_data, 32000, format='wav')
            buffer.seek(0)
        except Exception as audio_error:
            logger.error(f"Audio processing error: {str(audio_error)}")
            return jsonify({
                'error': 'Failed to process the generated audio. Please try again.'
            }), 500
        
        logger.info("Sending response")
        response = send_file(
            buffer,
            mimetype='audio/wav',
            as_attachment=True,
            download_name='generated_music.wav'
        )
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except Exception as e:
        logger.error(f"Error during generation: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 