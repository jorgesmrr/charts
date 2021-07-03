import { horizontalBarPainter } from "../bar/horizontal.js";
import { verticalBarPainter } from "../bar/vertical.js";
import { ChartPainter, ChartOptions, Chart, ChartData } from "../models.js";
import { handleOptions } from "./options.js";

const painterByTypeMap = {
  ["horizontal-bars"]: horizontalBarPainter,
  ["vertical-bars"]: verticalBarPainter,
};

const update = (ctx: CanvasRenderingContext2D, options: ChartOptions) => {
  const painter = painterByTypeMap[options.type];
  const finalOptions = handleOptions(options);

  painter.paintSteps(ctx, finalOptions);
  painter.paintLabels(ctx, finalOptions);
  painter.paintValues(ctx, finalOptions);
};

export const paintChart: (
  rootElement: HTMLElement,
  options: ChartOptions
) => Chart = (rootElement, options) => {
  if (!options) throw Error("You must provide the options!");
  if (!options.data) throw Error("You must provide the data!");
  if (!options.width) throw Error("You must provide the width!");
  if (!options.height) throw Error("You must provide the height!");

  rootElement.innerHTML = `<canvas id="canvas" width="${options.width}" height="${options.height}" style="${options.style}" />`;

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.font = "16px sans-serif";

  update(ctx, options);

  const wrappedUpdate = (data: ChartData[]) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update(ctx, { ...options, data });
  };

  return {
    update: wrappedUpdate,
  };
};
