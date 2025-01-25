import path from "node:path";
import fs from "node:fs";
import { generateFlowContent } from "../html-fragments/flow-content.js";
import { generateLayout } from "../html-fragments/layout.js";
import { generateNavigation } from "../html-fragments/navigation.js";
import type { IFlow } from "./types.js";
import type { FullConfig } from "@playwright/test/reporter";
import { filenameFromFlow } from "./filename-from-flow.js";

export const generateHtmlDocs = (
    flowsGroups: Record<string, Array<IFlow>>,
    configuration: FullConfig
): void => {
    const outputDir = configuration.projects[0].outputDir;
    const flows = Object.entries(flowsGroups).flatMap(([, groupFlows]) => groupFlows);

    for (const flow of flows) {
        const fullHtml = generateLayout(
            configuration.metadata.projectName,
            flow.title,
            configuration.metadata.repositoryUrl,
            generateNavigation(flowsGroups, flow),
            generateFlowContent(flow, configuration)
        );

        const filePath = path.join(outputDir, filenameFromFlow(flow));
        fs.writeFileSync(filePath, fullHtml, 'utf8');
    }
}