import { horizontalBarPainter } from "../painters/bar/horizontal.js";
import { verticalBarPainter } from "../painters/bar/vertical.js";
import { ChartOptions, Chart, ChartDataset } from "../models.js";
import { paintLegendAndGetArea } from "../painters/legend.js";
import { paintTitleAndGetArea } from "../painters/title.js";
import { validateOptions } from "./options.js";
import { getConfiguration } from "./configuration.js";

const painterByTypeMap = {
  ["horizontal-bars"]: horizontalBarPainter,
  ["vertical-bars"]: verticalBarPainter,
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
