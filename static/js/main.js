document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const promptInput = document.getElementById('prompt');
    const loading = document.getElementById('loading');
    const player = document.getElementById('player');
    const audioPlayer = document.getElementById('audioPlayer');
    const errorDiv = document.getElementById('error');

    if (!window.AudioContext && !window.webkitAudioContext) {
        showError('Your browser does not support the Web Audio API. Please use a modern browser.');
        generateBtn.disabled = true;
    }

    generateBtn.addEventListener('click', async function() {
        const prompt = promptInput.value.trim();
        
        if (!prompt) {
            showError('Please enter a prompt first.');
            return;
        }

        // Show loading, hide player and error
        loading.classList.remove('hidden');
        player.classList.add('hidden');
        errorDiv.classList.add('hidden');
        generateBtn.disabled = true;

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt })
            });

            const data = await response.json();

            if (data.status === 'success' && data.music) {
                audioPlayer.src = data.music;
                player.classList.remove('hidden');
            } else {
                showError(data.message || 'Failed to generate music');
                console.error('Generation failed:', data);
            }
        } catch (error) {
            showError('An error occurred while generating music');
            console.error('Error:', error);
        } finally {
            loading.classList.add('hidden');
            generateBtn.disabled = false;
        }
    });

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }
});

async function generateMusic() {
    const prompt = document.getElementById('prompt').value;
    const generateBtn = document.getElementById('generateBtn');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const audioPlayer = document.getElementById('audio-player');

    if (!prompt) {
        error.textContent = 'Please enter a prompt';
        return;
    }

    // Show loading, disable button
    loading.style.display = 'block';
    generateBtn.disabled = true;
    error.textContent = '';
    audioPlayer.style.display = 'none';

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            audioPlayer.src = data.music;
            audioPlayer.style.display = 'block';
        } else {
            error.textContent = data.message || 'Failed to generate music';
        }
    } catch (err) {
        error.textContent = 'Error: ' + err.message;
    } finally {
        // Hide loading, enable button
        loading.style.display = 'none';
        generateBtn.disabled = false;
    }
} 