<!--
Fair Witness Bot Framework
Copyright (c) 2025 Fair Witness Bot

This work is licensed under a Creative Commons Attribution-ShareAlike 4.0
International License (CC BY-SA 4.0).
https://creativecommons.org/licenses/by-sa/4.0/
-->

# Fair Witness Bot Deployment Guide

This guide documents the deployment process for the Fair Witness Bot website using Cloudflare Pages.

## Deployment Configuration

The `pages.toml` file contains the Cloudflare Pages configuration with these specifications:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: 18
- Environment variables for API keys
- Asset caching rules
- Security headers
- Performance optimizations

## Deployment Process

### 1. Prerequisites

- A Cloudflare account
- The Fair Witness Bot codebase
- Access to the domain `fairwitness.bot`
- Git repository for the project

### 2. Cloudflare Pages Setup

1. Log into the Cloudflare dashboard
2. Navigate to Pages
3. Click "Create a project"
4. Connect your GitHub/GitLab repository
5. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (project root)
   - Framework preset: Astro

### 3. Environment Variables

Add these environment variables in the Cloudflare dashboard:

- `NODE_ENV`: `production`
- `ASTRO_TELEMETRY_DISABLED`: `1`

Add any API keys needed for dynamic functionality:
- `OPENAI_API_KEY` (if applicable)
- `ANTHROPIC_API_KEY` (if applicable)

### 4. Domain Configuration

1. In the Cloudflare Pages project settings, navigate to "Custom domains"
2. Add the domain: `fairwitness.bot`
3. Configure DNS settings as prompted by Cloudflare
4. If using Cloudflare as the DNS provider, add an AAAA record pointing to the Pages deployment

### 5. Deployment Verification

After deployment, verify these aspects:

- Site loads correctly at `https://fairwitness.bot`
- Mobile navigation functions properly
- All pages render with correct styles
- Example components function as expected
- Clipboard functionality works across browsers

## Continuous Deployment

The configuration enables continuous deployment through:

1. Automatic deployments when changes push to the main branch
2. Preview deployments for pull requests
3. Production builds optimized for performance

## Troubleshooting

If deployment issues occur:

1. Check build logs in the Cloudflare dashboard
2. Verify that all dependencies install correctly
3. Confirm that environment variables set properly
4. Check for path issues in the asset references

## Performance Optimizations

The deployment configuration includes:

- JS and CSS minification
- Image optimization
- Long-term caching for static assets
- Security headers for enhanced protection
- HTML optimization

## Maintenance

Regular maintenance tasks include:

1. Updating dependencies
2. Monitoring analytics
3. Checking Cloudflare logs for errors
4. Testing on new browser versions

This deployment configuration establishes a production-ready environment for the Fair Witness Bot website with security, performance, and reliability optimizations.
