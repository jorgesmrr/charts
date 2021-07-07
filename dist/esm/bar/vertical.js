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
    var labelsArea = _a.areas.bottom, data = _a.data;
    var slotWidth = labelsArea.width / data.length;
    data
        .map(function (record) { return record.label; })
        .forEach(function (label, index) {
        var textDimensions = ctx.measureText(label);
        var originX = labelsArea.x + index * slotWidth + slotWidth / 2;
        var centeredX = originX - textDimensions.width / 2;
        ctx.fillText(label, centeredX, labelsArea.y + labelsArea.height);
    });
};
var paintValues = function (ctx, _a) {
    var valuesArea = _a.areas.plot, data = _a.data, valueMapperY = _a.valueMapperY;
    var slotWidth = valuesArea.width / data.length;
    data
        .map(function (record) { return record.value; })
        .forEach(function (value, index) {
        var x = valuesArea.x + index * slotWidth + slotWidth / 2;
        ctx.strokeStyle = "black";
        ctx.lineWidth = Math.min(slotWidth - 2, MAX_BAR_WIDTH);
        ctx.beginPath();
        ctx.moveTo(x, valueMapperY(value));
        ctx.lineTo(x, valuesArea.y + valuesArea.height);
        ctx.stroke();
    });
};
export var verticalBarPainter = {
    paintSteps: paintSteps,
    paintLabels: paintLabels,
    paintValues: paintValues,
};
