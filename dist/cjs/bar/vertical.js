"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verticalBarPainter = void 0;
var paintSteps = function (ctx, _a) {
    var _b = _a.areas, valuesStepsArea = _b.valuesStepsArea, valuesArea = _b.valuesArea, valuesSteps = _a.valuesSteps, maxValue = _a.maxValue, valueMapper = _a.valueMapper;
    __spreadArray([], new Array(valuesSteps + 1)).forEach(function (_, index) {
        var value = index * (maxValue / valuesSteps);
        var y = valueMapper(value);
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
    var labelsArea = _a.areas.labelsArea, labels = _a.labels;
    var slotWidth = labelsArea.width / labels.length;
    labels.forEach(function (label, index) {
        var textDimensions = ctx.measureText(label);
        var originX = labelsArea.x + index * slotWidth + slotWidth / 2;
        var centeredX = originX - textDimensions.width / 2;
        ctx.fillText(label, centeredX, labelsArea.y + labelsArea.height);
    });
};
var paintValues = function (ctx, _a) {
    var valuesArea = _a.areas.valuesArea, values = _a.values, valueMapper = _a.valueMapper;
    var slotWidth = valuesArea.width / values.length;
    values.forEach(function (value, index) {
        var x = valuesArea.x + index * slotWidth + slotWidth / 2;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 15;
        ctx.beginPath();
        ctx.moveTo(x, valueMapper(value));
        ctx.lineTo(x, valuesArea.y + valuesArea.height);
        ctx.stroke();
    });
};
exports.verticalBarPainter = {
    paintSteps: paintSteps,
    paintLabels: paintLabels,
    paintValues: paintValues,
};
