#!/bin/bash
# Secure development server wrapper

echo "Starting development server with additional security precautions..."

# Validate environment
if [[ $(hostname -I) =~ "192.168." ]] || [[ $(hostname -I) =~ "10." ]] || [[ $(hostname -I) =~ "172.16." ]]; then
  echo "Network environment validated"
else
  echo "WARNING: Running on potentially unsafe network"
  read -p "Continue anyway? [y/N] " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Development server startup aborted"
    exit 1
  fi
fi

# Start with enhanced options
NODE_OPTIONS=--no-experimental-fetch npm run dev
