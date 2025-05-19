#!/bin/bash
#!/bin/bash
#
# Fair Witness Bot Framework
# Copyright (c) 2025 Fair Witness Bot
#
# This work is licensed under a Creative Commons Attribution-ShareAlike 4.0
# International License (CC BY-SA 4.0).
# https://creativecommons.org/licenses/by-sa/4.0/

# Asset Optimization Script for Fair Witness Bot
# Prepares all visual assets for production deployment

# Required packages:
# - svgo (SVG optimization)
# - optipng (PNG optimization)
# - jpegoptim (JPEG optimization)
# - pngquant (advanced PNG optimization)

# Ensure script runs from project root
cd "$(dirname "$0")/.." || exit

echo "Optimizing assets for Fair Witness Bot production deployment..."

# Create optimization report directory
mkdir -p reports
REPORT_FILE="reports/asset_optimization_$(date +%Y%m%d).txt"
echo "Asset Optimization Report - $(date)" > "$REPORT_FILE"
echo "=======================================" >> "$REPORT_FILE"

# Function to log optimization results
log_optimization() {
  echo "$1" | tee -a "$REPORT_FILE"
}

# 1. Optimize SVG files
echo "Optimizing SVG files..."
find public -name "*.svg" -type f | while read -r file; do
  original_size=$(stat -c%s "$file")
  svgo --multipass "$file"
  new_size=$(stat -c%s "$file")
  reduction=$((original_size - new_size))
  percent=$((reduction * 100 / original_size))
  log_optimization "SVG: $file - Reduced by $percent% ($reduction bytes)"
done

# 2. Optimize PNG files
echo "Optimizing PNG files..."
find public -name "*.png" -type f | while read -r file; do
  original_size=$(stat -c%s "$file")
  
  # First use optipng for lossless optimization
  optipng -quiet -strip all "$file"
  
  # Then use pngquant for lossy optimization if file is larger than 10KB
  if [ "$(stat -c%s "$file")" -gt 10240 ]; then
    pngquant --force --ext .png --speed 1 --quality 85-95 "$file"
  fi
  
  new_size=$(stat -c%s "$file")
  reduction=$((original_size - new_size))
  percent=$((reduction * 100 / original_size))
  log_optimization "PNG: $file - Reduced by $percent% ($reduction bytes)"
done

# 3. Optimize JPEG files
echo "Optimizing JPEG files..."
find public -name "*.jpg" -o -name "*.jpeg" -type f | while read -r file; do
  original_size=$(stat -c%s "$file")
  jpegoptim --strip-all --max=85 "$file"
  new_size=$(stat -c%s "$file")
  reduction=$((original_size - new_size))
  percent=$((reduction * 100 / original_size))
  log_optimization "JPEG: $file - Reduced by $percent% ($reduction bytes)"
done

# 4. Generate WebP versions for broader browser support
echo "Creating WebP versions..."
find public -name "*.jpg" -o -name "*.png" -type f | while read -r file; do
  webp_file="${file%.*}.webp"
  cwebp -quiet -q 85 "$file" -o "$webp_file"
  original_size=$(stat -c%s "$file")
  webp_size=$(stat -c%s "$webp_file")
  reduction=$((original_size - webp_size))
  percent=$((reduction * 100 / original_size))
  log_optimization "WebP: $webp_file - Reduced by $percent% compared to original"
done

# 5. Calculate total savings
echo "Calculating total optimization results..."
total_original=$(grep "Reduced by" "$REPORT_FILE" | awk -F'[()]' '{sum += $2} END {print sum}')
log_optimization "======================================="
log_optimization "Total space saved: $total_original bytes"
log_optimization "Asset optimization complete!"

echo "Asset optimization complete! Report available at: $REPORT_FILE"

# Make these scripts executable
chmod +x scripts/generate-favicons.sh
chmod +x scripts/generate-og-images.sh
chmod +x scripts/optimize-assets.sh

echo "Execution permission set on all asset generation scripts"
