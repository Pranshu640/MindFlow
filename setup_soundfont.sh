#!/bin/bash

# Create directory
mkdir -p /tmp/soundfonts

# Download using curl
echo "Downloading soundfont..."
curl -L -o /tmp/soundfonts/default.sf2 "https://archive.org/download/fluid-soundfont/fluid-soundfont_gm.sf2"

# Check if file exists
if [ -f "/tmp/soundfonts/default.sf2" ]; then
    echo "Soundfont downloaded successfully"
    ls -lh /tmp/soundfonts/default.sf2
else
    echo "Failed to download soundfont"
    exit 1
fi
