import { Chart, paintChart, ChartType } from "./lib/index.js";

let chart: Chart;

const root = document.getElementById("chart") as HTMLElement;

const horizontalBarsRadio = document.getElementById("horizontal-bars-radio");
const verticalBarsRadio = document.getElementById("vertical-bars-radio");

const addDataButton = document.getElementById("add-data-btn");
const removeDataButton = document.getElementById("remove-data-btn");

const palette = ["#1d3461", "#1f487e", "#376996", "#6290c8", "#829cbc"];

const getRandomValue = () => {
  return Math.floor(Math.random() * 1000 - 500);
};

const datasets = [...new Array(5)].map((_, index) => ({
  label: String.fromCharCode(65 + index),
  color: palette[index % palette.length],
  values: [getRandomValue(), getRandomValue(), getRandomValue()],
}));

const showChart = (type: ChartType) =>
  (chart = paintChart(root, {
    type,
    title: "Chart",
    data: {
      labels: ["1", "2", "3"],
      datasets,
    },
    width: 700,
    height: 500,
    gridLinesDistance: 200,
  }));

const getChartTypeChangeHandler =
  (type: ChartType) =>
  ({ target }: Event) => {
    if ((target as HTMLInputElement).checked) {
      showChart(type);
    }
  };

const getNewLabel = () => {
  if (datasets.length === 0) return "A";

  const previous = datasets[datasets.length - 1].label;

  if (previous.split("").every((letter) => letter === "Z")) {
    return [...new Array(previous.length + 1)].map(() => "A").join("");
  } else {
    let nonZLetterIndex = previous.length - 1;
    while (previous[nonZLetterIndex] === "Z") {
      nonZLetterIndex--;
    }

    const newLetter = String.fromCharCode(
      previous.charCodeAt(nonZLetterIndex) + 1
    );
    let label = `${previous.substring(0, nonZLetterIndex)}${newLetter}`;

    if (label.length < previous.length) {
      label += [...new Array(previous.length - (nonZLetterIndex + 1))]
        .map(() => "A")
        .join("");
    }

    return label;
  }
};

const addDataset = () => {
  datasets.push({
    label: getNewLabel(),
    color: palette[datasets.length % palette.length],
    values: [getRandomValue(), getRandomValue(), getRandomValue()],
  });
  chart.update(datasets);
};

const removeDataset = () => {
  datasets.pop();
  chart.update(datasets);
};

horizontalBarsRadio?.addEventListener(
  "change",
  getChartTypeChangeHandler("horizontal-bars")
);
verticalBarsRadio?.addEventListener(
  "change",
  getChartTypeChangeHandler("vertical-bars")
);

addDataButton?.addEventListener("click", addDataset);
removeDataButton?.addEventListener("click", removeDataset);

showChart("vertical-bars");
