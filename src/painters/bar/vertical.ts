import { ChartPainterTask } from "../../models.js";
import { DATASETS_GAP_X, MAX_BAR_WIDTH } from "./constants.js";

const paintSteps: ChartPainterTask = (
  ctx,
  {
    areas: { left: valuesStepsArea, plot: valuesArea },
    minValue,
    valuesDistance,
    valueMapperY,
  },
  { gridLines }
) => {
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "black";
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1;

  [...new Array(gridLines + 1)].forEach((_, index) => {
    const step = index * (valuesDistance / gridLines);

    const valueTranslation = minValue > 0 ? 0 : minValue;
    const value = step + valueTranslation;
    const y = valueMapperY(value);

    ctx.beginPath();
    ctx.moveTo(valuesArea.x, y);
    ctx.lineTo(valuesArea.x + valuesArea.width, y);
    ctx.stroke();

    ctx.fillText(Math.floor(value).toString(), valuesStepsArea.x, y);
  });
};

const paintLabels: ChartPainterTask = (
  ctx,
  { areas: { bottom: labelsArea } },
  { labels }
) => {
  const slotWidth = labelsArea.width / labels.length;

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "black";

  labels.forEach((label, index) => {
    const textDimensions = ctx.measureText(label);
    const originX = labelsArea.x + index * slotWidth + slotWidth / 2;
    const centeredX = originX - textDimensions.width / 2;
    ctx.fillText(label, centeredX, labelsArea.y + labelsArea.height);
  });
};

const paintValues: ChartPainterTask = (
  ctx,
  { areas: { plot: plotArea }, valueMapperY },
  { labels, datasets }
) => {
  const slotWidth = plotArea.width / labels.length;
  const barWidth = Math.min(
    (slotWidth - DATASETS_GAP_X * 2) / datasets.length,
    MAX_BAR_WIDTH
  );

  ctx.lineWidth = barWidth;

  datasets.forEach((dataset, datasetIndex) => {
    ctx.strokeStyle = dataset.color;

    dataset.data.forEach((value, index) => {
      const slotCenterX = plotArea.x + slotWidth * index + slotWidth / 2;
      const slotOriginX = slotCenterX - (barWidth * datasets.length) / 2;

      const barX = slotOriginX + barWidth * datasetIndex + barWidth / 2;

      ctx.beginPath();
      ctx.moveTo(barX, valueMapperY(value));
      ctx.lineTo(barX, valueMapperY(0));
      ctx.stroke();
    });
  });
};

export const verticalBarPainter = {
  paintSteps,
  paintLabels,
  paintValues,
};
