import { ChartInternalOptions, ChartOptions } from "./../models";

const VALUES_STEPS_AREA_WIDTH = 50;
const LABELS_AREA_HEIGHT = 50;

export const handleOptions: (options: ChartOptions) => ChartInternalOptions = ({
  data,
  valuesSteps = 3,
  width,
  height,
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

  const bottom = {
    x: chartArea.x + VALUES_STEPS_AREA_WIDTH,
    y: chartArea.y + chartArea.height - LABELS_AREA_HEIGHT,
    width: chartArea.width - VALUES_STEPS_AREA_WIDTH,
    height: LABELS_AREA_HEIGHT,
  };

  const left = {
    x: chartArea.x,
    y: chartArea.y,
    width: VALUES_STEPS_AREA_WIDTH,
    height: chartArea.height - bottom.height,
  };

  const valuesArea = {
    x: left.x + left.width,
    y: chartArea.y,
    width: chartArea.width - left.width,
    height: chartArea.height - bottom.height,
  };

  const maxValue = data.reduce(
    (previous, current) =>
      current.value > previous ? current.value : previous,
    data[0].value
  );

  const valueMapperX = (value: number) => {
    const valuesRatio = maxValue / valuesArea.width;
    return valuesArea.x + value / valuesRatio;
  };

  const valueMapperY = (value: number) => {
    const valuesRatio = maxValue / valuesArea.height;
    return valuesArea.y + valuesArea.height - value / valuesRatio;
  };

  return {
    data,
    maxValue,
    valuesSteps,
    width,
    height,
    margin,
    barWidth,
    style,
    areas: { chart: chartArea, bottom, left, values: valuesArea },
    valueMapperX,
    valueMapperY,
  };
};
