import { IChartInternalOptions } from "./models.js";

type Drawer = (
  ctx: CanvasRenderingContext2D,
  options: IChartInternalOptions
) => void;

const drawSteps: Drawer = (
  ctx,
  { areas: { valuesStepsArea, valuesArea }, valuesSteps, maxValue, valueMapper }
) => {
  [...new Array(valuesSteps + 1)].forEach((_, index) => {
    const value = index * (maxValue / valuesSteps);
    const y = valueMapper(value);

    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(valuesArea.x, y);
    ctx.lineTo(valuesArea.x + valuesArea.width, y);
    ctx.stroke();

    ctx.fillText(value + "", valuesStepsArea.x, y);
  });
};

const drawLabels: Drawer = (ctx, { areas: { labelsArea }, labels }) => {
  const slotWidth = labelsArea.width / labels.length;

  labels.forEach((label, index) => {
    const textDimensions = ctx.measureText(label);

    const originX = labelsArea.x + index * slotWidth + slotWidth / 2;
    const centeredX = originX - textDimensions.width / 2;

    ctx.fillText(label, centeredX, labelsArea.y + labelsArea.height);
  });
};

const drawBars: Drawer = (
  ctx,
  { areas: { valuesArea }, values, valueMapper }
) => {
  const slotWidth = valuesArea.width / values.length;

  values.forEach((value, index) => {
    const x = valuesArea.x + index * slotWidth + slotWidth / 2;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.moveTo(x, valueMapper(value));
    ctx.lineTo(x, valuesArea.y + valuesArea.height);
    ctx.stroke();
  });
};

export const draw: (
  rootElement: HTMLElement,
  options: IChartInternalOptions
) => void = (rootElement, options) => {
  rootElement.innerHTML = `<canvas id="canvas" width="${options.width}" height="${options.height}" style="${options.style}" />`;

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.font = "16px sans-serif";

  drawSteps(ctx, options);
  drawLabels(ctx, options);
  drawBars(ctx, options);
};
