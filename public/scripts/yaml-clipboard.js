/**
 * @license
 * Fair Witness Bot Framework
 * Copyright (c) 2025 Fair Witness Bot
 * This source code contains material licensed under the Creative Commons
 * Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0).
 * https://creativecommons.org/licenses/by-sa/4.0/
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copy-yaml-btn');
  const yamlConfig = document.getElementById('yaml-config');
  
  if (copyBtn && yamlConfig) {
    copyBtn.addEventListener('click', () => {
      // Get the text content from the YAML configuration
      const configText = yamlConfig.textContent;
      
      // Use the clipboard API to copy the text
      navigator.clipboard.writeText(configText)
        .then(() => {
          // Visual feedback that copy was successful
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = '<span>Copied!</span>';
          
          // Restore original button text after 2 seconds
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          alert('Failed to copy text to clipboard');
        });
    });
  }
});
