import {
  Chart,
  paintChart,
  verticalBarPainter,
  horizontalBarPainter,
  ChartPainter,
} from "./../dist/esm/index.js";

let chart: Chart;

const showChart = (painter: ChartPainter) =>
  (chart = paintChart(root, painter, {
    labels,
    values,
    width: 700,
    height: 500,
    style: "border: 1px solid black",
  }));

const root = document.getElementById("chart") as HTMLElement;

const values = [100, 200, 300];
const labels = ["A", "B", "C"];

const valueInputA = document.getElementById(
  "value-input-a"
) as HTMLInputElement;
const valueInputB = document.getElementById(
  "value-input-b"
) as HTMLInputElement;
const valueInputC = document.getElementById(
  "value-input-c"
) as HTMLInputElement;

const horizontalBarsRadio = document.getElementById("horizontal-bars-radio");
const verticalBarsRadio = document.getElementById("vertical-bars-radio");

const incrementBtnA = document.getElementById("increment-btn-a");
const incrementBtnB = document.getElementById("increment-btn-b");
const incrementBtnC = document.getElementById("increment-btn-c");

const decrementBtnA = document.getElementById("decrement-btn-a");
const decrementBtnB = document.getElementById("decrement-btn-b");
const decrementBtnC = document.getElementById("decrement-btn-c");

const getChartTypeChangeHandler =
  (painter: ChartPainter) =>
  ({ target }: Event) => {
    if ((target as HTMLInputElement).checked) {
      showChart(painter);
    }
  };

const getIncrementHandler =
  (index: number, input: HTMLInputElement, increment = 10) =>
  () => {
    values[index] += increment;

    input.value = values[index].toString();
    chart.update(values, labels);
  };

const getValueChangeHandler =
  (index: number) =>
  ({ target }: Event) => {
    values[index] = Number((target as HTMLInputElement).value);
    chart.update(values, labels);
  };

horizontalBarsRadio?.addEventListener(
  "change",
  getChartTypeChangeHandler(horizontalBarPainter)
);
verticalBarsRadio?.addEventListener(
  "change",
  getChartTypeChangeHandler(verticalBarPainter)
);

valueInputA.addEventListener("input", getValueChangeHandler(0));
valueInputB.addEventListener("input", getValueChangeHandler(1));
valueInputC.addEventListener("input", getValueChangeHandler(2));

incrementBtnA?.addEventListener("click", getIncrementHandler(0, valueInputA));
incrementBtnB?.addEventListener("click", getIncrementHandler(1, valueInputB));
incrementBtnC?.addEventListener("click", getIncrementHandler(2, valueInputC));

decrementBtnA?.addEventListener(
  "click",
  getIncrementHandler(0, valueInputA, -10)
);
decrementBtnB?.addEventListener(
  "click",
  getIncrementHandler(1, valueInputB, -10)
);
decrementBtnC?.addEventListener(
  "click",
  getIncrementHandler(2, valueInputC, -10)
);

valueInputA.value = values[0].toString();
valueInputB.value = values[1].toString();
valueInputC.value = values[2].toString();

showChart(verticalBarPainter);
