import { test, expect } from '@playwright/test';

test(
  'Page has title',
  {
    annotation: {
      type: 'Example flow 1',
      description: `#The page should have a title
      When the page is loaded, the title should be displayed.
      ## The title should be "Playwright"
      When the page is loaded, the title should be "Playwright".
      `,
    },
  },
  async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

test(
  'Page has get started link',
  {
    annotation: {
      type: 'Example flow 1',
      description: `#The page should have a get started link
      When the page is loaded, the get started link should be displayed.
      ## The get started link should be "Get started"
      When the page is loaded, the get started link should be "Get started".
      # On click on the get started link, the page should navigate to the installation page.
      When the get started link is clicked, the page should navigate to the installation page.
      `,
    },
  },
  async ({ page }) => {
    await page.goto('https://playwright.dev/');

    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

test(
  'Test with no annotation (should not appear in the end result)',
  async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

test(
  'Skipped test (should not appear in the end result)',
  {
    annotation: {
      type: 'Skipped test',
      description: 'This test is skipped',
    },
    tag: '@skip',
  },
  async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

