export interface Chart {
  update: (data: ChartData[]) => void;
}

export type ChartType = "horizontal-bars" | "vertical-bars";

export interface ChartData {
  label: string;
  value: number;
}

export interface ChartOptions {
  type: ChartType;
  data: ChartData[];
  width: number;
  height: number;
  gridLines?: number;
}

export interface ChartInternalOptions extends ChartOptions {
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
