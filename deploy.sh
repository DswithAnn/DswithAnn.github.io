#!/bin/bash
set -e

echo "Building site..."
npm run build

echo "Verifying 404.html exists..."
if [ ! -f out/404.html ]; then
  echo "Error: 404.html not found in build output"
  exit 1
fi
echo "404.html found successfully"

echo "Copying 404.html..."
mkdir -p out/404
cp out/404.html out/404/index.html

echo "Creating .nojekyll file to prevent GitHub Pages from ignoring _next directory..."
touch out/.nojekyll

echo "Deploying to gh-pages..."
cd out
git init
git add .
git commit -m "Deploy to GitHub Pages"
git branch -M gh-pages
# Use current remote origin
REMOTE_URL=$(git remote get-url origin)
echo "Deploying to $REMOTE_URL..."
git remote add origin "$REMOTE_URL"
git push -f origin gh-pages

echo "Done!"
