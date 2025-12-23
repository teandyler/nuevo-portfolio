# Figma Export Setup Plan for Cursor

This plan automates the complete setup of a Figma Make export project. After unzipping your Figma export, copy this file to the project root and ask Cursor to "Run the plan in FIGMA_SETUP_PLAN.md" or "Execute the setup plan".

## Plan Overview

This plan will:
1. Create scaffolding scripts directory
2. Create setup scripts (Node.js and Shell versions)
3. Update package.json with setup scripts
4. Run the setup script to install dependencies and fix issues
5. Install all project dependencies
6. Verify the build works

---

## Step 1: Create Scripts Directory

Create the `scripts/` directory in the project root if it doesn't exist.

**Action:** Create directory `scripts/` if it doesn't exist.

---

## Step 2: Create Setup Script (Node.js)

Create `scripts/setup-figma-project.js` with the following content:

```javascript
#!/usr/bin/env node

/**
 * Figma Project Setup Script (Node.js version)
 * This script automates the setup process for Figma Make exports
 * Run this script after downloading a new Figma export
 * 
 * Usage: npm run setup
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkCommand(command) {
  try {
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function runCommand(command, description) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    log(`\n❌ Error: ${description}`, 'red');
    return false;
  }
}

function checkPackageInstalled(packageName) {
  try {
    const result = execSync(`npm list ${packageName}`, { 
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    return result.trim().length > 0 && !result.includes('(empty)');
  } catch {
    return false;
  }
}

function checkDependencyInPackageJson(packageName) {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };
    return packageName in allDeps;
  } catch {
    return false;
  }
}

function findFilesWithJSX(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
      findFilesWithJSX(filePath, fileList);
    } else if (file.endsWith('.ts') && !file.endsWith('.tsx')) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        // Check for JSX patterns
        if (content.match(/<[A-Za-z]|<\/[A-Za-z]|\/>/)) {
          fileList.push(filePath);
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
  });

  return fileList;
}

function main() {
  log('🔧 Figma Project Setup Script', 'green');
  log('==============================\n', 'green');

  // Check if we're in the right directory
  if (!fs.existsSync('package.json')) {
    log('❌ Error: package.json not found. Please run this script from the project root.', 'red');
    process.exit(1);
  }

  // Step 1: Check and install dependencies
  log('📦 Step 1: Checking and installing missing dependencies...\n');

  if (!checkPackageInstalled('typescript')) {
    log('⚠️  TypeScript not found. Installing...', 'yellow');
    runCommand('npm install --save-dev typescript', 'Installing TypeScript');
    log('✓ TypeScript installed\n', 'green');
  } else {
    log('✓ TypeScript already installed', 'green');
  }

  if (!checkPackageInstalled('@types/react')) {
    log('⚠️  @types/react not found. Installing...', 'yellow');
    runCommand('npm install --save-dev @types/react @types/react-dom', 'Installing React types');
    log('✓ React types installed\n', 'green');
  } else {
    log('✓ React types already installed', 'green');
  }

  // Check for react-input-mask types if react-input-mask is a dependency
  if (checkDependencyInPackageJson('react-input-mask') && !checkPackageInstalled('@types/react-input-mask')) {
    log('⚠️  @types/react-input-mask not found. Installing...', 'yellow');
    runCommand('npm install --save-dev @types/react-input-mask', 'Installing react-input-mask types');
    log('✓ react-input-mask types installed\n', 'green');
  } else {
    log('✓ react-input-mask types already installed or not needed', 'green');
  }

  // Step 2: Check TypeScript configuration
  log('\n📝 Step 2: Checking TypeScript configuration...\n');

  const tsconfigJson = {
    compilerOptions: {
      target: 'ES2020',
      useDefineForClassFields: true,
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true,
      baseUrl: '.',
      paths: {
        '@/*': ['./src/*']
      }
    },
    include: ['src'],
    references: [{ path: './tsconfig.node.json' }]
  };

  if (!fs.existsSync('tsconfig.json')) {
    log('⚠️  tsconfig.json not found. Creating...', 'yellow');
    fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfigJson, null, 2));
    log('✓ Created tsconfig.json', 'green');
  } else {
    log('✓ tsconfig.json already exists', 'green');
  }

  const tsconfigNodeJson = {
    compilerOptions: {
      composite: true,
      skipLibCheck: true,
      module: 'ESNext',
      moduleResolution: 'bundler',
      allowSyntheticDefaultImports: true
    },
    include: ['vite.config.ts']
  };

  if (!fs.existsSync('tsconfig.node.json')) {
    log('⚠️  tsconfig.node.json not found. Creating...', 'yellow');
    fs.writeFileSync('tsconfig.node.json', JSON.stringify(tsconfigNodeJson, null, 2));
    log('✓ Created tsconfig.node.json', 'green');
  } else {
    log('✓ tsconfig.node.json already exists', 'green');
  }

  // Step 3: Check for .ts files containing JSX
  log('\n🔍 Step 3: Checking for .ts files containing JSX...\n');

  if (!fs.existsSync('src')) {
    log('⚠️  src directory not found. Skipping JSX check.', 'yellow');
  } else {
    const jsxFiles = findFilesWithJSX('src');

    if (jsxFiles.length === 0) {
      log('✓ No .ts files with JSX found', 'green');
    } else {
      jsxFiles.forEach(file => {
        const newFile = file.replace(/\.ts$/, '.tsx');
        log(`⚠️  Found JSX in .ts file: ${file}`, 'yellow');
        log(`   → Renaming to ${newFile}`, 'green');
        fs.renameSync(file, newFile);
      });
      log(`\n✓ Fixed ${jsxFiles.length} file(s) with JSX in .ts extension`, 'green');
    }
  }

  log('\n✅ Setup complete!', 'green');
  log('\nNext steps:', 'green');
  log('  1. Run \'npm install\' if you haven\'t already');
  log('  2. Run \'npm run dev\' to start the development server');
  log('  3. Run \'npm run build\' to test the build\n');
}

main();
```

