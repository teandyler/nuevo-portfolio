#!/bin/bash

# Figma Project Setup Script
# This script automates the setup process for Figma Make exports
# Run this script after downloading a new Figma export

set -e  # Exit on error

echo "🔧 Figma Project Setup Script"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

echo "📦 Step 1: Checking and installing missing dependencies..."
echo ""

# Check for TypeScript
if ! npm list typescript &>/dev/null; then
    echo -e "${YELLOW}⚠️  TypeScript not found. Installing...${NC}"
    npm install --save-dev typescript
else
    echo -e "${GREEN}✓ TypeScript already installed${NC}"
fi

# Check for React types
if ! npm list @types/react &>/dev/null; then
    echo -e "${YELLOW}⚠️  @types/react not found. Installing...${NC}"
    npm install --save-dev @types/react @types/react-dom
else
    echo -e "${GREEN}✓ React types already installed${NC}"
fi

# Check for react-input-mask types if react-input-mask is a dependency
if grep -q "react-input-mask" package.json && ! npm list @types/react-input-mask &>/dev/null; then
    echo -e "${YELLOW}⚠️  @types/react-input-mask not found. Installing...${NC}"
    npm install --save-dev @types/react-input-mask
else
    echo -e "${GREEN}✓ react-input-mask types already installed or not needed${NC}"
fi

echo ""
echo "📝 Step 2: Checking TypeScript configuration..."
echo ""

# Check for tsconfig.json
if [ ! -f "tsconfig.json" ]; then
    echo -e "${YELLOW}⚠️  tsconfig.json not found. Creating...${NC}"
    cat > tsconfig.json <<'EOF_JSON_TS'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF_JSON_TS
    echo -e "${GREEN}✓ Created tsconfig.json${NC}"
else
    echo -e "${GREEN}✓ tsconfig.json already exists${NC}"
fi

# Check for tsconfig.node.json
if [ ! -f "tsconfig.node.json" ]; then
    echo -e "${YELLOW}⚠️  tsconfig.node.json not found. Creating...${NC}"
    cat > tsconfig.node.json <<'EOF_JSON_NODE'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF_JSON_NODE
    echo -e "${GREEN}✓ Created tsconfig.node.json${NC}"
else
    echo -e "${GREEN}✓ tsconfig.node.json already exists${NC}"
fi

echo ""
echo "🔍 Step 3: Checking for .ts files containing JSX..."
echo ""

# Find all .ts files in src directory that contain JSX
FOUND_JSX_FILES=0

while IFS= read -r -d '' file; do
    # Check if file contains JSX (look for JSX patterns)
    if grep -qE '<[A-Za-z]|</[A-Za-z]|/>' "$file"; then
        FOUND_JSX_FILES=$((FOUND_JSX_FILES + 1))
        new_file="${file%.ts}.tsx"
        echo -e "${YELLOW}⚠️  Found JSX in .ts file: $file${NC}"
        echo -e "${GREEN}   → Renaming to $new_file${NC}"
        mv "$file" "$new_file"
    fi
done < <(find src -name "*.ts" -type f -print0 2>/dev/null || true)

if [ $FOUND_JSX_FILES -eq 0 ]; then
    echo -e "${GREEN}✓ No .ts files with JSX found${NC}"
else
    echo -e "${GREEN}✓ Fixed $FOUND_JSX_FILES file(s) with JSX in .ts extension${NC}"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Run 'npm install' if you haven't already"
echo "  2. Run 'npm run dev' to start the development server"
echo "  3. Run 'npm run build' to test the build"
echo ""
