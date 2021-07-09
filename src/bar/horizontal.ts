import { ChartPainterTask } from "../models";

const MAX_BAR_WIDTH = 15;

const paintSteps: ChartPainterTask = (
  ctx,
  {
    areas: { bottom: valuesStepsArea, plot: plotArea },
    gridLines,
    maxValue,
    valueMapperX,
  }
) => {
  [...new Array(gridLines + 1)].forEach((_, index) => {
    const value = index * (maxValue / gridLines);
    const x = valueMapperX(value);

    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, plotArea.y);
    ctx.lineTo(x, plotArea.y + plotArea.height);
    ctx.stroke();

    ctx.fillText(
      Math.floor(value) + "",
      x,
      valuesStepsArea.y + valuesStepsArea.height
    );
  });
};

const paintLabels: ChartPainterTask = (
  ctx,
  { areas: { left: labelsArea }, labels }
) => {
  const slotHeight = labelsArea.height / labels.length;
  labels.forEach((label, index) => {
    const y = labelsArea.x + index * slotHeight + slotHeight / 2;
    ctx.fillText(label, labelsArea.x, y);
  });
};

const paintValues: ChartPainterTask = (
  ctx,
  { areas: { plot: plotArea }, labels, datasets, valueMapperX }
) => {
  const slotHeight = plotArea.height / labels.length;
  const barHeight = Math.min(slotHeight / datasets.length, MAX_BAR_WIDTH);

  datasets.forEach((dataset, datasetIndex) => {
    dataset.data.forEach((value, index) => {
      const slotCenterY = plotArea.y + slotHeight * index + slotHeight / 2;
      const slotOriginY = slotCenterY - (barHeight * datasets.length) / 2;

      const barY = slotOriginY + barHeight * datasetIndex + barHeight / 2;

      ctx.strokeStyle = "black";
      ctx.lineWidth = barHeight;
      ctx.beginPath();
      ctx.moveTo(plotArea.x, barY);
      ctx.lineTo(valueMapperX(value), barY);
      ctx.stroke();
    });
  });
};

export const horizontalBarPainter = {
  paintSteps,
  paintLabels,
  paintValues,
};