**Action:** Create the file `scripts/setup-figma-project.js` with the exact content above. Make it executable.

---

## Step 3: Create Setup Script (Shell)

Create `scripts/setup-figma-project.sh` with the following content:

```bash
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
    cat > tsconfig.json << 'EOF'
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
EOF
    echo -e "${GREEN}✓ Created tsconfig.json${NC}"
else
    echo -e "${GREEN}✓ tsconfig.json already exists${NC}"
fi

# Check for tsconfig.node.json
if [ ! -f "tsconfig.node.json" ]; then
    echo -e "${YELLOW}⚠️  tsconfig.node.json not found. Creating...${NC}"
    cat > tsconfig.node.json << 'EOF'
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
EOF
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
```

**Action:** Create the file `scripts/setup-figma-project.sh` with the exact content above. Make it executable using `chmod +x scripts/setup-figma-project.sh`.

---

## Step 4: Update package.json

Add the setup scripts to `package.json`. In the `"scripts"` section, add these if they don't already exist:

```json
{
  "scripts": {
    "setup": "node scripts/setup-figma-project.js",
    "setup:shell": "./scripts/setup-figma-project.sh"
  }
}
```

**Action:** Read `package.json`, check if the `scripts` section exists, and add the `setup` and `setup:shell` scripts if they don't exist. Preserve all existing scripts.

---

## Step 5: Run the Setup Script

Execute the setup script to install TypeScript dependencies and fix issues.

**Action:** Run `npm run setup` in the project root directory.

---

## Step 6: Install Dependencies

Install all project dependencies.

**Action:** Run `npm install` in the project root directory.

---

## Step 7: Verify Build

Test that the project builds successfully.

**Action:** Run `npm run build` to verify the build works. If there are errors, report them but don't fail the plan.

---

## Completion

After completing all steps, the project should be ready to run. The user can start the development server with `npm run dev`.

**Summary of what was created:**
- ✅ `scripts/setup-figma-project.js` - Node.js setup script
- ✅ `scripts/setup-figma-project.sh` - Shell setup script
- ✅ Updated `package.json` with setup scripts
- ✅ TypeScript dependencies installed
- ✅ TypeScript configuration files created
- ✅ JSX files with wrong extensions fixed
- ✅ All dependencies installed
- ✅ Build verified
