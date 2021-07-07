"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.horizontalBarPainter = void 0;
var MAX_BAR_WIDTH = 15;
var paintSteps = function (ctx, _a) {
    var _b = _a.areas, valuesStepsArea = _b.bottom, plotArea = _b.plot, gridLines = _a.gridLines, maxValue = _a.maxValue, valueMapperX = _a.valueMapperX;
    __spreadArray([], new Array(gridLines + 1)).forEach(function (_, index) {
        var value = index * (maxValue / gridLines);
        var x = valueMapperX(value);
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, plotArea.y);
        ctx.lineTo(x, plotArea.y + plotArea.height);
        ctx.stroke();
        ctx.fillText(Math.floor(value) + "", x, valuesStepsArea.y + valuesStepsArea.height);
    });
};
var paintLabels = function (ctx, _a) {
    var labelsArea = _a.areas.left, data = _a.data;
    var slotHeight = labelsArea.height / data.length;
    data
        .map(function (record) { return record.label; })
        .forEach(function (label, index) {
        var y = labelsArea.x + index * slotHeight + slotHeight / 2;
        ctx.fillText(label, labelsArea.x, y);
    });
};
var paintValues = function (ctx, _a) {
    var plotArea = _a.areas.plot, data = _a.data, valueMapperX = _a.valueMapperX;
    var slotHeight = plotArea.height / data.length;
    data
        .map(function (record) { return record.value; })
        .forEach(function (value, index) {
        var y = plotArea.y + index * slotHeight + slotHeight / 2;
        ctx.strokeStyle = "black";
        ctx.lineWidth = Math.min(slotHeight - 2, MAX_BAR_WIDTH);
        ctx.beginPath();
        ctx.moveTo(plotArea.x, y);
        ctx.lineTo(valueMapperX(value), y);
        ctx.stroke();
    });
};
exports.horizontalBarPainter = {
    paintSteps: paintSteps,
    paintLabels: paintLabels,
    paintValues: paintValues,
};
