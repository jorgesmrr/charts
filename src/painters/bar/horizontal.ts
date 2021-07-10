import { ChartPainterTask } from "../../models.js";
import { MAX_BAR_WIDTH, DATASETS_GAP_X } from "./constants.js";

const paintSteps: ChartPainterTask = (
  ctx,
  {
    areas: { bottom: valuesStepsArea, plot: plotArea },
    maxValue,
    valueMapperX,
  },
  { gridLines }
) => {
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "black";
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1;

  [...new Array(gridLines + 1)].forEach((_, index) => {
    const value = index * (maxValue / gridLines);
    const x = valueMapperX(value);

    ctx.beginPath();
    ctx.moveTo(x, plotArea.y);
    ctx.lineTo(x, plotArea.y + plotArea.height);
    ctx.stroke();

    ctx.fillText(
      Math.floor(value).toString(),
      x,
      valuesStepsArea.y + valuesStepsArea.height
    );
  });
};

const paintLabels: ChartPainterTask = (
  ctx,
  { areas: { left: labelsArea } },
  { labels }
) => {
  const slotHeight = labelsArea.height / labels.length;

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "black";

  labels.forEach((label, index) => {
    const y = labelsArea.y + index * slotHeight + slotHeight / 2;
    ctx.fillText(label, labelsArea.x, y);
  });
};

const paintValues: ChartPainterTask = (
  ctx,
  { areas: { plot: plotArea }, valueMapperX },
  { labels, datasets }
) => {
  const slotHeight = plotArea.height / labels.length;
  const barHeight = Math.min(
    (slotHeight - DATASETS_GAP_X * 2) / datasets.length,
    MAX_BAR_WIDTH
  );

  ctx.lineWidth = barHeight;

  datasets.forEach((dataset, datasetIndex) => {
    ctx.strokeStyle = dataset.color || "#FF0000";

    dataset.data.forEach((value, index) => {
      const slotCenterY = plotArea.y + slotHeight * index + slotHeight / 2;
      const slotOriginY = slotCenterY - (barHeight * datasets.length) / 2;

      const barY = slotOriginY + barHeight * datasetIndex + barHeight / 2;

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
