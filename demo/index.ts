import { Chart, paintChart, ChartType } from "./../dist/esm/index.js";
import dataForm from "./values-form.js";

let chart: Chart;

const root = document.getElementById("chart") as HTMLElement;

const horizontalBarsRadio = document.getElementById("horizontal-bars-radio");
const verticalBarsRadio = document.getElementById("vertical-bars-radio");

const valuesForm = document.getElementById("values-container") as HTMLElement;

const addDataButton = document.getElementById("add-data-btn");

const data = [
  { label: "A:", value: 100 },
  { label: "B:", value: 200 },
  { label: "C:", value: 300 },
];

const showChart = (type: ChartType) =>
  (chart = paintChart(root, {
    type,
    data,
    width: 700,
    height: 500,
  }));

const getChartTypeChangeHandler =
  (type: ChartType) =>
  ({ target }: Event) => {
    if ((target as HTMLInputElement).checked) {
      showChart(type);
    }
  };

horizontalBarsRadio?.addEventListener(
  "change",
  getChartTypeChangeHandler("horizontal-bars")
);
verticalBarsRadio?.addEventListener(
  "change",
  getChartTypeChangeHandler("vertical-bars")
);

data.forEach((record) =>
  dataForm(valuesForm, record, () => chart.update(data))
);

addDataButton?.addEventListener("click", () => {
  const label = String.fromCharCode(
    data[data.length - 1].label.charCodeAt(0) + 1
  );

  const record = { label: `${label}:`, value: 150 };
  data.push(record);

  dataForm(valuesForm, record, () => chart.update(data));

  chart.update(data);
});

showChart("vertical-bars");
