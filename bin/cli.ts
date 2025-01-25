#!/usr/bin/env node

import { Command } from 'commander';
import { VERSION } from '../src/utils/version.js';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path, { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import fs from 'node:fs';

const version = VERSION;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const program = new Command();

program
    .name('doc-from-playwright')
    .description('CLI to generate documentation from Playwright tests')
    .version(version);

program
    .command('generate')
    .description('Generate documentation from Playwright tests')
    .option('-d, --test-dir <path>', 'Directory containing test files', './e2e-tests')
    .option('-o, --output-dir <path>', 'Directory containing the build', './__generated_visual_doc')
    .option('-t, --timeout <ms>', 'Timeout in milliseconds', '30000')
    .option('-b, --browser <browser>', 'Browser to use', 'chromium')
    .option('-u, --base-url <url>', 'Base URL to use', 'http://localhost:8181')
    .option('-w, --workers <number>', 'Number of worker threads', '1')
    .option('-r, --retry-failures <number>', 'Retry failed tests', '0')
    .option('-n, --project-name <name>', 'Project name', 'Generated documentation')
    .option('-g, --repository-url <url>', 'Repository URL', '')
    .action(async (options) => {
        console.info('Starting documentation generation...');

        if (options.mobileOnly && options.desktopOnly) {
            console.error('Error: Cannot specify both mobile-only and desktop-only options.');
            process.exit(1);
        }

        try {
            const reporterPath = join(__dirname, '..', 'src', 'doc-reporter.js');
            const tempConfigPath = path.join(tmpdir(), `playwright-config-${Date.now()}.cjs`);
            const absoluteTestDir = path.resolve(process.cwd(), options.testDir);
            const absoluteOutputDir = path.resolve(process.cwd(), options.outputDir);
            const configContent = `
                const { defineConfig } = require('@playwright/test');
                
                export default defineConfig({
                    testDir: '${absoluteTestDir}',
                    outputDir: '${absoluteOutputDir}',
                    timeout: ${options.timeout},
                    fullyParallel: true,
                    use: {
                        browserName: '${options.browser}',
                        headless: ${!options.headed},
                        baseURL: '${options.baseUrl}'
                    },
                    metadata: {
                        outputDir: '${options.outputDir}',
                        projectName: '${options.projectName}',
                        testDir: '${options.testDir}',
                        baseUrl: '${options.baseUrl}',
                        repositoryUrl: '${options.repositoryUrl}',
                    },
                    workers: ${options.workers},
                    retries: ${options.retryFailures},
                    reporter: '${reporterPath}',
                    projects: [
                        {
                            name: '${options.projectName}',
                            use: {},
                        },
                    ],
                });
            `;
            fs.writeFileSync(tempConfigPath, configContent);

            const playwright = spawn('npx', ['playwright', 'test', `--config=${tempConfigPath}`], {
                stdio: 'inherit',
            });

            await new Promise<void>((resolve, reject) => {
                playwright.on('close', (code) => {
                    if (code === 0) {
                        resolve();
                    } else {
                        reject(new Error(`Playwright exited with code ${code}`));
                    }
                });
            });

            await fs.unlinkSync(tempConfigPath);
            console.info('Documentation generation complete!');
        } catch (error) {
            console.error('Error generating documentation:', error);
            process.exit(1);
        }
    });

program.parse();