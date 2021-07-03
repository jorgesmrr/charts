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
  valuesSteps?: number;
  width: number;
  height: number;
  margin?: number;
  barWidth?: number;
  style?: string;
}

export interface ChartInternalOptions {
  data: ChartData[];
  maxValue: number;
  valuesSteps: number;
  width: number;
  height: number;
  margin: number;
  barWidth: number;
  style: string;
  areas: {
    chart: ChartArea;
    bottom: ChartArea;
    left: ChartArea;
    values: ChartArea;
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
