var GRIDLINES_LABELS_AREA_WIDTH = 50;
var SERIES_LABELS_AREA_HEIGHT = 50;
export var handleOptions = function (area, _a) {
    var type = _a.type, labels = _a.labels, datasets = _a.datasets, _b = _a.gridLines, gridLines = _b === void 0 ? 3 : _b;
    var bottomArea = {
        x: area.x + GRIDLINES_LABELS_AREA_WIDTH,
        y: area.y + area.height - SERIES_LABELS_AREA_HEIGHT,
        width: area.width - GRIDLINES_LABELS_AREA_WIDTH,
        height: SERIES_LABELS_AREA_HEIGHT,
    };
    var leftArea = {
        x: area.x,
        y: area.y,
        width: GRIDLINES_LABELS_AREA_WIDTH,
        height: area.height - bottomArea.height,
    };
    var plotArea = {
        x: leftArea.x + leftArea.width,
        y: area.y,
        width: area.width - leftArea.width,
        height: area.height - bottomArea.height,
    };
    var findDatasetMaxValue = function (dataset) {
        return dataset.data.reduce(function (previous, current) { return (current > previous ? current : previous); }, 0);
    };
    var maxValue = datasets.reduce(function (previous, current) {
        var currentMaxValue = findDatasetMaxValue(current);
        return currentMaxValue > previous ? currentMaxValue : previous;
    }, 0);
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
        labels: labels,
        datasets: datasets,
        gridLines: gridLines,
        maxValue: maxValue,
        areas: {
            chart: area,
            bottom: bottomArea,
            left: leftArea,
            plot: plotArea,
        },
        valueMapperX: valueMapperX,
        valueMapperY: valueMapperY,
    };
};
