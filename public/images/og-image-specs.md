# Open Graph Image Specifications

This document outlines the requirements for the Fair Witness Bot Open Graph images that appear when content links on social media platforms.

## Core Design Elements

All Open Graph images maintain these elements:
- Primary color scheme: Deep blue (#1a3c5b) background with amber (#ff9d00) and teal (#27a594) accents
- Typography: Space Grotesk for headings, Inter for supporting text
- "Fair Witness Bot" branding in top-left corner
- Visual representation of Function-Epistemic Hybrid Framework
- E-Prime language in all text content

## Required OG Images

| Filename | Purpose | Dimensions | Primary Content |
|----------|---------|------------|----------------|
| og-home.jpg | Homepage | 1200×630px | "Structure Your AI Interactions with the Function-Epistemic Framework" |
| og-framework.jpg | Framework page | 1200×630px | Visual representation of the five epistemic functions |
| og-implementation.jpg | Implementation page | 1200×630px | Code snippet and implementation visualization |
| og-examples.jpg | Examples page | 1200×630px | Before/after comparison of framework application |
| og-quickstart.jpg | Quick Start page | 1200×630px | "Get Started with the Fair Witness Framework" |
| og-about.jpg | About page | 1200×630px | Heinlein reference and project background |

## Technical Specifications

All Open Graph images adhere to these specifications:
- Resolution: 1200×630 pixels (2:1 aspect ratio)
- Color profile: sRGB
- Format: JPEG (.jpg)
- Quality: 85% compression (balance of quality and file size)
- File size: <200KB per image
- Text placement: Critical text within central 1000×530px area

## Design Guidelines

1. **Clarity at Multiple Sizes**
   - Designs remain clear when displayed at:
     - Large: Twitter card (1200×630px)
     - Medium: Facebook feed (600×315px) 
     - Small: Mobile preview (300×157px)

2. **Content Hierarchy**
   - Primary headline: 32-40px Space Grotesk Bold
   - Secondary information: 18-24px Inter Regular
   - All text maintains sufficient contrast ratio (4.5:1 minimum)

3. **Visual Structure**
   - Left-aligned text for natural reading flow
   - Consistent padding (min 80px from edges)
   - Visual emphasis on epistemic functions
   - Background elements avoid competing with text

## Implementation Notes

1. Each Open Graph image corresponds to a specific page
2. The BaseLayout component automatically selects the appropriate image
3. Image paths follow the pattern: `/images/[page-name]-og.jpg`
4. Default image (`fair-witness-og.jpg`) serves as fallback
