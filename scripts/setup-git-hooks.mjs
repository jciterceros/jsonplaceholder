/**
 * Point this repo at versioned hooks under .githooks (commit-msg strips Cursor footers).
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gitDir = path.join(root, '.git');

if (!fs.existsSync(gitDir)) {
  process.exit(0);
}

try {
  execSync('git config core.hooksPath .githooks', { cwd: root, stdio: 'pipe' });
} catch {
  process.exit(0);
}
