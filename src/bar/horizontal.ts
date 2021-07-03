import { ChartPainterTask } from "../models";

const paintSteps: ChartPainterTask = (
  ctx,
  {
    areas: { bottom: valuesStepsArea, values: valuesArea },
    valuesSteps,
    maxValue,
    valueMapperX,
  }
) => {
  [...new Array(valuesSteps + 1)].forEach((_, index) => {
    const value = index * (maxValue / valuesSteps);
    const x = valueMapperX(value);

    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, valuesArea.y);
    ctx.lineTo(x, valuesArea.y + valuesArea.height);
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
  { areas: { values: valuesArea }, data, valueMapperX }
) => {
  const slotHeight = valuesArea.height / data.length;

  data
    .map((record) => record.value)
    .forEach((value, index) => {
      const y = valuesArea.y + index * slotHeight + slotHeight / 2;

      ctx.strokeStyle = "black";
      ctx.lineWidth = 15;
      ctx.beginPath();
      ctx.moveTo(valuesArea.x, y);
      ctx.lineTo(valueMapperX(value), y);
      ctx.stroke();
    });
};

export const horizontalBarPainter = {
  paintSteps,
  paintLabels,
  paintValues,
};
