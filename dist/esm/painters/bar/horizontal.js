var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var MAX_BAR_WIDTH = 15;
var paintSteps = function (ctx, _a, _b) {
    var _c = _a.areas, valuesStepsArea = _c.bottom, plotArea = _c.plot, maxValue = _a.maxValue, valueMapperX = _a.valueMapperX;
    var gridLines = _b.gridLines;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    __spreadArray([], new Array(gridLines + 1)).forEach(function (_, index) {
        var value = index * (maxValue / gridLines);
        var x = valueMapperX(value);
        ctx.beginPath();
        ctx.moveTo(x, plotArea.y);
        ctx.lineTo(x, plotArea.y + plotArea.height);
        ctx.stroke();
        ctx.fillText(Math.floor(value).toString(), x, valuesStepsArea.y + valuesStepsArea.height);
    });
};
var paintLabels = function (ctx, _a, _b) {
    var labelsArea = _a.areas.left;
    var labels = _b.labels;
    var slotHeight = labelsArea.height / labels.length;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "black";
    labels.forEach(function (label, index) {
        var y = labelsArea.y + index * slotHeight + slotHeight / 2;
        ctx.fillText(label, labelsArea.x, y);
    });
};
var paintValues = function (ctx, _a, _b) {
    var plotArea = _a.areas.plot, valueMapperX = _a.valueMapperX;
    var labels = _b.labels, datasets = _b.datasets;
    var slotHeight = plotArea.height / labels.length;
    var barHeight = Math.min(slotHeight / datasets.length, MAX_BAR_WIDTH);
    ctx.lineWidth = barHeight;
    datasets.forEach(function (dataset, datasetIndex) {
        ctx.strokeStyle = dataset.color || "#FF0000";
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
