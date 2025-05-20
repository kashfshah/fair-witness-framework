/**
 * CSP Headers Updater for Fair Witness Framework
 * 
 * This script updates the _headers file with generated CSP hashes
 * to eliminate 'unsafe-inline' directives for improved security.
 * 
 * Following Function-Epistemic principles:
 * - Observer: Documents current header state objectively
 * - Evaluator: Applies security standards to header format
 * - Analyst: Identifies patterns in header structure
 * - Synthesist: Combines hash data with existing headers
 * - Communicator: Produces clear, structured security directives
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Reads the generated CSP hashes from file
 * @return {Object} Object containing script and style CSP directives
 */
function readGeneratedHashes() {
  try {
    const cspHashes = fs.readFileSync('dist/csp-hashes.txt', 'utf-8').split('\n');
    
    return {
      scriptSrc: cspHashes[0],
      styleSrc: cspHashes[1]
    };
  } catch (error) {
    console.error('Error reading CSP hashes file:', error);
    process.exit(1);
  }
}

/**
 * Reads the current _headers file content
 * @return {string} Content of _headers file
 */
function readHeadersFile() {
  const headersPath = path.join('dist', '_headers');
  
  try {
    return fs.readFileSync(headersPath, 'utf-8');
  } catch (error) {
    console.error('Error reading _headers file:', error);
    process.exit(1);
  }
}

/**
 * Updates CSP directives in _headers content
 * @param {string} headersContent - Current _headers file content
 * @param {Object} cspDirectives - Object containing CSP directives
 * @return {string} Updated _headers content
 */
function updateCspDirectives(headersContent, cspDirectives) {
  // Replace script-src directive
  headersContent = headersContent.replace(
    /script-src\s+'self'\s+'unsafe-inline'[^;]*;/,
    cspDirectives.scriptSrc
  );
  
  // Replace style-src directive
  headersContent = headersContent.replace(
    /style-src\s+'self'\s+'unsafe-inline'[^;]*;/,
    cspDirectives.styleSrc
  );
  
  return headersContent;
}

/**
 * Writes updated _headers content to file
 * @param {string} updatedContent - Updated _headers content
 */
function writeHeadersFile(updatedContent) {
  const headersPath = path.join('dist', '_headers');
  
  try {
    fs.writeFileSync(headersPath, updatedContent);
    console.log('Updated _headers file with CSP hashes');
  } catch (error) {
    console.error('Error writing _headers file:', error);
    process.exit(1);
  }
}

/**
 * Main execution function
 */
function main() {
  console.log('Starting CSP headers update...');
  
  const cspDirectives = readGeneratedHashes();
  const headersContent = readHeadersFile();
  const updatedContent = updateCspDirectives(headersContent, cspDirectives);
  writeHeadersFile(updatedContent);
  
  console.log('_headers file successfully updated with hash-based CSP');
}

// Execute the script
main();
