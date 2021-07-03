var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var paintSteps = function (ctx, _a) {
    var _b = _a.areas, valuesStepsArea = _b.bottom, valuesArea = _b.values, valuesSteps = _a.valuesSteps, maxValue = _a.maxValue, valueMapperX = _a.valueMapperX;
    __spreadArray([], new Array(valuesSteps + 1)).forEach(function (_, index) {
        var value = index * (maxValue / valuesSteps);
        var x = valueMapperX(value);
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, valuesArea.y);
        ctx.lineTo(x, valuesArea.y + valuesArea.height);
        ctx.stroke();
        ctx.fillText(Math.floor(value) + "", x, valuesStepsArea.y + valuesStepsArea.height);
    });
};
var paintLabels = function (ctx, _a) {
    var labelsArea = _a.areas.left, labels = _a.labels;
    var slotHeight = labelsArea.height / labels.length;
    labels.forEach(function (label, index) {
        var y = labelsArea.x + index * slotHeight + slotHeight / 2;
        ctx.fillText(label, labelsArea.x, y);
    });
};
var paintValues = function (ctx, _a) {
    var valuesArea = _a.areas.values, values = _a.values, valueMapperX = _a.valueMapperX;
    var slotHeight = valuesArea.height / values.length;
    values.forEach(function (value, index) {
        var y = valuesArea.y + index * slotHeight + slotHeight / 2;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 15;
        ctx.beginPath();
        ctx.moveTo(valuesArea.x, y);
        ctx.lineTo(valueMapperX(value), y);
        ctx.stroke();
    });
};
export var horizontalBarPainter = {
    paintSteps: paintSteps,
    paintLabels: paintLabels,
    paintValues: paintValues,
};
