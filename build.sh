#!/bin/bash

# GOAT Alliance Vercel Build Script
echo "🐐 Building GOAT Alliance Frontend for Vercel..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

echo "✅ Build completed successfully!"