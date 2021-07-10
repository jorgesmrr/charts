var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { DATASETS_GAP_X, MAX_BAR_WIDTH } from "./constants.js";
var paintSteps = function (ctx, _a, _b) {
    var _c = _a.areas, valuesStepsArea = _c.left, valuesArea = _c.plot, maxValue = _a.maxValue, valueMapperY = _a.valueMapperY;
    var gridLines = _b.gridLines;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    __spreadArray([], new Array(gridLines + 1)).forEach(function (_, index) {
        var value = index * (maxValue / gridLines);
        var y = valueMapperY(value);
        ctx.beginPath();
        ctx.moveTo(valuesArea.x, y);
        ctx.lineTo(valuesArea.x + valuesArea.width, y);
        ctx.stroke();
        ctx.fillText(Math.floor(value).toString(), valuesStepsArea.x, y);
    });
};
var paintLabels = function (ctx, _a, _b) {
    var labelsArea = _a.areas.bottom;
    var labels = _b.labels;
    var slotWidth = labelsArea.width / labels.length;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "black";
    labels.forEach(function (label, index) {
        var textDimensions = ctx.measureText(label);
        var originX = labelsArea.x + index * slotWidth + slotWidth / 2;
        var centeredX = originX - textDimensions.width / 2;
        ctx.fillText(label, centeredX, labelsArea.y + labelsArea.height);
    });
};
var paintValues = function (ctx, _a, _b) {
    var plotArea = _a.areas.plot, valueMapperY = _a.valueMapperY;
    var labels = _b.labels, datasets = _b.datasets;
    var slotWidth = plotArea.width / labels.length;
    var barWidth = Math.min((slotWidth - DATASETS_GAP_X * 2) / datasets.length, MAX_BAR_WIDTH);
    ctx.lineWidth = barWidth;
    datasets.forEach(function (dataset, datasetIndex) {
        ctx.strokeStyle = dataset.color;
        dataset.data.forEach(function (value, index) {
            var slotCenterX = plotArea.x + slotWidth * index + slotWidth / 2;
            var slotOriginX = slotCenterX - (barWidth * datasets.length) / 2;
            var barX = slotOriginX + barWidth * datasetIndex + barWidth / 2;
            ctx.beginPath();
            ctx.moveTo(barX, valueMapperY(value));
            ctx.lineTo(barX, plotArea.y + plotArea.height);
            ctx.stroke();
        });
    });
};
export var verticalBarPainter = {
    paintSteps: paintSteps,
    paintLabels: paintLabels,
    paintValues: paintValues,
};
