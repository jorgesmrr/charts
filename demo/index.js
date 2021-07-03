import { paintChart } from "./../dist/esm/index.js";
var chart;
var root = document.getElementById("chart");
var data = [
    { label: "A", value: 100 },
    { label: "B", value: 200 },
    { label: "C", value: 300 },
];
var showChart = function (type) {
    return (chart = paintChart(root, {
        type: type,
        data: data,
        width: 700,
        height: 500,
        style: "border: 1px solid black",
    }));
};
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
var getChartTypeChangeHandler = function (type) {
    return function (_a) {
        var target = _a.target;
        if (target.checked) {
            showChart(type);
        }
    };
};
var getIncrementHandler = function (index, input, increment) {
    if (increment === void 0) { increment = 10; }
    return function () {
        data[index].value += increment;
        input.value = data[index].value.toString();
        chart.update(data);
    };
};
var getValueChangeHandler = function (index) {
    return function (_a) {
        var target = _a.target;
        data[index].value = Number(target.value);
        chart.update(data);
    };
};
horizontalBarsRadio === null || horizontalBarsRadio === void 0 ? void 0 : horizontalBarsRadio.addEventListener("change", getChartTypeChangeHandler("horizontal-bars"));
verticalBarsRadio === null || verticalBarsRadio === void 0 ? void 0 : verticalBarsRadio.addEventListener("change", getChartTypeChangeHandler("vertical-bars"));
valueInputA.addEventListener("input", getValueChangeHandler(0));
valueInputB.addEventListener("input", getValueChangeHandler(1));
valueInputC.addEventListener("input", getValueChangeHandler(2));
incrementBtnA === null || incrementBtnA === void 0 ? void 0 : incrementBtnA.addEventListener("click", getIncrementHandler(0, valueInputA));
incrementBtnB === null || incrementBtnB === void 0 ? void 0 : incrementBtnB.addEventListener("click", getIncrementHandler(1, valueInputB));
incrementBtnC === null || incrementBtnC === void 0 ? void 0 : incrementBtnC.addEventListener("click", getIncrementHandler(2, valueInputC));
decrementBtnA === null || decrementBtnA === void 0 ? void 0 : decrementBtnA.addEventListener("click", getIncrementHandler(0, valueInputA, -10));
decrementBtnB === null || decrementBtnB === void 0 ? void 0 : decrementBtnB.addEventListener("click", getIncrementHandler(1, valueInputB, -10));
decrementBtnC === null || decrementBtnC === void 0 ? void 0 : decrementBtnC.addEventListener("click", getIncrementHandler(2, valueInputC, -10));
valueInputA.value = data[0].value.toString();
valueInputB.value = data[1].value.toString();
valueInputC.value = data[2].value.toString();
showChart("vertical-bars");
