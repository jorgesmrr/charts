interface IChartOptions {
    labels: string[];
    values: number[];
    valuesSteps?: number;
    width?: number;
    height?: number;
    margin?: number;
    barWidth?: number;
    style?: string;
}
declare const chart: (rootElement: HTMLElement, options: IChartOptions) => void;
export default chart;
