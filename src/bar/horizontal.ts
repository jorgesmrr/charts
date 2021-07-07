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
  { areas: { left: labelsArea }, data }
) => {
  const slotHeight = labelsArea.height / data.length;

  data
    .map((record) => record.label)
    .forEach((label, index) => {
      const y = labelsArea.x + index * slotHeight + slotHeight / 2;

      ctx.fillText(label, labelsArea.x, y);
    });
};

const paintValues: ChartPainterTask = (
  ctx,
  { areas: { plot: plotArea }, data, valueMapperX }
) => {
  const slotHeight = plotArea.height / data.length;

  data
    .map((record) => record.value)
    .forEach((value, index) => {
      const y = plotArea.y + index * slotHeight + slotHeight / 2;

      ctx.strokeStyle = "black";
      ctx.lineWidth = Math.min(slotHeight - 2, MAX_BAR_WIDTH);
      ctx.beginPath();
      ctx.moveTo(plotArea.x, y);
      ctx.lineTo(valueMapperX(value), y);
      ctx.stroke();
    });
};

export const horizontalBarPainter = {
  paintSteps,
  paintLabels,
  paintValues,
};
