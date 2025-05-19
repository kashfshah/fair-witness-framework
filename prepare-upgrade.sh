#!/bin/bash
# Preparation for Astro major version upgrade

echo "Preparing for Astro major version upgrade..."

# Create backup
timestamp=$(date +"%Y%m%d%H%M%S")
backup_dir="backup_$timestamp"
mkdir -p $backup_dir
cp package.json package-lock.json $backup_dir/
cp -r src $backup_dir/
echo "Created backup in $backup_dir"

# Run compatibility checks
echo "Running compatibility pre-checks..."
npx astro telemetry off
npx astro check
echo "Review warnings and errors before proceeding with upgrade"

echo "When ready to proceed with upgrade, run:"
echo "npm install astro@latest @astrojs/tailwind@latest"
