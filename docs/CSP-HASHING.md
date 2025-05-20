# Hash-Based Content Security Policy Implementation

This document outlines the implementation of hash-based Content Security Policy (CSP) in the Fair Witness Framework. The approach eliminates the insecure 'unsafe-inline' directive while maintaining compatibility with static site architecture.

## Function-Epistemic Analysis

### Observer Function

The implementation employs these mechanisms:

1. Automated script and style extraction during build process
2. SHA-256 hash generation for each inline script and style
3. CSP header generation with precise hash-based allowlisting
4. Integration with Cloudflare Pages via _headers file
5. Component-based fallback for development environment

### Evaluator Function

This implementation provides these security benefits:

1. Eliminates the 'unsafe-inline' CSP directive vulnerability
2. Creates explicit allowlisting of approved scripts
3. Maintains full content compatibility with zero functionality changes
4. Adds build-time verification of script integrity
5. Improves Mozilla Observatory security score

### Analyst Function

The technical approach:

1. Leverages static site characteristics to implement hash-based security
2. Uses build-time automation to maintain development productivity
3. Integrates with existing build pipeline without manual intervention
4. Applies differential treatment based on content type
5. Provides development-to-production consistency

### Synthesist Function

The implementation combines perspectives from:

1. OWASP CSP best practices
2. Static site generation architecture
3. Automated build pipeline approaches
4. Cloudflare Pages deployment optimization
5. Developer experience considerations

### Communicator Function

## Implementation Details

### Build Process Integration

The hash-based CSP implementation works through build-time automation:

1. The standard build process produces HTML files with inline scripts and styles
2. The `generate-csp-hashes.js` script extracts this content
3. SHA-256 hashes replace 'unsafe-inline' in the CSP
4. The `update-headers.js` script modifies the _headers file
5. Deployment includes the enhanced security headers

### Component Architecture

The system maintains a layered security approach:

1. `SecurityHeaders.astro` provides a baseline CSP with fallback directives
2. Build scripts extract and process actual page content 
3. Generated _headers file applies platform-optimized security headers
4. Each build creates a unique hash signature for current content

## Technical Implementation Notes

1. Script hashes apply to entire script content, including whitespace
2. Style hashes apply to entire style element content
3. Changes to inline scripts or styles require a rebuild
4. The system maintains compatibility with direct `npm run build` commands
5. Deployment automatically incorporates latest content hashes

## Security Considerations

1. The `'unsafe-inline'` directive appears in source code as a development fallback 
2. Production deployments use stronger hash-based CSP through _headers
3. Script and style changes must process through the build pipeline
4. External resources remain restricted to specified origins
5. The implementation follows defense-in-depth principles
