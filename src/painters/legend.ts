import { ChartArea } from "../models";

const LABELS_GAP_X = 20;
const LABELS_GAP_Y = 7;
const LABELS_SQUARE_MARGIN_X = 10;

type LabelInfo = { label: string; width: number };
type RowInfo = { width: number; labels: LabelInfo[] };
type RectSizes = { width: number; height: number };

const splitLabelsInRows = (
  ctx: CanvasRenderingContext2D,
  maxRowWidth: number,
  labelRectDimensions: RectSizes,
  labels: string[]
): RowInfo[] => {
  const rows: RowInfo[] = [];

  const labelsDimensions: LabelInfo[] = labels.map((label) => ({
    label,
    width: ctx.measureText(label).width,
  }));

  while (labelsDimensions.length) {
    const row: RowInfo = { width: 0, labels: [] };

    while (
      labelsDimensions.length &&
      row.width + labelsDimensions[0].width < maxRowWidth
    ) {
      row.labels.push(labelsDimensions[0]);
      row.width +=
        labelRectDimensions.width +
        LABELS_SQUARE_MARGIN_X +
        labelsDimensions[0].width +
        LABELS_GAP_X;
      labelsDimensions.splice(0, 1);
    }

    rows.push(row);
  }

  return rows;
};

const paintLabels = (
  ctx: CanvasRenderingContext2D,
  area: ChartArea,
  labelRectDimensions: RectSizes,
  rowHeight: number,
  rows: RowInfo[]
) => {
  ctx.textBaseline = "middle";

  rows.forEach((row, rowIndex) => {
    // calculate x origin coordinate in order to center this row contents
    const unusedRowWidth = area.width - row.width;
    let labelX = area.x + unusedRowWidth / 2;

    row.labels.forEach((labelInfo) => {
      const labelY = area.y + rowHeight * rowIndex;

      ctx.fillRect(
        labelX,
        labelY,
        labelRectDimensions.width,
        labelRectDimensions.height
      );

      // center the y coordinate due to the middle baseline set before
      ctx.fillText(
        labelInfo.label,
        labelX + labelRectDimensions.width + LABELS_SQUARE_MARGIN_X,
        labelY + labelRectDimensions.height / 2
      );

      // increment the origin x coordinate by the sum of this labels content and spacing
      labelX +=
        labelRectDimensions.width +
        LABELS_SQUARE_MARGIN_X +
        labelInfo.width +
        LABELS_GAP_X;
    });
  });
};

export const paintLegendAndGetArea = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  labels: string[]
): ChartArea => {
  const approximateTextHeight = ctx.measureText("M").width;
  const rowHeight = approximateTextHeight + LABELS_GAP_Y;
  const labelRectDimensions = {
    width: approximateTextHeight * 1.5,
    height: approximateTextHeight,
  };

  const rows = splitLabelsInRows(ctx, width * 0.8, labelRectDimensions, labels);

  const area = {
    x,
    y,
    width,
    height: rowHeight * rows.length,
  };

  paintLabels(ctx, area, labelRectDimensions, rowHeight, rows);

  return area;
};
