#!/bin/bash
# Development Workflow Security Safeguards
# Function-Epistemic Framework Project

# Observer Function: Log execution
echo "Applying development environment security safeguards for Function-Epistemic Framework"
echo "Running at $(date)"

# Analyst Function: Determine environment
if [ -f "package.json" ]; then
  echo "Detected Node.js project directory"
else
  echo "Error: Not executed from project root directory"
  echo "Please run this script from the Function-Epistemic Framework project root"
  exit 1
fi

# Evaluator Function: Check configurations
echo "Evaluating current configurations..."

# Disable sourcemaps for development builds
if grep -q "sourcemap" astro.config.mjs 2>/dev/null; then
  echo "WARNING: Sourcemaps may expose server source code (GHSA-49w6-73cw-chjr)"
  echo "Consider disabling sourcemaps for builds shared outside the development team"
else
  echo "No explicit sourcemap configuration detected"
fi

# Check network configuration
echo "Checking development server network configuration..."
if [[ $(hostname -I) =~ "192.168." ]] || [[ $(hostname -I) =~ "10." ]] || [[ $(hostname -I) =~ "172.16." ]]; then
  echo "Development on private network - reduced risk of cross-site request forgery"
else
  echo "WARNING: Development on public network increases vulnerability exposure"
  echo "Consider using a private network environment for development"
fi

# Synthesist Function: Implement safeguards
echo "Implementing additional safeguards..."

# Add .npmrc with audit level configuration
cat > .npmrc << EOL
audit=true
fund=false
EOL
echo "Created .npmrc with explicit audit settings"

# Create secure dev start script
cat > secure-dev.sh << EOL
#!/bin/bash
# Secure development server wrapper

echo "Starting development server with additional security precautions..."

# Validate environment
if [[ \$(hostname -I) =~ "192.168." ]] || [[ \$(hostname -I) =~ "10." ]] || [[ \$(hostname -I) =~ "172.16." ]]; then
  echo "Network environment validated"
else
  echo "WARNING: Running on potentially unsafe network"
  read -p "Continue anyway? [y/N] " -n 1 -r
  echo
  if [[ ! \$REPLY =~ ^[Yy]\$ ]]; then
    echo "Development server startup aborted"
    exit 1
  fi
fi

# Start with enhanced options
NODE_OPTIONS=--no-experimental-fetch npm run dev
EOL
chmod +x secure-dev.sh
echo "Created secure development server script: secure-dev.sh"

# Create upgrade preparation script
cat > prepare-upgrade.sh << EOL
#!/bin/bash
# Preparation for Astro major version upgrade

echo "Preparing for Astro major version upgrade..."

# Create backup
timestamp=\$(date +"%Y%m%d%H%M%S")
backup_dir="backup_\$timestamp"
mkdir -p \$backup_dir
cp package.json package-lock.json \$backup_dir/
cp -r src \$backup_dir/
echo "Created backup in \$backup_dir"

# Run compatibility checks
echo "Running compatibility pre-checks..."
npx astro telemetry off
npx astro check
echo "Review warnings and errors before proceeding with upgrade"

echo "When ready to proceed with upgrade, run:"
echo "npm install astro@latest @astrojs/tailwind@latest"
EOL
chmod +x prepare-upgrade.sh
echo "Created upgrade preparation script: prepare-upgrade.sh"

# Communicator Function: Summary
echo
echo "Security safeguards implemented:"
echo "1. Added security audit configuration"
echo "2. Created secure development server script"
echo "3. Created upgrade preparation script"
echo
echo "Recommended actions:"
echo "1. Use ./secure-dev.sh for development instead of npm run dev"
echo "2. Schedule the major version upgrade during next feature milestone"
echo "3. Monitor security advisories at https://github.com/withastro/astro/security/advisories"
echo
echo "See security/dependency-audit-plan.md for complete security assessment"
