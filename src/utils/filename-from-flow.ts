import { slugify } from "./slugify.js";
import type { IFlow } from "./types.js";

export const filenameFromFlow = (flow: IFlow): string => {
    return `${slugify(flow.group)}-${slugify(flow.title)}.html`;
}