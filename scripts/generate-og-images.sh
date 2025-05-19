#!/bin/bash
#!/bin/bash
#
# Fair Witness Bot Framework
# Copyright (c) 2025 Fair Witness Bot
#
# This work is licensed under a Creative Commons Attribution-ShareAlike 4.0
# International License (CC BY-SA 4.0).
# https://creativecommons.org/licenses/by-sa/4.0/

# Open Graph Image Generation Script for Fair Witness Bot
# Creates page-specific OG images from SVG templates

# Required packages:
# - Inkscape or librsvg (rsvg-convert)
# - ImageMagick (convert)
# - jpegoptim

# Ensure script runs from project root
cd "$(dirname "$0")/.." || exit

echo "Generating Open Graph images for Fair Witness Bot..."

# Create directory if not exists
mkdir -p public/images/og

# Base SVG templates
OG_TEMPLATE="public/images/fair-witness-og.svg"
PAGES=("home" "framework" "implementation" "examples" "quickstart" "about")
TITLES=("Function-Epistemic Hybrid Framework" "Framework Documentation" "Implementation Guide" "Framework Examples" "Quick Start Guide" "About Fair Witness")
SUBTITLES=("Structure Your AI Interactions with Objective Analysis" "Understanding the Five Epistemic Functions" "Practical Implementation Across Platforms" "See the Framework in Action" "Get Started in Minutes" "The Science Fiction Origins")

# Generate OG images for each page
echo "Converting SVG templates to page-specific JPGs..."

for i in "${!PAGES[@]}"; do
  PAGE="${PAGES[$i]}"
  TITLE="${TITLES[$i]}"
  SUBTITLE="${SUBTITLES[$i]}"
  
  echo "Creating OG image for: $PAGE"
  
  # Create a temporary SVG with page-specific text
  cp "$OG_TEMPLATE" "temp-og.svg"
  
  # Replace title and subtitle in the SVG
  # Note: In a real implementation, you would use proper XML/SVG manipulation
  # This simple sed approach works for demonstration purposes only
  sed -i "s/>Function-Epistemic</>$TITLE</" "temp-og.svg"
  sed -i "s/>Hybrid Framework</>$SUBTITLE</" "temp-og.svg"
  
  # Convert to JPG
  rsvg-convert -w 1200 -h 630 "temp-og.svg" -o "public/images/og/$PAGE-og.jpg"
  
  # Remove temporary file
  rm "temp-og.svg"
done

# Generate default OG image
rsvg-convert -w 1200 -h 630 "$OG_TEMPLATE" -o "public/images/fair-witness-og.jpg"

# Optimize all JPGs
echo "Optimizing JPG files..."
find public/images/og -name "*.jpg" -exec jpegoptim --strip-all --max=85 {} \;
jpegoptim --strip-all --max=85 "public/images/fair-witness-og.jpg"

echo "Open Graph image generation complete!"
echo "Created OG images for:"
for PAGE in "${PAGES[@]}"; do
  echo "- $PAGE-og.jpg"
done
echo "- fair-witness-og.jpg (default)"
