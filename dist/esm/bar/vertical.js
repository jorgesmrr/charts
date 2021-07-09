var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var MAX_BAR_WIDTH = 15;
var paintSteps = function (ctx, _a) {
    var _b = _a.areas, valuesStepsArea = _b.left, valuesArea = _b.plot, gridLines = _a.gridLines, maxValue = _a.maxValue, valueMapperY = _a.valueMapperY;
    __spreadArray([], new Array(gridLines + 1)).forEach(function (_, index) {
        var value = index * (maxValue / gridLines);
        var y = valueMapperY(value);
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(valuesArea.x, y);
        ctx.lineTo(valuesArea.x + valuesArea.width, y);
        ctx.stroke();
        ctx.fillText(Math.floor(value) + "", valuesStepsArea.x, y);
    });
};
var paintLabels = function (ctx, _a) {
    var labelsArea = _a.areas.bottom, labels = _a.labels;
    var slotWidth = labelsArea.width / labels.length;
    labels.forEach(function (label, index) {
        var textDimensions = ctx.measureText(label);
        var originX = labelsArea.x + index * slotWidth + slotWidth / 2;
        var centeredX = originX - textDimensions.width / 2;
        ctx.fillText(label, centeredX, labelsArea.y + labelsArea.height);
    });
};
var paintValues = function (ctx, _a) {
    var plotArea = _a.areas.plot, labels = _a.labels, datasets = _a.datasets, valueMapperY = _a.valueMapperY;
    var slotWidth = plotArea.width / labels.length;
    var barWidth = Math.min(slotWidth / datasets.length, MAX_BAR_WIDTH);
    datasets.forEach(function (dataset, datasetIndex) {
        dataset.data.forEach(function (value, index) {
            var slotCenterX = plotArea.x + slotWidth * index + slotWidth / 2;
            var slotOriginX = slotCenterX - (barWidth * datasets.length) / 2;
            var barX = slotOriginX + barWidth * datasetIndex + barWidth / 2;
            ctx.strokeStyle = "black";
            ctx.lineWidth = barWidth;
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
