import { ChartDataset, ChartInternalOptions, ChartOptions } from "./../models";

const MARGIN = 50;
const VALUES_STEPS_AREA_WIDTH = 50;
const LABELS_AREA_HEIGHT = 50;

export const handleOptions: (options: ChartOptions) => ChartInternalOptions = ({
  type,
  labels,
  datasets,
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

  const findDatasetMaxValue = (dataset: ChartDataset) =>
    dataset.data.reduce(
      (previous, current) => (current > previous ? current : previous),
      0
    );

  const maxValue = datasets.reduce((previous, current) => {
    const currentMaxValue = findDatasetMaxValue(current);
    return currentMaxValue > previous ? currentMaxValue : previous;
  }, 0);

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
    labels,
    datasets,
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
