#!/bin/bash

# Navigate to the NodeWebApps directory
cd /home/thatkrxf/NodeWebApps

# Add all changes
git add .

# Commit changes with a timestamp as the message
git commit -m "Routine commit - $(date '+%Y-%m-%d %H:%M:%S')"

# Push changes to the origin main branch
git push origin main
