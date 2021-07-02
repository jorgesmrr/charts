var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var chart = function (rootElement, _a) {
    var labels = _a.labels, values = _a.values, _b = _a.valuesSteps, valuesSteps = _b === void 0 ? 3 : _b, _c = _a.width, width = _c === void 0 ? 500 : _c, _d = _a.height, height = _d === void 0 ? 500 : _d, _e = _a.margin, margin = _e === void 0 ? 50 : _e, _f = _a.barWidth, barWidth = _f === void 0 ? 20 : _f, _g = _a.style, style = _g === void 0 ? "" : _g;
    if (!rootElement)
        throw Error("You must provide the root element!");
    if (!labels)
        throw Error("You must provide the labels!");
    if (!values)
        throw Error("You must provide the values!");
    rootElement.innerHTML = "<canvas id=\"canvas\" width=\"" + width + "\" height=\"" + height + "\" style=\"" + style + "\" />";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "16px sans-serif";
    draw();
    function draw() {
        var valuesStepsAreaWidth = 50;
        var labelsAreaHeight = 50;
        var chartArea = {
            x: margin,
            y: margin,
            width: width - 2 * margin,
            height: height - 2 * margin,
        };
        var labelsArea = {
            x: chartArea.x + valuesStepsAreaWidth,
            y: chartArea.y + chartArea.height - labelsAreaHeight,
            width: chartArea.width - valuesStepsAreaWidth,
            height: labelsAreaHeight,
        };
        var valuesStepsArea = {
            x: chartArea.x,
            y: chartArea.y,
            width: valuesStepsAreaWidth,
            height: chartArea.height - labelsArea.height,
        };
        var valuesArea = {
            x: valuesStepsArea.x + valuesStepsArea.width,
            y: chartArea.y,
            width: chartArea.width - valuesStepsArea.width,
            height: chartArea.height - labelsArea.height,
        };
        var labelWidth = labelsArea.width / labels.length;
        __spreadArray([], new Array(valuesSteps + 1)).forEach(function (_, index) {
            drawStep(index);
            drawStepLabel(index);
        });
        labels.forEach(function (label, index) { return drawLabel(label, index); });
        values.forEach(function (value, index) { return drawBar(value, index); });
        var maxValue = values.reduce(function (current, acc) { return (current > acc ? current : acc); }, values[0]);
        function valueToY(value) {
            var valuesRatio = maxValue / valuesArea.height;
            return valuesArea.y + valuesArea.height - value / valuesRatio;
        }
        function drawLabel(label, index) {
            var textDimensions = ctx.measureText(label);
            var originX = labelsArea.x + index * labelWidth + labelWidth / 2;
            var centeredX = originX - textDimensions.width / 2;
            ctx.fillText(label, centeredX, labelsArea.y + labelsArea.height);
        }
        function drawStep(index) {
            var y = valueToY((index * maxValue) / valuesSteps);
            ctx.strokeStyle = "grey";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(valuesArea.x, y);
            ctx.lineTo(valuesArea.x + valuesArea.width, y);
            ctx.stroke();
        }
        function drawStepLabel(index) {
            var value = (index * maxValue) / valuesSteps;
            ctx.fillText(value + "", valuesStepsArea.x, valueToY(value));
        }
        function drawBar(value, index) {
            var originX = valuesArea.x + index * labelWidth + labelWidth / 2;
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
