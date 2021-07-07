import { ChartInternalOptions, ChartOptions } from "./../models";

const MARGIN = 50;
const VALUES_STEPS_AREA_WIDTH = 50;
const LABELS_AREA_HEIGHT = 50;

export const handleOptions: (options: ChartOptions) => ChartInternalOptions = ({
  type,
  data,
  width,
  height,
  gridLines = 3,
}) => {
  const chartArea = {
    x: MARGIN,
    y: MARGIN,
    width: width - 2 * MARGIN,
    height: height - 2 * MARGIN,
  };

  const bottomArea = {
    x: chartArea.x + VALUES_STEPS_AREA_WIDTH,
    y: chartArea.y + chartArea.height - LABELS_AREA_HEIGHT,
    width: chartArea.width - VALUES_STEPS_AREA_WIDTH,
    height: LABELS_AREA_HEIGHT,
  };

  const leftArea = {
    x: chartArea.x,
    y: chartArea.y,
    width: VALUES_STEPS_AREA_WIDTH,
    height: chartArea.height - bottomArea.height,
  };

  const plotArea = {
    x: leftArea.x + leftArea.width,
    y: chartArea.y,
    width: chartArea.width - leftArea.width,
    height: chartArea.height - bottomArea.height,
  };

  const maxValue = data.reduce(
    (previous, current) =>
      current.value > previous ? current.value : previous,
    data[0].value
  );

  const valueMapperX = (value: number) => {
    const valuesRatio = maxValue / plotArea.width;
    return plotArea.x + value / valuesRatio;
  };

  const valueMapperY = (value: number) => {
    const valuesRatio = maxValue / plotArea.height;
    return plotArea.y + plotArea.height - value / valuesRatio;
  };

  return {
    type,
    data,
    width,
    height,
    gridLines,
    maxValue,
    areas: {
      chart: chartArea,
      bottom: bottomArea,
      left: leftArea,
      plot: plotArea,
    },
    valueMapperX,
    valueMapperY,
  };
};
