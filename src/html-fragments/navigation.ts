import { escapeHtml } from "../utils/escape-html.js";
import { filenameFromFlow } from "../utils/filename-from-flow.js";
import type { IFlow } from "../utils/types.js";
export function generateNavigation(
    flows: Record<string, Array<IFlow>>,
    currentFlow: IFlow
): string {
    const navigationHtml = `
        <nav id="site-navigation">
            ${Object.entries(flows)
            .map(([groupName, groupFlows]) => `
                <h3>${escapeHtml(groupName)}</h3>
                    ${groupFlows.map(flow => `
                    <a href="${filenameFromFlow(flow)}" ${flow.title === currentFlow.title ? 'class="active"' : ''}>
                        ${escapeHtml(flow.title)}
                    </a>
                `).join('')}
        `).join('')}
        </nav>
    `.trim();

    return navigationHtml;
}
