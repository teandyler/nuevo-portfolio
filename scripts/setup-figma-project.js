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
  log("  1. Run 'npm install' if you haven't already");
  log("  2. Run 'npm run dev' to start the development server");
  log("  3. Run 'npm run build' to test the build\n");
}

main();
