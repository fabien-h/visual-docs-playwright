import { marked } from "marked";
import { escapeHtml } from "../utils/escape-html.js";
import type { IFlow } from "../utils/types.js";
import type { FullConfig } from "@playwright/test/reporter";

export const generateFlowContent = (
    flow: IFlow,
    configuration: FullConfig
): string => `<main id="main">
    <header>
        <p>${flow.group}</p>
        <h1>${flow.title}</h1>
        ${configuration.metadata.repositoryUrl ? `<a href="${configuration.metadata.repositoryUrl}/blob/main/tests/${flow.group}/${flow.title}.spec.ts">View source</a>` : ''}
    </header>
    
    <div class="description">
        ${marked.parse(flow.description)}
    </div>
    
    ${flow.steps.map(step => {
    if (step.type === 'section') {
        return `<hr/>
            <h2 id="${step.title}">${step.title}</h2>
            ${marked.parse(step.description ?? '')}
        `;
    }

    return `
        ${step.title && `<h3>${step.title}</h3>`}
        ${step.description && marked.parse(step.description)}
        <div class="imgs-container">
            <div class="img-container">
                <img src="${step.filepath}-desktop.png" alt="Screenshot for ${escapeHtml(flow.title)}" />
            </div>
            <div class="img-container">
                <img src="${step.filepath}-tablet.png" alt="Screenshot for ${escapeHtml(flow.title)}" />
            </div>
            <div class="img-container">
                <img src="${step.filepath}-mobile.png" alt="Screenshot for ${escapeHtml(flow.title)}" />
            </div>
        </div>
    `}).join('')}
</main>

<nav id="page-navigation">
    <h2>Sections</h2>
    <a href="#main">Summary</a>
    ${flow.steps.map(step => {
        if (step.type !== 'section') return '';
        return `<a href="#${step.title}">${step.title}</a>`
    }).join('')}
</nav>`.trim();