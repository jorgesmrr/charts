import { Chart, paintChart, ChartType } from "./../dist/esm/index.js";
// TODO import dataForm from "./values-form.js";

let chart: Chart;

const root = document.getElementById("chart") as HTMLElement;

const horizontalBarsRadio = document.getElementById("horizontal-bars-radio");
const verticalBarsRadio = document.getElementById("vertical-bars-radio");

// TODO const valuesForm = document.getElementById("values-container") as HTMLElement;

// TODO const addDataButton = document.getElementById("add-data-btn");

const datasets = ["A", "B", "C", "D", "E"].map((label, index, { length }) => ({
  label,
  data: [
    (100 * index * 1) / length,
    (200 * index * 1) / length,
    (300 * index * 1) / length,
  ],
}));

const showChart = (type: ChartType) =>
  (chart = paintChart(root, {
    type,
    title: "Chart",
    labels: ["1", "2", "3"],
    datasets,
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

// TODO data.forEach((record) =>
//   dataForm(valuesForm, record, () => chart.update(datasets))
// );

// TODO addDataButton?.addEventListener("click", () => {
//   const label = String.fromCharCode(
//     data[data.length - 1].label.charCodeAt(0) + 1
//   );

//   const record = { label: `${label}:`, value: 150 };
//   data.push(record);

//   dataForm(valuesForm, record, () => chart.update(data));

//   chart.update(data);
// });

showChart("vertical-bars");
