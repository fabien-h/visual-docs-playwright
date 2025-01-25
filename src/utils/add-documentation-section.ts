import type { TestInfo } from '@playwright/test';

export const addDocumentationSection = async (
    testInfo: TestInfo,
    title: string,
    description?: string,
) => {
    await testInfo.attachments.push({
        name: description ?? '',
        contentType: title,
        path: '__section__',
    });
}