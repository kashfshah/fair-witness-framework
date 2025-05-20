/**
 * Extract Inline Scripts for Fair Witness Framework
 * 
 * This script extracts inline scripts from HTML files and moves them
 * to external JavaScript files, improving Content Security Policy compliance.
 * 
 * Following Function-Epistemic principles:
 * - Observer: Documents inline scripts objectively without interpretation
 * - Evaluator: Applies security standards (ISO/IEC 27001:2022) to script extraction
 * - Analyst: Identifies patterns in script usage and organization
 * - Synthesist: Transforms inline code to external references
 * - Communicator: Reports on extraction process clearly
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { globSync } from 'glob';
import { JSDOM } from 'jsdom';
import { fileURLToPath } from 'url';

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const DIST_DIR = path.join(process.cwd(), 'dist');
const JS_OUTPUT_DIR = path.join(DIST_DIR, 'assets', 'js', 'extracted');

/**
 * Generates a unique filename based on script content
 * @param {string} content - Script content
 * @return {string} Unique filename
 */
function generateUniqueFileName(content) {
  const hash = crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
  return `inline-script-${hash}`;
}

/**
 * Ensures the output directory exists
 */
function ensureOutputDirExists() {
  if (!fs.existsSync(JS_OUTPUT_DIR)) {
    fs.mkdirSync(JS_OUTPUT_DIR, { recursive: true });
  }
}

/**
 * Extracts inline scripts from HTML file and saves them as external files
 * @param {string} htmlFilePath - Path to HTML file
 * @return {number} Number of scripts extracted
 */
function extractInlineScriptsFromFile(htmlFilePath) {
  console.log(`Processing ${path.relative(DIST_DIR, htmlFilePath)}...`);
  
  // Read HTML file
  const html = fs.readFileSync(htmlFilePath, 'utf-8');
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  // Find all inline scripts
  const inlineScripts = document.querySelectorAll('script:not([src])');
  let extractedCount = 0;
  
  if (inlineScripts.length > 0) {
    inlineScripts.forEach(script => {
      const content = script.textContent.trim();
      
      if (content) {
        // Generate unique filename
        const fileName = generateUniqueFileName(content);
        const relativeFilePath = `assets/js/extracted/${fileName}.js`;
        const fullFilePath = path.join(DIST_DIR, relativeFilePath);
        
        // Write script content to external file
        fs.writeFileSync(fullFilePath, content);
        
        // Replace inline script with reference to external file
        script.textContent = '';
        script.setAttribute('src', `/${relativeFilePath}`);
        extractedCount++;
      }
    });
    
    // Save modified HTML
    fs.writeFileSync(htmlFilePath, dom.serialize());
  }
  
  return extractedCount;
}

/**
 * Processes all HTML files and extracts inline scripts
 * @return {Object} Statistics about extraction process
 */
function processAllFiles() {
  // Find all HTML files in the dist directory
  const htmlFiles = globSync('**/*.html', { cwd: DIST_DIR, absolute: true });
  console.log(`Found ${htmlFiles.length} HTML files to process`);
  
  let totalExtracted = 0;
  let filesModified = 0;
  
  htmlFiles.forEach(file => {
    const extracted = extractInlineScriptsFromFile(file);
    if (extracted > 0) {
      filesModified++;
      totalExtracted += extracted;
    }
  });
  
  return {
    totalFiles: htmlFiles.length,
    filesModified,
    scriptsExtracted: totalExtracted
  };
}

/**
 * Main execution function
 */
function main() {
  console.log('Starting inline script extraction...');
  
  ensureOutputDirExists();
  const stats = processAllFiles();
  
  console.log(`
    Extraction complete:
    - Total HTML files processed: ${stats.totalFiles}
    - Files modified: ${stats.filesModified}
    - Inline scripts extracted: ${stats.scriptsExtracted}
  `);
}

// Execute the script
main();
