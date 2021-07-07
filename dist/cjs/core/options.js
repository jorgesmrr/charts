"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOptions = void 0;
var MARGIN = 50;
var VALUES_STEPS_AREA_WIDTH = 50;
var LABELS_AREA_HEIGHT = 50;
var handleOptions = function (_a) {
    var type = _a.type, data = _a.data, width = _a.width, height = _a.height, _b = _a.gridLines, gridLines = _b === void 0 ? 3 : _b;
    var chartArea = {
        x: MARGIN,
        y: MARGIN,
        width: width - 2 * MARGIN,
        height: height - 2 * MARGIN,
    };
    var bottomArea = {
        x: chartArea.x + VALUES_STEPS_AREA_WIDTH,
        y: chartArea.y + chartArea.height - LABELS_AREA_HEIGHT,
        width: chartArea.width - VALUES_STEPS_AREA_WIDTH,
        height: LABELS_AREA_HEIGHT,
    };
    var leftArea = {
        x: chartArea.x,
        y: chartArea.y,
        width: VALUES_STEPS_AREA_WIDTH,
        height: chartArea.height - bottomArea.height,
    };
    var plotArea = {
        x: leftArea.x + leftArea.width,
        y: chartArea.y,
        width: chartArea.width - leftArea.width,
        height: chartArea.height - bottomArea.height,
    };
    var maxValue = data.reduce(function (previous, current) {
        return current.value > previous ? current.value : previous;
    }, data[0].value);
    var valueMapperX = function (value) {
        var valuesRatio = maxValue / plotArea.width;
        return plotArea.x + value / valuesRatio;
    };
    var valueMapperY = function (value) {
        var valuesRatio = maxValue / plotArea.height;
        return plotArea.y + plotArea.height - value / valuesRatio;
    };
    return {
        type: type,
        data: data,
        width: width,
        height: height,
        gridLines: gridLines,
        maxValue: maxValue,
        areas: {
            chart: chartArea,
            bottom: bottomArea,
            left: leftArea,
            plot: plotArea,
        },
        valueMapperX: valueMapperX,
        valueMapperY: valueMapperY,
    };
};
exports.handleOptions = handleOptions;
