import { paintChart, verticalBarPainter, horizontalBarPainter, } from "./../dist/esm/index.js";
var chart;
var showChart = function (painter) {
    return (chart = paintChart(root, painter, {
        labels: labels,
        values: values,
        width: 700,
        height: 500,
        style: "border: 1px solid black",
    }));
};
var root = document.getElementById("chart");
var values = [100, 200, 300];
var labels = ["A", "B", "C"];
var valueInputA = document.getElementById("value-input-a");
var valueInputB = document.getElementById("value-input-b");
var valueInputC = document.getElementById("value-input-c");
var horizontalBarsRadio = document.getElementById("horizontal-bars-radio");
var verticalBarsRadio = document.getElementById("vertical-bars-radio");
var incrementBtnA = document.getElementById("increment-btn-a");
var incrementBtnB = document.getElementById("increment-btn-b");
var incrementBtnC = document.getElementById("increment-btn-c");
var decrementBtnA = document.getElementById("decrement-btn-a");
var decrementBtnB = document.getElementById("decrement-btn-b");
var decrementBtnC = document.getElementById("decrement-btn-c");
var getChartTypeChangeHandler = function (painter) {
    return function (_a) {
        var target = _a.target;
        if (target.checked) {
            showChart(painter);
        }
    };
};
var getIncrementHandler = function (index, input, increment) {
    if (increment === void 0) { increment = 10; }
    return function () {
        values[index] += increment;
        input.value = values[index].toString();
        chart.update(values, labels);
    };
};
var getValueChangeHandler = function (index) {
    return function (_a) {
        var target = _a.target;
        values[index] = Number(target.value);
        chart.update(values, labels);
    };
};
horizontalBarsRadio === null || horizontalBarsRadio === void 0 ? void 0 : horizontalBarsRadio.addEventListener("change", getChartTypeChangeHandler(horizontalBarPainter));
verticalBarsRadio === null || verticalBarsRadio === void 0 ? void 0 : verticalBarsRadio.addEventListener("change", getChartTypeChangeHandler(verticalBarPainter));
valueInputA.addEventListener("input", getValueChangeHandler(0));
valueInputB.addEventListener("input", getValueChangeHandler(1));
valueInputC.addEventListener("input", getValueChangeHandler(2));
incrementBtnA === null || incrementBtnA === void 0 ? void 0 : incrementBtnA.addEventListener("click", getIncrementHandler(0, valueInputA));
incrementBtnB === null || incrementBtnB === void 0 ? void 0 : incrementBtnB.addEventListener("click", getIncrementHandler(1, valueInputB));
incrementBtnC === null || incrementBtnC === void 0 ? void 0 : incrementBtnC.addEventListener("click", getIncrementHandler(2, valueInputC));
decrementBtnA === null || decrementBtnA === void 0 ? void 0 : decrementBtnA.addEventListener("click", getIncrementHandler(0, valueInputA, -10));
decrementBtnB === null || decrementBtnB === void 0 ? void 0 : decrementBtnB.addEventListener("click", getIncrementHandler(1, valueInputB, -10));
decrementBtnC === null || decrementBtnC === void 0 ? void 0 : decrementBtnC.addEventListener("click", getIncrementHandler(2, valueInputC, -10));
valueInputA.value = values[0].toString();
valueInputB.value = values[1].toString();
valueInputC.value = values[2].toString();
showChart(verticalBarPainter);
