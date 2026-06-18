#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const [,, command, ...args] = process.argv;

function getNodeVersion() {
  return process.version;
}

function auditPackage(pkgPath) {
  if (!existsSync(pkgPath)) {
    console.error('No package.json found in current directory.');
    process.exit(1);
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  console.log(`\nProject: ${pkg.name}@${pkg.version}`);
  console.log(`Dependencies: ${Object.keys(deps).length}`);
  for (const [name, range] of Object.entries(deps)) {
    console.log(`  ${name}  ${range}`);
  }
}

function checkEnv() {
  console.log(`Node.js  ${getNodeVersion()}`);
  try {
    const npm = execSync('npm --version', { encoding: 'utf8' }).trim();
    console.log(`npm      ${npm}`);
  } catch {}
}

switch (command) {
  case 'audit':
    auditPackage(join(process.cwd(), 'package.json'));
    break;
  case 'check':
    console.log(`Checking ${args[0] ?? '(no package specified)'}...`);
    break;
  case 'env':
    checkEnv();
    break;
  default:
    console.log('Usage: stackpulse <audit|check|env>');
}
