import { ChartArea, ChartValidatedDataset } from "../models";

const LABEL_GAP_X = 20;
const LABEL_GAP_Y = 7;
const LABEL_SQUARE_MARGIN_X = 10;
const LEGEND_BOTTOM_GAP = 20;

type LabelInfo = { label: string; color: string; width: number };
type RowInfo = { width: number; labels: LabelInfo[] };
type RectSizes = { width: number; height: number };

const splitDatasetsInRows = (
  ctx: CanvasRenderingContext2D,
  maxRowWidth: number,
  labelRectDimensions: RectSizes,
  datasets: ChartValidatedDataset[]
): RowInfo[] => {
  const rows: RowInfo[] = [];

  const datasetsWithDimensions: LabelInfo[] = datasets.map(
    ({ label, color }) => ({
      label,
      color,
      width: ctx.measureText(label).width,
    })
  );

  while (datasetsWithDimensions.length) {
    const row: RowInfo = { width: 0, labels: [] };

    while (
      datasetsWithDimensions.length &&
      row.width + datasetsWithDimensions[0].width < maxRowWidth
    ) {
      row.labels.push(datasetsWithDimensions[0]);
      row.width +=
        labelRectDimensions.width +
        LABEL_SQUARE_MARGIN_X +
        datasetsWithDimensions[0].width +
        LABEL_GAP_X;
      datasetsWithDimensions.splice(0, 1);
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

    row.labels.forEach((label) => {
      const labelY = area.y + rowHeight * rowIndex;

      ctx.fillStyle = label.color;
      ctx.fillRect(
        labelX,
        labelY,
        labelRectDimensions.width,
        labelRectDimensions.height
      );

      // center the y coordinate due to the middle baseline set before
      ctx.fillStyle = "black";
      ctx.fillText(
        label.label,
        labelX + labelRectDimensions.width + LABEL_SQUARE_MARGIN_X,
        labelY + labelRectDimensions.height / 2
      );

      // increment the origin x coordinate by the sum of this labels content and spacing
      labelX +=
        labelRectDimensions.width +
        LABEL_SQUARE_MARGIN_X +
        label.width +
        LABEL_GAP_X;
    });
  });
};

export const paintLegendAndGetArea = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  datasets: ChartValidatedDataset[]
): ChartArea => {
  const approximateTextHeight = ctx.measureText("M").width;
  const rowHeight = approximateTextHeight + LABEL_GAP_Y;
  const labelRectDimensions = {
    width: approximateTextHeight * 1.5,
    height: approximateTextHeight,
  };

  const rows = splitDatasetsInRows(
    ctx,
    width * 0.8,
    labelRectDimensions,
    datasets
  );

  const area = {
    x,
    y,
    width,
    height: rowHeight * rows.length + LEGEND_BOTTOM_GAP,
  };

  paintLabels(ctx, area, labelRectDimensions, rowHeight, rows);

  return area;
};
