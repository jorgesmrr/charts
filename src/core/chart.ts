import { horizontalBarPainter } from "../painters/bar/horizontal.js";
import { verticalBarPainter } from "../painters/bar/vertical.js";
import { ChartOptions, Chart, ChartDataset, ChartArea } from "../models.js";
import { paintLegendAndGetArea } from "../painters/legend.js";
import { paintTitleAndGetArea } from "../painters/title.js";
import { handleOptions } from "./options.js";

const painterByTypeMap = {
  ["horizontal-bars"]: horizontalBarPainter,
  ["vertical-bars"]: verticalBarPainter,
};

const update = (ctx: CanvasRenderingContext2D, options: ChartOptions) => {
  const chartArea = {
    x: 0,
    y: 0,
    width: options.width,
    height: options.height,
  };

  const titleArea = paintTitleAndGetArea(ctx, chartArea, options.title);
  const datasetsLabelsArea = paintLegendAndGetArea(
    ctx,
    chartArea.x,
    chartArea.y + titleArea.height,
    chartArea.width,
    options.datasets.map((dataset) => dataset.label)
  );

  const remainingArea = {
    x: chartArea.x,
    y: datasetsLabelsArea.y + datasetsLabelsArea.height,
    width: chartArea.width,
    height: chartArea.height - (titleArea.height + datasetsLabelsArea.height),
  };

  const painter = painterByTypeMap[options.type];
  const finalOptions = handleOptions(remainingArea, options);

  painter.paintSteps(ctx, finalOptions);
  painter.paintLabels(ctx, finalOptions);
  painter.paintValues(ctx, finalOptions);
};

export const paintChart: (
  rootElement: HTMLElement,
  options: ChartOptions
) => Chart = (rootElement, options) => {
  if (!options) throw Error("You must provide the options!");
  if (!options.datasets) throw Error("You must provide the datasets!");
  if (!options.width) throw Error("You must provide the width!");
  if (!options.height) throw Error("You must provide the height!");

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
