# Fair Witness Bot Favicon Specifications

This document provides the specifications for the Fair Witness Bot favicon set, following best practices for multi-platform support.

## Design Concept

The Fair Witness Bot favicon represents:
- A stylized "FW" monogram
- Color scheme: Deep blue (#1a3c5b) background with amber (#ff9d00) foreground
- Minimalist, geometric design reflecting objective observation principles
- Clear recognition at small sizes

## Required Favicon Files

The following files comprise a complete favicon set:

| Filename | Size | Format | Purpose |
|----------|------|--------|---------|
| favicon.svg | Scalable | SVG | Primary favicon for modern browsers |
| favicon.ico | 16x16, 32x32 (ICO) | ICO | Legacy browser support |
| favicon-16x16.png | 16x16 | PNG | Explicit small favicon |
| favicon-32x32.png | 32x32 | PNG | Explicit medium favicon |
| apple-touch-icon.png | 180x180 | PNG | iOS home screen icon |
| android-chrome-192x192.png | 192x192 | PNG | Android icon |
| android-chrome-512x512.png | 512x512 | PNG | Android splash screen |

## Implementation Notes

1. The existing `favicon.svg` file uses a vector format for optimal scaling
2. PNG files maintain crisp edges with the following specifications:
   - sRGB color space
   - 8-bit color depth
   - Transparency where appropriate
   - Optimized for web delivery

3. Implementation requirements:
   - All icons derive from the same base design
   - Smaller sizes use simplified versions where needed for legibility
   - Color palette remains consistent across all sizes

## References for Production

When producing these files:
1. Use the color scheme specified in the project's tailwind.config.js
2. Maintain appropriate padding (approximately 10% of width) around the icon
3. Test favicon display across multiple browsers and devices
4. Optimize all PNG files for web delivery
