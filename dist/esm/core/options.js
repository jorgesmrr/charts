var VALUES_STEPS_AREA_WIDTH = 50;
var LABELS_AREA_HEIGHT = 50;
export var handleOptions = function (_a) {
    var data = _a.data, _b = _a.valuesSteps, valuesSteps = _b === void 0 ? 3 : _b, width = _a.width, height = _a.height, _c = _a.margin, margin = _c === void 0 ? 50 : _c, _d = _a.barWidth, barWidth = _d === void 0 ? 20 : _d, _e = _a.style, style = _e === void 0 ? "" : _e;
    var chartArea = {
        x: margin,
        y: margin,
        width: width - 2 * margin,
        height: height - 2 * margin,
    };
    var bottom = {
        x: chartArea.x + VALUES_STEPS_AREA_WIDTH,
        y: chartArea.y + chartArea.height - LABELS_AREA_HEIGHT,
        width: chartArea.width - VALUES_STEPS_AREA_WIDTH,
        height: LABELS_AREA_HEIGHT,
    };
    var left = {
        x: chartArea.x,
        y: chartArea.y,
        width: VALUES_STEPS_AREA_WIDTH,
        height: chartArea.height - bottom.height,
    };
    var valuesArea = {
        x: left.x + left.width,
        y: chartArea.y,
        width: chartArea.width - left.width,
        height: chartArea.height - bottom.height,
    };
    var maxValue = data.reduce(function (previous, current) {
        return current.value > previous ? current.value : previous;
    }, data[0].value);
    var valueMapperX = function (value) {
        var valuesRatio = maxValue / valuesArea.width;
        return valuesArea.x + value / valuesRatio;
    };
    var valueMapperY = function (value) {
        var valuesRatio = maxValue / valuesArea.height;
        return valuesArea.y + valuesArea.height - value / valuesRatio;
    };
    return {
        data: data,
        maxValue: maxValue,
        valuesSteps: valuesSteps,
        width: width,
        height: height,
        margin: margin,
        barWidth: barWidth,
        style: style,
        areas: { chart: chartArea, bottom: bottom, left: left, values: valuesArea },
        valueMapperX: valueMapperX,
        valueMapperY: valueMapperY,
    };
};
