import {
  ChartArea,
  ChartDataset,
  ChartInternalOptions,
  ChartOptions,
} from "./../models";

const GRIDLINES_LABELS_AREA_WIDTH = 50;
const SERIES_LABELS_AREA_HEIGHT = 50;

export const handleOptions: (
  area: ChartArea,
  options: ChartOptions
) => ChartInternalOptions = (
  area,
  { type, labels, datasets, gridLines = 3 }
) => {
  const bottomArea = {
    x: area.x + GRIDLINES_LABELS_AREA_WIDTH,
    y: area.y + area.height - SERIES_LABELS_AREA_HEIGHT,
    width: area.width - GRIDLINES_LABELS_AREA_WIDTH,
    height: SERIES_LABELS_AREA_HEIGHT,
  };

  const leftArea = {
    x: area.x,
    y: area.y,
    width: GRIDLINES_LABELS_AREA_WIDTH,
    height: area.height - bottomArea.height,
  };

  const plotArea = {
    x: leftArea.x + leftArea.width,
    y: area.y,
    width: area.width - leftArea.width,
    height: area.height - bottomArea.height,
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
    gridLines,
    maxValue,
    areas: {
      chart: area,
      bottom: bottomArea,
      left: leftArea,
      plot: plotArea,
    },
    valueMapperX,
    valueMapperY,
  };
};
