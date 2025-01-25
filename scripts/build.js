import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read package.json
const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
);

// Create the version file with hardcoded version
const versionContent = `export const VERSION = '${packageJson.version}';`;
fs.writeFileSync(path.join(__dirname, '../dist/src/utils/version.js'), versionContent);

