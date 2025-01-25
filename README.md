# Visual Docs Playwright

Build visual documentation from Playwright tests by automatically capturing and organizing screenshots of your application's UI states.

## Summary

Visual Docs Playwright is a tool that generates visual documentation from your Playwright tests. It captures screenshots during test execution and creates an organized documentation website. This helps teams maintain up-to-date UI documentation, validate design consistency, and communicate UI states across the organization.

## Installation

```bash
# Using pnpm
pnpm install -D visual-docs-playwright

# Using npm
npm install --save-dev visual-docs-playwright

# Using yarn
yarn add -D visual-docs-playwright
```

## Using in Your Project

Create an end to end test folder at the root of your project. Default name is `e2e-tests`, but you can name it anything you want.

Add your tests in the folder. `e2e-tests/my-flow.spec.ts`

Have only one test per file.

In the test, add annotations to describe the UI state you want to capture.

```typescript
test(
    'My workflow title',
    {
        annoation: {
            type: 'Group name',
            description: `Your flow description

You can add anything you want here, as long as it is valid markdown.
- Lists
- Links
- Images
- Tables
- ...
`
        }
    }
    async ({ page }, testInfo) => {
  // You test code
});
```

The test name (`My workflow title` in the example above) will be used as the title of the page.

The type (`Group name` in the example above) will be used to groups multiple test pages.

In your test code, you can add sections and screenshots :

```typescript
import { addDocumentationScreenshot, addDocumentationSection } from 'visual-docs-playwright';

// ...
    async ({ page }, testInfo) => {
        // ...
        await addDocumentationSection(
            testInfo,
            'Section title',
            'Section description (markdown)'
        );

        // ...

        await addDocumentationScreenshot(
            page,
            testInfo,
            'Screenshot title',
            'Screenshot description (markdown)'
        );
// ...
```

> In `addDocumentationScreenshot`, the title and the description are optional.

Usually, you would create sections in your test like `Authentication success` or `Autentication failure for invalid email` and then proceed to add screenshots after every relevant step. If the tests are too long, you should split them into multiple files and group them under the same type.

## Generating Documentation Locally

Run your Playwright tests with the visual docs reporter:

```bash
# Run tests and generate documentation
npx playwright test

# Start the documentation server
npx visual-docs-playwright serve

# Generate static documentation
npx visual-docs-playwright build
```

Pay attention to the fact that the application should be running when you generate the documentation. Playwright is an end to end testing tool, so it will not run the application for you.

## CLI Options

```bash
Usage: visual-docs-playwright [command] [options]

Commands:
  build          Generate static documentation

Options:
    -d, --test-dir       <path>    Directory containing test files  ./e2e-tests
    -o, --output-dir     <path>    Directory containing the build   ./__generated_visual_doc
    -t, --timeout        <ms>      Timeout in milliseconds          30000
    -b, --browser        <browser> Browser to use                   chromium
    -u, --base-url       <url>     Base URL to use                  http://localhost:8181
    -u, --base-url       <url>     Base URL to use                  http://localhost:8181
    -w, --workers        <number>  Number of worker threads         1
    -r, --retry-failures <number>  Retry failed tests               0
    -n, --project-name   <name>    Project name                     Generated documentation
    -g, --repository-url <url>     Repository URL                   ''
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Visual Documentation

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Install Playwright browsers
      run: npx playwright install --with-deps

    - name: Run tests and generate documentation
      run: |
        npx playwright test
        npx visual-docs-playwright build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./visual-docs
```

## Contributing

Contributions are welcome!

## License

MIT



