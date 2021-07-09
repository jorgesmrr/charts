import { ChartPainterTask } from "../../models";

const MAX_BAR_WIDTH = 15;

const paintSteps: ChartPainterTask = (
  ctx,
  {
    areas: { left: valuesStepsArea, plot: valuesArea },
    gridLines,
    maxValue,
    valueMapperY,
  }
) => {
  ctx.textBaseline = "alphabetic";
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1;

  [...new Array(gridLines + 1)].forEach((_, index) => {
    const value = index * (maxValue / gridLines);
    const y = valueMapperY(value);

    ctx.beginPath();
    ctx.moveTo(valuesArea.x, y);
    ctx.lineTo(valuesArea.x + valuesArea.width, y);
    ctx.stroke();

    ctx.fillText(Math.floor(value) + "", valuesStepsArea.x, y);
  });
};

const paintLabels: ChartPainterTask = (
  ctx,
  { areas: { bottom: labelsArea }, labels }
) => {
  const slotWidth = labelsArea.width / labels.length;

  ctx.textBaseline = "alphabetic";

  labels.forEach((label, index) => {
    const textDimensions = ctx.measureText(label);
    const originX = labelsArea.x + index * slotWidth + slotWidth / 2;
    const centeredX = originX - textDimensions.width / 2;
    ctx.fillText(label, centeredX, labelsArea.y + labelsArea.height);
  });
};

const paintValues: ChartPainterTask = (
  ctx,
  { areas: { plot: plotArea }, labels, datasets, valueMapperY }
) => {
  const slotWidth = plotArea.width / labels.length;
  const barWidth = Math.min(slotWidth / datasets.length, MAX_BAR_WIDTH);

  ctx.strokeStyle = "black";
  ctx.lineWidth = barWidth;

  datasets.forEach((dataset, datasetIndex) => {
    dataset.data.forEach((value, index) => {
      const slotCenterX = plotArea.x + slotWidth * index + slotWidth / 2;
      const slotOriginX = slotCenterX - (barWidth * datasets.length) / 2;

      const barX = slotOriginX + barWidth * datasetIndex + barWidth / 2;

      ctx.beginPath();
      ctx.moveTo(barX, valueMapperY(value));
      ctx.lineTo(barX, plotArea.y + plotArea.height);
      ctx.stroke();
    });
  });
};

export const verticalBarPainter = {
  paintSteps,
  paintLabels,
  paintValues,
};
