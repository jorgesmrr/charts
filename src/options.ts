import { IChartInternalOptions, IChartOptions } from "./models";

const VALUES_STEPS_AREA_WIDTH = 50;
const LABELS_AREA_HEIGHT = 50;

export const setupOptions: (options: IChartOptions) => IChartInternalOptions =
  ({
    labels,
    values,
    valuesSteps = 3,
    width = 500,
    height = 500,
    margin = 50,
    barWidth = 20,
    style = "",
  }) => {
    const chartArea = {
      x: margin,
      y: margin,
      width: width - 2 * margin,
      height: height - 2 * margin,
    };

    const labelsArea = {
      x: chartArea.x + VALUES_STEPS_AREA_WIDTH,
      y: chartArea.y + chartArea.height - LABELS_AREA_HEIGHT,
      width: chartArea.width - VALUES_STEPS_AREA_WIDTH,
      height: LABELS_AREA_HEIGHT,
    };

    const valuesStepsArea = {
      x: chartArea.x,
      y: chartArea.y,
      width: VALUES_STEPS_AREA_WIDTH,
      height: chartArea.height - labelsArea.height,
    };

    const valuesArea = {
      x: valuesStepsArea.x + valuesStepsArea.width,
      y: chartArea.y,
      width: chartArea.width - valuesStepsArea.width,
      height: chartArea.height - labelsArea.height,
    };

    const maxValue = values.reduce(
      (current, acc) => (current > acc ? current : acc),
      values[0]
    );

    const valueMapper = (value: number) => {
      const valuesRatio = maxValue / valuesArea.height;
      return valuesArea.y + valuesArea.height - value / valuesRatio;
    };

    return {
      labels,
      values,
      maxValue,
      valuesSteps,
      width,
      height,
      margin,
      barWidth,
      style,
      areas: { chartArea, labelsArea, valuesStepsArea, valuesArea },
      valueMapper,
    };
  };
