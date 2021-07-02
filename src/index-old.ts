interface IChartOptions {
  labels: string[];
  values: number[];
  valuesSteps?: number;
  width?: number;
  height?: number;
  margin?: number;
  barWidth?: number;
  style?: string;
}

const chart: (rootElement: HTMLElement, options: IChartOptions) => void = (
  rootElement,
  {
    labels,
    values,
    valuesSteps = 3,
    width = 500,
    height = 500,
    margin = 50,
    barWidth = 20,
    style = "",
  }
) => {
  if (!rootElement) throw Error("You must provide the root element!");
  if (!labels) throw Error("You must provide the labels!");
  if (!values) throw Error("You must provide the values!");

  rootElement.innerHTML = `<canvas id="canvas" width="${width}" height="${height}" style="${style}" />`;

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.font = "16px sans-serif";

  draw();

  function draw() {
    const valuesStepsAreaWidth = 50;
    const labelsAreaHeight = 50;

    const chartArea = {
      x: margin,
      y: margin,
      width: width - 2 * margin,
      height: height - 2 * margin,
    };

    const labelsArea = {
      x: chartArea.x + valuesStepsAreaWidth,
      y: chartArea.y + chartArea.height - labelsAreaHeight,
      width: chartArea.width - valuesStepsAreaWidth,
      height: labelsAreaHeight,
    };

    const valuesStepsArea = {
      x: chartArea.x,
      y: chartArea.y,
      width: valuesStepsAreaWidth,
      height: chartArea.height - labelsArea.height,
    };

    const valuesArea = {
      x: valuesStepsArea.x + valuesStepsArea.width,
      y: chartArea.y,
      width: chartArea.width - valuesStepsArea.width,
      height: chartArea.height - labelsArea.height,
    };

    const labelWidth = labelsArea.width / labels.length;

    [...new Array(valuesSteps + 1)].forEach((_, index) => {
      drawStep(index);
      drawStepLabel(index);
    });

    labels.forEach((label, index) => drawLabel(label, index));
    values.forEach((value, index) => drawBar(value, index));

    const maxValue = values.reduce(
      (current, acc) => (current > acc ? current : acc),
      values[0]
    );

    function valueToY(value: number) {
      const valuesRatio = maxValue / valuesArea.height;
      return valuesArea.y + valuesArea.height - value / valuesRatio;
    }

    function drawLabel(label: string, index: number) {
      const textDimensions = ctx.measureText(label);

      const originX = labelsArea.x + index * labelWidth + labelWidth / 2;
      const centeredX = originX - textDimensions.width / 2;

      ctx.fillText(label, centeredX, labelsArea.y + labelsArea.height);
    }

    function drawStep(index: number) {
      const y = valueToY((index * maxValue) / valuesSteps);

      ctx.strokeStyle = "grey";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(valuesArea.x, y);
      ctx.lineTo(valuesArea.x + valuesArea.width, y);
      ctx.stroke();
    }

    function drawStepLabel(index: number) {
      const value = (index * maxValue) / valuesSteps;
      ctx.fillText(value + "", valuesStepsArea.x, valueToY(value));
    }

    function drawBar(value: number, index: number) {
      const originX = valuesArea.x + index * labelWidth + labelWidth / 2;

      ctx.strokeStyle = "black";
      ctx.lineWidth = barWidth;
      ctx.beginPath();
      ctx.moveTo(originX, valueToY(value));
      ctx.lineTo(originX, valuesArea.y + valuesArea.height);
      ctx.stroke();
    }
  }
};

export default chart;
