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

// Copy the styles
fs.copyFileSync(path.join(__dirname, '../src/html-fragments/styles_content.css'), path.join(__dirname, '../dist/src/html-fragments/styles_content.css'));
fs.copyFileSync(path.join(__dirname, '../src/html-fragments/styles_document.css'), path.join(__dirname, '../dist/src/html-fragments/styles_document.css'));
fs.copyFileSync(path.join(__dirname, '../src/html-fragments/styles_navigation.css'), path.join(__dirname, '../dist/src/html-fragments/styles_navigation.css'));
