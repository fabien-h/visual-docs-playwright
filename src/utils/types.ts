export type TDocSection = {
    title: string;
    description?: string;
    type: 'section';
};

export type TDocScreenShot = {
    description: string;
    filepath: string;
    title: string;
    type: 'screenshot';
};

export interface IFlow {
    group: string;
    title: string;
    description: string;
    duration: number;
    steps: Array<TDocSection | TDocScreenShot>;
}
