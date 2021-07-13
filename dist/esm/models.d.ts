export interface Chart {
    update: (datasets: ChartDataset[]) => void;
}
export declare type ChartType = "horizontal-bars" | "vertical-bars";
export interface ChartDataset {
    label: string;
    values: number[];
    color?: string;
}
export interface ChartValidatedDataset extends ChartDataset {
    color: string;
}
interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}
interface ChartValidatedData extends ChartData {
    datasets: ChartValidatedDataset[];
}
export interface ChartOptions {
    type: ChartType;
    title?: string;
    data: ChartData;
    width: number;
    height: number;
    gridLinesDistance?: number;
}
export interface ChartValidatedOptions extends ChartOptions {
    data: ChartValidatedData;
    gridLinesDistance: number;
}
export interface ChartConfiguration {
    minValue: number;
    maxValue: number;
    valuesDistance: number;
    valueMapperX: (value: number) => number;
    valueMapperY: (value: number) => number;
    areas: {
        chart: ChartArea;
        bottom: ChartArea;
        left: ChartArea;
        plot: ChartArea;
    };
}
export interface ChartArea {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare type ChartPainterTask = (ctx: CanvasRenderingContext2D, configuration: ChartConfiguration, options: ChartValidatedOptions) => void;
export interface ChartPainter {
    paintSteps: ChartPainterTask;
    paintLabels: ChartPainterTask;
    paintValues: ChartPainterTask;
}
export {};
