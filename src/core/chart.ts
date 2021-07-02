import { IPainter, IOptions, IChart } from "../models.js";
import { handleOptions } from "./options.js";

const update = (
  painter: IPainter,
  ctx: CanvasRenderingContext2D,
  options: IOptions
) => {
  const finalOptions = handleOptions(options);
  painter.paintSteps(ctx, finalOptions);
  painter.paintLabels(ctx, finalOptions);
  painter.paintValues(ctx, finalOptions);
};

export const paintChart: (
  rootElement: HTMLElement,
  painter: IPainter,
  options: IOptions
) => IChart = (rootElement, painter, options) => {
  if (!options) throw Error("You must provide the options!");
  if (!options.labels) throw Error("You must provide the labels!");
  if (!options.values) throw Error("You must provide the values!");
  if (!options.width) throw Error("You must provide the width!");
  if (!options.height) throw Error("You must provide the height!");

  rootElement.innerHTML = `<canvas id="canvas" width="${options.width}" height="${options.height}" style="${options.style}" />`;

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.font = "16px sans-serif";

  update(painter, ctx, options);

  const wrappedUpdate = (values: number[], labels: string[]) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update(painter, ctx, { ...options, values, labels });
  };

  return {
    update: wrappedUpdate,
  };
};
