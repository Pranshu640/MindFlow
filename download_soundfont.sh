#!/bin/bash

# Create directories
mkdir -p /tmp/soundfonts

# Download a specific version of the soundfont
curl -L -o /tmp/soundfonts/default.sf2 "https://gleitz.github.io/midi-js-soundfonts/MusyngKite/acoustic_grand_piano-mp3.sf2"

# Verify the download
if [ -f "/tmp/soundfonts/default.sf2" ]; then
    echo "Soundfont downloaded successfully"
    ls -l /tmp/soundfonts/default.sf2
else
    echo "Failed to download soundfont"
fi
