import { paintChart, verticalBarPainter } from "./../dist/esm/index.js";

const root = document.getElementById("chart");

if (root) {
  const values = [300, 200, 100];
  const labels = ["A", "B", "C"];

  const chart = paintChart(root, verticalBarPainter, {
    labels,
    values,
    width: 700,
    height: 500,
    style: "border: 1px solid black",
  });

  const incrementBtnA = document.getElementById("increment-btn-a");
  const incrementBtnB = document.getElementById("increment-btn-b");
  const incrementBtnC = document.getElementById("increment-btn-c");

  const getIncrementHandler = (index: number) => () => {
    values[index] += 10;
    chart.update(values, labels);
  };

  incrementBtnA?.addEventListener("click", getIncrementHandler(0));
  incrementBtnB?.addEventListener("click", getIncrementHandler(1));
  incrementBtnC?.addEventListener("click", getIncrementHandler(2));
}
