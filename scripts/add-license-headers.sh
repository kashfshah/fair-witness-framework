#!/bin/bash
# Add-License-Headers.sh
#
# This script adds Creative Commons Attribution-ShareAlike 4.0 license headers
# to specified source files in the Fair Witness Bot project.
#
# Usage:
#   ./scripts/add-license-headers.sh
#
# This script operates under the CC BY-SA 4.0 license.

set -e

LICENSE_YEAR="2025"
LICENSE_HOLDER="Fair Witness Bot"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Define license headers for different file types
ASTRO_JS_TS_LICENSE="/**\n * @license\n * Fair Witness Bot Framework\n * Copyright (c) ${LICENSE_YEAR} ${LICENSE_HOLDER}\n * This source code contains material licensed under the Creative Commons\n * Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0).\n * https://creativecommons.org/licenses/by-sa/4.0/\n */\n\n"

MARKDOWN_LICENSE="<!--\nFair Witness Bot Framework\nCopyright (c) ${LICENSE_YEAR} ${LICENSE_HOLDER}\n\nThis work is licensed under a Creative Commons Attribution-ShareAlike 4.0\nInternational License (CC BY-SA 4.0).\nhttps://creativecommons.org/licenses/by-sa/4.0/\n-->\n\n"

CSS_LICENSE="/**\n * @license\n * Fair Witness Bot Framework\n * Copyright (c) ${LICENSE_YEAR} ${LICENSE_HOLDER}\n * This source code contains material licensed under the Creative Commons\n * Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0).\n * https://creativecommons.org/licenses/by-sa/4.0/\n */\n\n"

SHELL_LICENSE="#!/bin/bash\n#\n# Fair Witness Bot Framework\n# Copyright (c) ${LICENSE_YEAR} ${LICENSE_HOLDER}\n#\n# This work is licensed under a Creative Commons Attribution-ShareAlike 4.0\n# International License (CC BY-SA 4.0).\n# https://creativecommons.org/licenses/by-sa/4.0/\n\n"

YAML_LICENSE="# Fair Witness Bot Framework\n# Copyright (c) ${LICENSE_YEAR} ${LICENSE_HOLDER}\n#\n# This work is licensed under a Creative Commons Attribution-ShareAlike 4.0\n# International License (CC BY-SA 4.0).\n# https://creativecommons.org/licenses/by-sa/4.0/\n\n"

add_license_to_file() {
  local file=$1
  local license_text=$2
  local file_content
  
  # Read file content
  file_content=$(cat "$file")
  
  # First, check if file already has a license
  if grep -q "@license" "$file" || grep -q "This work is licensed under" "$file"; then
    echo "License already present in $file, skipping..."
    return
  fi
  
  echo "Adding license to $file"
  
  # For shell scripts, maintain shebang but insert license after it
  if [[ "$file" == *.sh ]]; then
    if [[ "$file_content" == \#\!/bin/* ]]; then
      local shebang
      local rest_of_content
      shebang=$(head -n 1 "$file")
      rest_of_content=$(tail -n +2 "$file")
      echo -e "${shebang}\n${license_text}${rest_of_content}" > "$file"
    else
      echo -e "${license_text}${file_content}" > "$file"
    fi
  # For Astro files, insert after the opening ---
  elif [[ "$file" == *.astro ]]; then
    if [[ "$file_content" == ---* ]]; then
      echo -e "---\n${license_text}${file_content#---}" > "$file"
    else
      echo -e "${license_text}${file_content}" > "$file"
    fi
  else
    # Simply prepend for other file types
    echo -e "${license_text}${file_content}" > "$file"
  fi
}

# Process each file type
echo "Processing source files..."

# Add license to Astro, JS, and TS files
find "$REPO_ROOT/src" -type f \( -name "*.astro" -o -name "*.js" -o -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" | while read -r file; do
  add_license_to_file "$file" "$ASTRO_JS_TS_LICENSE"
done

# Add license to CSS files
find "$REPO_ROOT/src" -type f -name "*.css" -not -path "*/node_modules/*" | while read -r file; do
  add_license_to_file "$file" "$CSS_LICENSE"
done

# Add license to Shell script files
find "$REPO_ROOT/scripts" -type f -name "*.sh" | while read -r file; do
  add_license_to_file "$file" "$SHELL_LICENSE"
done

# Add license to Markdown files in the root and docs (if it exists)
find "$REPO_ROOT" -maxdepth 1 -type f -name "*.md" -not -name "LICENSE.md" -not -name "CHANGELOG.md" | while read -r file; do
  add_license_to_file "$file" "$MARKDOWN_LICENSE"
done

if [ -d "$REPO_ROOT/docs" ]; then
  find "$REPO_ROOT/docs" -type f -name "*.md" | while read -r file; do
    add_license_to_file "$file" "$MARKDOWN_LICENSE"
  done
fi

# Add license to YAML files (but not package management files)
find "$REPO_ROOT" -type f \( -name "*.yaml" -o -name "*.yml" \) -not -name "package.yaml" -not -path "*/node_modules/*" | while read -r file; do
  add_license_to_file "$file" "$YAML_LICENSE"
done

echo "License headers added successfully!"
