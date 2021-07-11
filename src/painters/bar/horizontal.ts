import { ChartPainterTask } from "../../models.js";
import { MAX_BAR_WIDTH, DATASETS_GAP_X } from "./constants.js";

const paintSteps: ChartPainterTask = (
  ctx,
  {
    areas: { bottom: valuesStepsArea, plot: plotArea },
    minValue,
    maxValue,
    valueMapperX,
  },
  { gridLinesGap }
) => {
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "black";
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1;

  const paintGridLine = (distanceFromZero: number) => {
    const x = valueMapperX(distanceFromZero);

    ctx.beginPath();
    ctx.moveTo(x, plotArea.y);
    ctx.lineTo(x, plotArea.y + plotArea.height);
    ctx.stroke();

    const valueLabel = Math.floor(distanceFromZero).toString();
    const labelWidth = ctx.measureText(valueLabel).width;
    ctx.fillText(
      valueLabel,
      x - labelWidth / 2,
      valuesStepsArea.y + valuesStepsArea.height
    );
  };

  let distanceFromZero = 0;
  do {
    paintGridLine(distanceFromZero);
    distanceFromZero += gridLinesGap;
  } while (distanceFromZero - gridLinesGap <= maxValue);

  distanceFromZero = -gridLinesGap;
  while (distanceFromZero + gridLinesGap >= minValue) {
    paintGridLine(distanceFromZero);
    distanceFromZero -= gridLinesGap;
  }
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
      ctx.moveTo(valueMapperX(0), barY);
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
