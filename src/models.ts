export interface Chart {
  update: (values: number[], labels: string[]) => void;
}
export interface ChartOptions {
  labels: string[];
  values: number[];
  valuesSteps?: number;
  width: number;
  height: number;
  margin?: number;
  barWidth?: number;
  style?: string;
}

export interface ChartInternalOptions {
  labels: string[];
  values: number[];
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
