import { ChartArea } from "../models";

export const paintTitleAndGetArea = (
  ctx: CanvasRenderingContext2D,
  area: ChartArea,
  title: string
): ChartArea => {
  const titleArea = {
    x: area.x,
    y: area.y,
    width: area.width,
    height: 50,
  };

  const textDimensions = ctx.measureText(title);
  const originX = titleArea.x + titleArea.width / 2;
  const centeredX = originX - textDimensions.width / 2;

  ctx.textBaseline = "middle";
  ctx.fillStyle = "black";
  ctx.fillText(title, centeredX, titleArea.y + titleArea.height / 2);

  return titleArea;
};
