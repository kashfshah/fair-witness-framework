/**
 * CSP Hash Generator for Fair Witness Framework
 * 
 * This script extracts inline scripts and styles from HTML files,
 * generates SHA-256 hashes for each element, and outputs CSP directives
 * compatible with security headers.
 * 
 * Following Function-Epistemic principles:
 * - Observer: Extracts facts (inline scripts/styles) without interpretation
 * - Evaluator: Applies standardized hashing algorithms
 * - Analyst: Identifies patterns in script usage
 * - Synthesist: Combines security data into coherent CSP directives
 * - Communicator: Translates technical hashes into usable policy format
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { JSDOM } from 'jsdom';

// Collection of security hashes
const scriptHashes = new Set();
const styleHashes = new Set();

/**
 * Generates SHA-256 hash for content
 * @param {string} content - Script or style content to hash
 * @return {string} Base64 encoded hash
 */
function generateHash(content) {
  return crypto.createHash('sha256').update(content).digest('base64');
}

/**
 * Processes HTML files to extract and hash inline scripts and styles
 */
function processHtmlFiles() {
  console.log('Extracting and hashing inline scripts and styles...');
  
  // Find all HTML files in the build directory
  const htmlFiles = globSync('dist/**/*.html');
  console.log(`Found ${htmlFiles.length} HTML files to process`);
  
  // Process each HTML file
  htmlFiles.forEach(file => {
    const html = fs.readFileSync(file, 'utf-8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Hash inline scripts
    document.querySelectorAll('script:not([src])').forEach(script => {
      const content = script.textContent;
      if (content.trim()) {
        const hash = generateHash(content);
        scriptHashes.add(`'sha256-${hash}'`);
      }
    });
    
    // Hash inline styles
    document.querySelectorAll('style').forEach(style => {
      const content = style.textContent;
      if (content.trim()) {
        const hash = generateHash(content);
        styleHashes.add(`'sha256-${hash}'`);
      }
    });
  });
  
  console.log(`Generated ${scriptHashes.size} script hashes and ${styleHashes.size} style hashes`);
}

/**
 * Generates CSP directives from collected hashes
 * @return {Object} Object containing script and style CSP directives
 */
function generateCspDirectives() {
  const scriptSrc = `script-src 'self' ${Array.from(scriptHashes).join(' ')};`;
  const styleSrc = `style-src 'self' https://fonts.googleapis.com ${Array.from(styleHashes).join(' ')};`;
  
  return {
    scriptSrc,
    styleSrc
  };
}

/**
 * Outputs CSP directives to console and file
 * @param {Object} directives - Object containing CSP directives
 */
function outputResults(directives) {
  console.log('\n// Script hashes for CSP');
  console.log(directives.scriptSrc);
  console.log('\n// Style hashes for CSP');
  console.log(directives.styleSrc);
  
  // Save to a file for build process
  const outputContent = `${directives.scriptSrc}\n${directives.styleSrc}`;
  fs.writeFileSync('dist/csp-hashes.txt', outputContent);
  
  console.log('\nCSP hash directives saved to dist/csp-hashes.txt');
}

/**
 * Main execution function
 */
function main() {
  console.log('Starting CSP hash generation...');
  
  processHtmlFiles();
  const directives = generateCspDirectives();
  outputResults(directives);
  
  console.log('CSP hash generation complete');
}

// Execute the script
main();
