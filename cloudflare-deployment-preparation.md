<!--
Fair Witness Bot Framework
Copyright (c) 2025 Fair Witness Bot

This work is licensed under a Creative Commons Attribution-ShareAlike 4.0
International License (CC BY-SA 4.0).
https://creativecommons.org/licenses/by-sa/4.0/
-->

# Cloudflare Deployment Preparation

## Observer Function: Deployment Components

The Fair Witness Bot deployment involves:

- GitHub repository at `kashfshah/fair-witness-framework`
- Cloudflare Pages for web hosting
- Astro.js static site generation
- Custom domain: fairwitness.bot
- Environment variables for API access
- Performance and security optimizations

## Evaluator Function: Preparation Assessment

| Component | Current Status | Required Preparation |
|-----------|----------------|----------------------|
| Repository | Established | Complete |
| Build Configuration | pages.toml created | Ready for upload |
| Node.js Version | 18 specified | Verified compatible |
| Environment Variables | Templates defined | Need actual values |
| Deployment Documentation | Created | Complete |
| Domain Configuration | Not connected | Need DNS setup |

## Analyst Function: Deployment Pattern

The deployment follows this sequence pattern:
1. GitHub repository connection
2. Build configuration setup
3. Environment variable definition
4. Domain connection and DNS configuration
5. Build trigger and verification
6. Post-deployment testing

## Synthesist Function: Integrated Deployment Approach

Multiple deployment considerations require integration:

**Technical Perspective**:
- The Astro static site generation requires specific build parameters
- Environment variables must securely store API keys
- The `dist` directory contains built assets

**Performance Perspective**:
- Cloudflare's CDN provides edge caching
- Security headers protect against common vulnerabilities
- Asset fingerprinting enables long-term caching

**Operational Perspective**:
- GitHub integration enables continuous deployment
- Build hooks facilitate automatic updates
- Preview deployments enable testing before production

## Communicator Function: Deployment Preparation Steps

### 1. Connect GitHub Repository to Cloudflare Pages

1. Log into Cloudflare dashboard (https://dash.cloudflare.com)
2. Navigate to "Pages" section
3. Click "Create a project" > "Connect to Git"
4. Select GitHub as the provider
5. Authenticate with GitHub if prompted
6. Select the `kashfshah/fair-witness-framework` repository
7. Click "Begin setup"

### 2. Configure Build Settings

1. In the "Set up build and deployments" section, configure:
   - Project name: `fair-witness-framework`
   - Production branch: `main`
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (project root)

2. Expand "Environment variables" and add:
   - `NODE_ENV`: `production`
   - `ASTRO_TELEMETRY_DISABLED`: `1`
   
   (Note: Add any API keys needed for specific features)

3. Click "Save and Deploy"

### 3. Domain Configuration

1. After initial deployment, go to the project's "Custom domains" section
2. Click "Set up a custom domain"
3. Enter `fairwitness.bot` as the domain
4. Select "Provision as a custom domain through Cloudflare"
5. Verify domain ownership if required
6. Adjust DNS settings:
   - Type: CNAME
   - Name: @ (root domain)
   - Target: The Cloudflare Pages domain (`fair-witness-framework.pages.dev`)
   - Proxy status: Proxied

### 4. Configure Additional Settings

1. Navigate to "Settings" > "Functions"
   - If using any Cloudflare Functions, enable relevant settings

2. Under "Settings" > "Builds & deployments":
   - Enable "Preview Deployments" for branch testing
   - Set up branch deployments for develop branch

3. Under "Settings" > "Environment variables":
   - Verify all environment variables
   - Add production-specific variables if needed

### 5. Verification Checklist

Before considering deployment complete, verify:

- [ ] Main site loads at fairwitness.bot
- [ ] All assets (images, CSS) load properly
- [ ] Links work correctly
- [ ] Framework diagram displays correctly
- [ ] Mobile navigation functions properly
- [ ] HTTP security headers are properly set
- [ ] SSL/TLS is correctly configured

### 6. Post-Deployment Monitoring

1. Set up Cloudflare Analytics to monitor:
   - Page views and visitor metrics
   - Performance data
   - Cache hit rates
   - Security events

2. Configure Alerts for:
   - Failed deployments
   - Performance degradation
   - Security incidents

This preparation document serves as a systematic guide for deploying the Fair Witness Bot framework to Cloudflare Pages while maintaining performance, security, and reliability.
