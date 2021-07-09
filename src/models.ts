export interface Chart {
  update: (datasets: ChartDataset[]) => void;
}

export type ChartType = "horizontal-bars" | "vertical-bars";

export interface ChartDataset {
  label: string;
  data: number[];
  color?: string;
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

export interface ChartInternalOptions {
  labels: string[];
  datasets: ChartDataset[];
  gridLines: number;
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

export type ChartPainterTask = (
  ctx: CanvasRenderingContext2D,
  options: ChartInternalOptions
) => void;

export interface ChartPainter {
  paintSteps: ChartPainterTask;
  paintLabels: ChartPainterTask;
  paintValues: ChartPainterTask;
}
