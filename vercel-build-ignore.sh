#!/bin/bash

# Only build for main, preview, and develop branches
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ] && [ "$BRANCH" != "preview" ] && [ "$BRANCH" != "develop" ]; then
  echo "🛑 Skipping build for branch $BRANCH"
  exit 0
fi

# Only build if the commit does not include .md files
if git diff --name-only HEAD~1 HEAD | grep -q '\.md$'; then
  echo "🛑 Skipping build because commit includes .md files"
  exit 0
fi

# Proceed with the build
echo "✅ Proceeding with the build"
exit 1
