export interface Chart {
    update: (datasets: ChartDataset[]) => void;
}
export declare type ChartType = "horizontal-bars" | "vertical-bars";
export interface ChartDataset {
    label: string;
    data: number[];
    color?: string;
}
export interface ChartValidatedDataset extends ChartDataset {
    color: string;
}
export interface ChartOptions {
    type: ChartType;
    title: string;
    labels: string[];
    datasets: ChartDataset[];
    width: number;
    height: number;
    gridLines?: number;
}
export interface ChartValidatedOptions extends ChartOptions {
    datasets: ChartValidatedDataset[];
    gridLines: number;
}
export interface ChartConfiguration {
    maxValue: number;
    areas: {
        chart: ChartArea;
        bottom: ChartArea;
        left: ChartArea;
        plot: ChartArea;
    };
    valueMapperX: (value: number) => number;
    valueMapperY: (value: number) => number;
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
