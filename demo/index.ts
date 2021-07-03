import { Chart, paintChart, ChartType } from "./../dist/esm/index.js";

let chart: Chart;

const root = document.getElementById("chart") as HTMLElement;

const data = [
  { label: "A", value: 100 },
  { label: "B", value: 200 },
  { label: "C", value: 300 },
];

const showChart = (type: ChartType) =>
  (chart = paintChart(root, {
    type,
    data,
    width: 700,
    height: 500,
    style: "border: 1px solid black",
  }));

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
  (type: ChartType) =>
  ({ target }: Event) => {
    if ((target as HTMLInputElement).checked) {
      showChart(type);
    }
  };

const getIncrementHandler =
  (index: number, input: HTMLInputElement, increment = 10) =>
  () => {
    data[index].value += increment;

    input.value = data[index].value.toString();
    chart.update(data);
  };

const getValueChangeHandler =
  (index: number) =>
  ({ target }: Event) => {
    data[index].value = Number((target as HTMLInputElement).value);
    chart.update(data);
  };

horizontalBarsRadio?.addEventListener(
  "change",
  getChartTypeChangeHandler("horizontal-bars")
);
verticalBarsRadio?.addEventListener(
  "change",
  getChartTypeChangeHandler("vertical-bars")
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

valueInputA.value = data[0].value.toString();
valueInputB.value = data[1].value.toString();
valueInputC.value = data[2].value.toString();

showChart("vertical-bars");
