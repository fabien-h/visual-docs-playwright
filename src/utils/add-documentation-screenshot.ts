import type { Page, TestInfo } from '@playwright/test';
import { SCREENSHOTS_DIR } from './constants.js';

export const addDocumentationScreenshot = async (
    page: Page,
    testInfo: TestInfo,
    title?: string,
    description?: string,
) => {
    const outputDir = testInfo.config.metadata.outputDir;
    const screenshotName = `${testInfo.title}-${testInfo.attachments.length}`;
    const screenshotPathFromRoot = `${outputDir}/${SCREENSHOTS_DIR}/${screenshotName}`;
    const screenshotPath = `${SCREENSHOTS_DIR}/${screenshotName}`;

    const viewports = [
        { width: 1920, height: 1080, name: 'desktop' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 360, height: 800, name: 'mobile' }
    ];

    for (const viewport of viewports) {
        const context = await page.context();
        const newPage = await context.newPage();
        await newPage.goto(page.url());

        await newPage.setViewportSize({
            width: viewport.width,
            height: viewport.height
        });

        await newPage.waitForLoadState('networkidle');

        await newPage.screenshot({
            path: `${screenshotPathFromRoot}-${viewport.name}.png`,
            fullPage: true,
        });

        await newPage.close();
    }

    await testInfo.attachments.push({
        name: description ?? '',
        contentType: title ?? '',
        path: screenshotPath,
    });
};
