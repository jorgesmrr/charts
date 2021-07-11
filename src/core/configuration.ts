import {
  ChartArea,
  ChartValidatedDataset,
  ChartConfiguration,
  ChartDataset,
} from "../models";

const GRIDLINES_LABELS_AREA_WIDTH = 50;
const DATASETS_LABELS_AREA_HEIGHT = 50;

const findDatasetsMinValue = (datasets: ChartDataset[]) => {
  const findInDataset = (dataset: ChartDataset) =>
    dataset.data.reduce(
      (previous, current) => Math.min(previous, current),
      Infinity
    );

  return datasets.reduce(
    (previous, current) => Math.min(previous, findInDataset(current)),
    Infinity
  ) as number;
};

const findDatasetsMaxValue = (datasets: ChartDataset[]) => {
  const findInDataset = (dataset: ChartDataset) =>
    dataset.data.reduce(
      (previous, current) => Math.max(previous, current),
      -Infinity
    );

  return datasets.reduce(
    (previous, current) => Math.max(previous, findInDataset(current)),
    -Infinity
  );
};

const getValuesDistance = (
  valuesHasSameSigns: boolean,
  min: number,
  max: number
) => {
  return valuesHasSameSigns
    ? Math.max(Math.abs(min), Math.abs(max))
    : Math.abs(max) + Math.abs(min);
};

export const getConfiguration: (
  rootArea: ChartArea,
  datasets: ChartValidatedDataset[]
) => ChartConfiguration = (area, datasets) => {
  const bottomArea = {
    x: area.x + GRIDLINES_LABELS_AREA_WIDTH,
    y: area.y + area.height - DATASETS_LABELS_AREA_HEIGHT,
    width: area.width - GRIDLINES_LABELS_AREA_WIDTH,
    height: DATASETS_LABELS_AREA_HEIGHT,
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

  const minValue = findDatasetsMinValue(datasets);
  const maxValue = findDatasetsMaxValue(datasets);
  const valuesHasSameSigns = maxValue * minValue > 0;
  const valuesDistance = getValuesDistance(
    valuesHasSameSigns,
    minValue,
    maxValue
  );

  const valueMapperX = (value: number) => {
    const valuesRatio = valuesDistance / plotArea.width;
    const baseY = plotArea.x;
    const valueY = value / valuesRatio;
    const translationY = minValue > 0 ? 0 : minValue / valuesRatio;
    return baseY + valueY - translationY;
  };

  const valueMapperY = (value: number) => {
    const valuesRatio = valuesDistance / plotArea.height;
    const baseY = plotArea.y + plotArea.height;
    const valueY = value / valuesRatio;
    const translationY = minValue > 0 ? 0 : minValue / valuesRatio;
    return baseY - valueY + translationY;
  };

  return {
    minValue,
    maxValue,
    valuesDistance,
    valueMapperX,
    valueMapperY,
    areas: {
      chart: area,
      bottom: bottomArea,
      left: leftArea,
      plot: plotArea,
    },
  };
};
