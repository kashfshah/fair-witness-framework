#!/bin/bash
#!/bin/bash
#
# Fair Witness Bot Framework
# Copyright (c) 2025 Fair Witness Bot
#
# This work is licensed under a Creative Commons Attribution-ShareAlike 4.0
# International License (CC BY-SA 4.0).
# https://creativecommons.org/licenses/by-sa/4.0/

# Favicon Generation Script for Fair Witness Bot
# Converts the base SVG favicon to various required PNG sizes

# Required packages:
# - Inkscape or librsvg (rsvg-convert)
# - ImageMagick (convert)
# - optipng

# Ensure script runs from project root
cd "$(dirname "$0")/.." || exit

echo "Generating favicon assets for Fair Witness Bot..."

# Create directory if not exists
mkdir -p public/images/favicons

# Base SVG path
SVG_SOURCE="public/favicon.svg"

# Generate PNGs from SVG using rsvg-convert
echo "Converting SVG to PNGs..."

# Favicons for various devices
rsvg-convert -w 16 -h 16 "$SVG_SOURCE" -o "public/favicon-16x16.png"
rsvg-convert -w 32 -h 32 "$SVG_SOURCE" -o "public/favicon-32x32.png"
rsvg-convert -w 180 -h 180 "$SVG_SOURCE" -o "public/apple-touch-icon.png"
rsvg-convert -w 192 -h 192 "$SVG_SOURCE" -o "public/android-chrome-192x192.png"
rsvg-convert -w 512 -h 512 "$SVG_SOURCE" -o "public/android-chrome-512x512.png"

# Generate ICO file (combines 16x16 and 32x32)
echo "Creating ICO file..."
convert "public/favicon-16x16.png" "public/favicon-32x32.png" "public/favicon.ico"

# Optimize all PNGs
echo "Optimizing PNG files..."
find public -name "*.png" -exec optipng -quiet -strip all {} \;

echo "Favicon generation complete!"
echo "Created:"
echo "- favicon-16x16.png"
echo "- favicon-32x32.png"
echo "- apple-touch-icon.png"
echo "- android-chrome-192x192.png"
echo "- android-chrome-512x512.png"
echo "- favicon.ico"
