import { horizontalBarPainter } from "../painters/bar/horizontal.js";
import { verticalBarPainter } from "../painters/bar/vertical.js";
import {
  ChartOptions,
  Chart,
  ChartDataset,
  ChartArea,
  ChartValidatedDataset,
  ChartConfiguration,
} from "../models.js";
import { paintLegendAndGetArea } from "../painters/legend.js";
import { paintTitleAndGetArea } from "../painters/title.js";
import { validateOptions } from "./options.js";

const GRIDLINES_LABELS_AREA_WIDTH = 50;
const DATASETS_LABELS_AREA_HEIGHT = 50;

const painterByTypeMap = {
  ["horizontal-bars"]: horizontalBarPainter,
  ["vertical-bars"]: verticalBarPainter,
};

const getConfiguration: (
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

const update = (ctx: CanvasRenderingContext2D, options: ChartOptions) => {
  const validatedOptions = validateOptions(options);

  const chartArea = {
    x: 0,
    y: 0,
    width: validatedOptions.width,
    height: validatedOptions.height,
  };

  const titleArea = paintTitleAndGetArea(
    ctx,
    chartArea,
    validatedOptions.title
  );
  const datasetsLabelsArea = paintLegendAndGetArea(
    ctx,
    chartArea.x,
    chartArea.y + titleArea.height,
    chartArea.width,
    validatedOptions.datasets
  );

  const remainingArea = {
    x: chartArea.x,
    y: datasetsLabelsArea.y + datasetsLabelsArea.height,
    width: chartArea.width,
    height: chartArea.height - (titleArea.height + datasetsLabelsArea.height),
  };

  const configuration = getConfiguration(
    remainingArea,
    validatedOptions.datasets
  );

  const painter = painterByTypeMap[validatedOptions.type];
  painter.paintSteps(ctx, configuration, validatedOptions);
  painter.paintLabels(ctx, configuration, validatedOptions);
  painter.paintValues(ctx, configuration, validatedOptions);
};

export const paintChart: (
  rootElement: HTMLElement,
  options: ChartOptions
) => Chart = (rootElement, options) => {
  rootElement.innerHTML = `<canvas id="canvas" width="${options.width}" height="${options.height}" />`;

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.font = "16px sans-serif";

  update(ctx, options);

  const wrappedUpdate = (datasets: ChartDataset[]) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update(ctx, { ...options, datasets });
  };

  return {
    update: wrappedUpdate,
  };
};
