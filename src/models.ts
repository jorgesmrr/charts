export interface IChart {
  update: (values: number[], labels: string[]) => void;
}
export interface IOptions {
  labels: string[];
  values: number[];
  valuesSteps?: number;
  width: number;
  height: number;
  margin?: number;
  barWidth?: number;
  style?: string;
}

export interface IInternalOptions {
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
    chartArea: IArea;
    labelsArea: IArea;
    valuesStepsArea: IArea;
    valuesArea: IArea;
  };
  valueMapper: (value: number) => number;
}

export interface IArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type IPainterTask = (
  ctx: CanvasRenderingContext2D,
  options: IInternalOptions
) => void;

export interface IPainter {
  paintSteps: IPainterTask;
  paintLabels: IPainterTask;
  paintValues: IPainterTask;
}
