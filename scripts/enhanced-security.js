/**
 * Enhanced Security Measures for Fair Witness Framework
 * 
 * This script implements additional security protections to mitigate
 * vulnerabilities in dependencies following Function-Epistemic
 * Hybrid Framework security principles (ISO/IEC 27001:2022).
 */

import fs from 'fs';
import path from 'path';

/**
 * Enhances Content-Security-Policy with additional protections
 * against DOM Clobbering and XSS attacks
 */
function enhanceCSP() {
  console.log('Enhancing Content-Security-Policy protections...');
  
  const headersPath = path.join(process.cwd(), 'dist', '_headers');
  
  if (!fs.existsSync(headersPath)) {
    console.error('Headers file not found. Run build first.');
    process.exit(1);
  }
  
  let headers = fs.readFileSync(headersPath, 'utf8');
  
  // Add trusted-types policy to prevent DOM clobbering attacks
  if (!headers.includes('trusted-types')) {
    headers = headers.replace(
      /Content-Security-Policy:/,
      'Content-Security-Policy: trusted-types \'none\';'
    );
  }
  
  // Add additional CSP protections
  const additionalProtections = [
    "form-action 'self';",
    "frame-ancestors 'self';",
    "base-uri 'self';",
    "object-src 'none';",
    "require-trusted-types-for 'script';"
  ];
  
  for (const protection of additionalProtections) {
    if (!headers.includes(protection)) {
      headers = headers.replace(
        /Content-Security-Policy:/,
        `Content-Security-Policy: ${protection}`
      );
    }
  }
  
  fs.writeFileSync(headersPath, headers);
  console.log('Enhanced CSP protections applied');
}

/**
 * Adds SameSite=Strict attribute to all cookies to prevent CSRF
 * even in the presence of middleware bypass vulnerabilities
 */
function enhanceCookieSecurity() {
  console.log('Adding SameSite=Strict protection to cookies...');
  
  // Add custom cookie middleware for development server
  const middlewarePath = path.join(process.cwd(), 'src', 'middleware');
  
  if (!fs.existsSync(middlewarePath)) {
    fs.mkdirSync(middlewarePath, { recursive: true });
  }
  
  const cookieMiddlewarePath = path.join(middlewarePath, 'cookie-security.js');
  
  const cookieMiddleware = `/**
 * Cookie Security Middleware
 * Implements SameSite=Strict for all cookies to prevent CSRF attacks
 */
export function onRequest({ request, cookies, redirect }) {
  // Ensure all cookies have SameSite=Strict
  for (const cookie of cookies.getAll()) {
    cookies.set(cookie.name, cookie.value, {
      ...cookie,
      sameSite: 'strict',
      secure: true,
      httpOnly: true
    });
  }
  
  return;
}`;
  
  fs.writeFileSync(cookieMiddlewarePath, cookieMiddleware);
  console.log('Cookie security middleware created');
}

/**
 * Ensures sourcemaps are properly protected in production
 */
function protectSourcemaps() {
  console.log('Protecting sourcemaps...');
  
  const configPath = path.join(process.cwd(), 'astro.config.mjs');
  
  if (!fs.existsSync(configPath)) {
    console.error('Astro config not found.');
    return;
  }
  
  let config = fs.readFileSync(configPath, 'utf8');
  
  // Ensure sourcemaps are disabled in production
  if (!config.includes('sourcemap:')) {
    // Add sourcemap configuration
    config = config.replace(
      /export default defineConfig\(\{/,
      'export default defineConfig({\n  vite: {\n    build: {\n      sourcemap: process.env.NODE_ENV === "production" ? false : true\n    }\n  },'
    );
    
    fs.writeFileSync(configPath, config);
    console.log('Sourcemap protection configured');
  } else {
    console.log('Sourcemap configuration already exists');
  }
  
  // Add _headers rule to block .map files
  const headersPath = path.join(process.cwd(), 'dist', '_headers');
  
  if (fs.existsSync(headersPath)) {
    let headers = fs.readFileSync(headersPath, 'utf8');
    
    if (!headers.includes('/*.map')) {
      headers += '\n\n/*.map\n  Content-Type: text/plain\n  X-Content-Type-Options: nosniff\n  Content-Disposition: attachment\n  Cache-Control: no-store\n';
      fs.writeFileSync(headersPath, headers);
      console.log('Added _headers rules to protect sourcemaps');
    }
  }
}

/**
 * Main execution function
 */
function main() {
  console.log('Applying enhanced security measures...');
  
  try {
    enhanceCSP();
    enhanceCookieSecurity();
    protectSourcemaps();
    
    console.log('All security enhancements successfully applied');
  } catch (error) {
    console.error('Error applying security enhancements:', error);
    process.exit(1);
  }
}

// Execute the script
main();
