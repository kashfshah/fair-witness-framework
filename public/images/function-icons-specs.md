# Function-Epistemic Framework Icon Specifications

This document outlines the design specifications for the visual representation of each epistemic function in the Fair Witness Bot framework.

## Core Design Principles

All function icons adhere to these principles:
- Minimalist, geometric designs that convey function purpose
- Consistent stroke weight and visual language
- Color-coding that aids recognition while maintaining accessibility
- Scalable SVG format for optimal display at any size
- Meaningful visual metaphors that represent each function's purpose

## Epistemic Function Icons

| Function | Primary Color | Visual Metaphor | Key Characteristics |
|----------|---------------|-----------------|---------------------|
| Observer | Teal (#27a594) | Eye/Magnifying Glass | - Simple circular form<br>- Objective stance<br>- Focus on clear vision<br>- No interpretive elements |
| Evaluator | Blue (#3182ce) | Balance/Scale | - Horizontal balance indicator<br>- Assessment metaphor<br>- Comparison structure<br>- Measurement concept |
| Analyst | Amber (#ff9d00) | Connection/Pattern | - Connecting nodes<br>- Pattern recognition<br>- Relationship mapping<br>- Discovery visual |
| Synthesist | Purple (#805ad5) | Integration/Assembly | - Converging elements<br>- Unified structure<br>- Building blocks<br>- Cohesive arrangement |
| Communicator | Green (#38a169) | Transmission/Speech | - Directional flow<br>- Clear output<br>- Message indicator<br>- Audience focus |

## Technical Specifications

Each function icon requires:
- Base SVG format with viewBox="0 0 24 24"
- Optimized vector paths using minimal points
- Consistent 2px stroke for main elements
- 1.5px stroke for secondary elements
- 24×24px artboard with proper padding
- Responsive scaling with preserved aspect ratio

## Implementation Variations

Each icon requires these variations:
1. **Outline Version**
   - Stroke-only rendering
   - Function-specific color
   - Transparent background
   - Used for deselected/inactive states

2. **Filled Version**
   - Primary color fill
   - White/light stroke outline
   - Used for selected/active states

3. **Monochrome Version**
   - Single-color implementation (black or white)
   - Used for high-contrast situations and printing

## File Naming Convention

Files follow this naming convention:
```
function-[name]-[variant].svg
```

Examples:
- `function-observer-outline.svg`
- `function-analyst-filled.svg`
- `function-synthesist-mono.svg`

## Implementation Context

These icons appear in:
1. Framework documentation to represent each function
2. Configuration builder to select functions
3. Example headers to indicate active functions
4. Navigation elements between function-specific content

## Accessibility Considerations

Icon designs ensure:
- Functions remain identifiable by shape alone (not just color)
- Sufficient contrast ratios with backgrounds
- Meaningful accessible names in implementation
- Recognition at small display sizes (minimum 16×16px)
