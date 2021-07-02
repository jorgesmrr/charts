"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOptions = void 0;
var VALUES_STEPS_AREA_WIDTH = 50;
var LABELS_AREA_HEIGHT = 50;
var handleOptions = function (_a) {
    var labels = _a.labels, values = _a.values, _b = _a.valuesSteps, valuesSteps = _b === void 0 ? 3 : _b, width = _a.width, height = _a.height, _c = _a.margin, margin = _c === void 0 ? 50 : _c, _d = _a.barWidth, barWidth = _d === void 0 ? 20 : _d, _e = _a.style, style = _e === void 0 ? "" : _e;
    var chartArea = {
        x: margin,
        y: margin,
        width: width - 2 * margin,
        height: height - 2 * margin,
    };
    var labelsArea = {
        x: chartArea.x + VALUES_STEPS_AREA_WIDTH,
        y: chartArea.y + chartArea.height - LABELS_AREA_HEIGHT,
        width: chartArea.width - VALUES_STEPS_AREA_WIDTH,
        height: LABELS_AREA_HEIGHT,
    };
    var valuesStepsArea = {
        x: chartArea.x,
        y: chartArea.y,
        width: VALUES_STEPS_AREA_WIDTH,
        height: chartArea.height - labelsArea.height,
    };
    var valuesArea = {
        x: valuesStepsArea.x + valuesStepsArea.width,
        y: chartArea.y,
        width: chartArea.width - valuesStepsArea.width,
        height: chartArea.height - labelsArea.height,
    };
    var maxValue = values.reduce(function (current, acc) { return (current > acc ? current : acc); }, values[0]);
    var valueMapper = function (value) {
        var valuesRatio = maxValue / valuesArea.height;
        return valuesArea.y + valuesArea.height - value / valuesRatio;
    };
    return {
        labels: labels,
        values: values,
        maxValue: maxValue,
        valuesSteps: valuesSteps,
        width: width,
        height: height,
        margin: margin,
        barWidth: barWidth,
        style: style,
        areas: { chartArea: chartArea, labelsArea: labelsArea, valuesStepsArea: valuesStepsArea, valuesArea: valuesArea },
        valueMapper: valueMapper,
    };
};
exports.handleOptions = handleOptions;
