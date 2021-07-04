import { ChartPainterTask } from "../models";

const paintSteps: ChartPainterTask = (
  ctx,
  {
    areas: { left: valuesStepsArea, values: valuesArea },
    gridLines,
    maxValue,
    valueMapperY,
  }
) => {
  [...new Array(gridLines + 1)].forEach((_, index) => {
    const value = index * (maxValue / gridLines);
    const y = valueMapperY(value);

    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(valuesArea.x, y);
    ctx.lineTo(valuesArea.x + valuesArea.width, y);
    ctx.stroke();

    ctx.fillText(Math.floor(value) + "", valuesStepsArea.x, y);
  });
};

const paintLabels: ChartPainterTask = (
  ctx,
  { areas: { bottom: labelsArea }, data }
) => {
  const slotWidth = labelsArea.width / data.length;

  data
    .map((record) => record.label)
    .forEach((label, index) => {
      const textDimensions = ctx.measureText(label);

      const originX = labelsArea.x + index * slotWidth + slotWidth / 2;
      const centeredX = originX - textDimensions.width / 2;

      ctx.fillText(label, centeredX, labelsArea.y + labelsArea.height);
    });
};

const paintValues: ChartPainterTask = (
  ctx,
  { areas: { values: valuesArea }, data, valueMapperY }
) => {
  const slotWidth = valuesArea.width / data.length;

  data
    .map((record) => record.value)
    .forEach((value, index) => {
      const x = valuesArea.x + index * slotWidth + slotWidth / 2;

      ctx.strokeStyle = "black";
      ctx.lineWidth = 15;
      ctx.beginPath();
      ctx.moveTo(x, valueMapperY(value));
      ctx.lineTo(x, valuesArea.y + valuesArea.height);
      ctx.stroke();
    });
};

export const verticalBarPainter = {
  paintSteps,
  paintLabels,
  paintValues,
};
