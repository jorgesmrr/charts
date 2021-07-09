var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var MAX_BAR_WIDTH = 15;
var paintSteps = function (ctx, _a) {
    var _b = _a.areas, valuesStepsArea = _b.bottom, plotArea = _b.plot, gridLines = _a.gridLines, maxValue = _a.maxValue, valueMapperX = _a.valueMapperX;
    ctx.textBaseline = "alphabetic";
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    __spreadArray([], new Array(gridLines + 1)).forEach(function (_, index) {
        var value = index * (maxValue / gridLines);
        var x = valueMapperX(value);
        ctx.beginPath();
        ctx.moveTo(x, plotArea.y);
        ctx.lineTo(x, plotArea.y + plotArea.height);
        ctx.stroke();
        ctx.fillText(Math.floor(value) + "", x, valuesStepsArea.y + valuesStepsArea.height);
    });
};
var paintLabels = function (ctx, _a) {
    var labelsArea = _a.areas.left, labels = _a.labels;
    var slotHeight = labelsArea.height / labels.length;
    ctx.textBaseline = "alphabetic";
    labels.forEach(function (label, index) {
        var y = labelsArea.x + index * slotHeight + slotHeight / 2;
        ctx.fillText(label, labelsArea.x, y);
    });
};
var paintValues = function (ctx, _a) {
    var plotArea = _a.areas.plot, labels = _a.labels, datasets = _a.datasets, valueMapperX = _a.valueMapperX;
    var slotHeight = plotArea.height / labels.length;
    var barHeight = Math.min(slotHeight / datasets.length, MAX_BAR_WIDTH);
    ctx.strokeStyle = "black";
    ctx.lineWidth = barHeight;
    datasets.forEach(function (dataset, datasetIndex) {
        dataset.data.forEach(function (value, index) {
            var slotCenterY = plotArea.y + slotHeight * index + slotHeight / 2;
            var slotOriginY = slotCenterY - (barHeight * datasets.length) / 2;
            var barY = slotOriginY + barHeight * datasetIndex + barHeight / 2;
            ctx.beginPath();
            ctx.moveTo(plotArea.x, barY);
            ctx.lineTo(valueMapperX(value), barY);
            ctx.stroke();
        });
    });
};
export var horizontalBarPainter = {
    paintSteps: paintSteps,
    paintLabels: paintLabels,
    paintValues: paintValues,
};
