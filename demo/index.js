import { paintChart, verticalBarPainter } from "./../dist/esm/index.js";
var root = document.getElementById("chart");
if (root) {
    var values_1 = [300, 200, 100];
    var labels_1 = ["A", "B", "C"];
    var chart_1 = paintChart(root, verticalBarPainter, {
        valuesSteps: 3,
        labels: labels_1,
        values: values_1,
        width: 700,
        height: 500,
        style: "border: 1px solid black",
    });
    var incrementBtnA = document.getElementById("increment-btn-a");
    var incrementBtnB = document.getElementById("increment-btn-b");
    var incrementBtnC = document.getElementById("increment-btn-c");
    var getIncrementHandler = function (index) { return function () {
        values_1[index] += 10;
        chart_1.update(values_1, labels_1);
    }; };
    incrementBtnA === null || incrementBtnA === void 0 ? void 0 : incrementBtnA.addEventListener("click", getIncrementHandler(0));
    incrementBtnB === null || incrementBtnB === void 0 ? void 0 : incrementBtnB.addEventListener("click", getIncrementHandler(1));
    incrementBtnC === null || incrementBtnC === void 0 ? void 0 : incrementBtnC.addEventListener("click", getIncrementHandler(2));
}
