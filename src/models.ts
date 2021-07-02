export interface IChartOptions {
  labels: string[];
  values: number[];
  valuesSteps?: number;
  width?: number;
  height?: number;
  margin?: number;
  barWidth?: number;
  style?: string;
}

export interface IChartInternalOptions {
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
    chartArea: IChartArea;
    labelsArea: IChartArea;
    valuesStepsArea: IChartArea;
    valuesArea: IChartArea;
  };
  valueMapper: (value: number) => number;
}

export interface IChartArea {
  x: number;
  y: number;
  width: number;
  height: number;
}
