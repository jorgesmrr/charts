var GRIDLINES_LABELS_AREA_WIDTH = 50;
var DATASETS_LABELS_AREA_HEIGHT = 50;
var findDatasetsMinValue = function (datasets) {
    var findInDataset = function (dataset) {
        return dataset.data.reduce(function (previous, current) { return Math.min(previous, current); }, Infinity);
    };
    return datasets.reduce(function (previous, current) { return Math.min(previous, findInDataset(current)); }, Infinity);
};
var findDatasetsMaxValue = function (datasets) {
    var findInDataset = function (dataset) {
        return dataset.data.reduce(function (previous, current) { return Math.max(previous, current); }, -Infinity);
    };
    return datasets.reduce(function (previous, current) { return Math.max(previous, findInDataset(current)); }, -Infinity);
};
var getValuesDistance = function (valuesHasSameSigns, min, max) {
    return valuesHasSameSigns
        ? Math.max(Math.abs(min), Math.abs(max))
        : Math.abs(max) + Math.abs(min);
};
export var getConfiguration = function (area, datasets, gridLinesGap) {
    var bottomArea = {
        x: area.x + GRIDLINES_LABELS_AREA_WIDTH,
        y: area.y + area.height - DATASETS_LABELS_AREA_HEIGHT,
        width: area.width - GRIDLINES_LABELS_AREA_WIDTH,
        height: DATASETS_LABELS_AREA_HEIGHT,
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
    var minValue = findDatasetsMinValue(datasets);
    var maxValue = findDatasetsMaxValue(datasets);
    var valuesHasSameSigns = maxValue * minValue > 0;
    var valuesDistance = getValuesDistance(valuesHasSameSigns, minValue, maxValue);
    var valueMapperX = function (value) {
        var distanceAfterZero = maxValue > 0 ? Math.ceil(maxValue / gridLinesGap) * gridLinesGap : 0;
        var distanceBeforeZero = minValue < 0
            ? Math.ceil(Math.abs(minValue) / gridLinesGap) * gridLinesGap
            : 0;
        var valuesRatio = (distanceBeforeZero + distanceAfterZero) / plotArea.width;
        var baseX = plotArea.x;
        var valueX = value / valuesRatio;
        var translationX = distanceBeforeZero > 0 ? distanceBeforeZero / valuesRatio : 0;
        return baseX + valueX + translationX;
    };
    var valueMapperY = function (value) {
        var distanceAfterZero = maxValue > 0 ? Math.ceil(maxValue / gridLinesGap) * gridLinesGap : 0;
        var distanceBeforeZero = minValue < 0
            ? Math.ceil(Math.abs(minValue) / gridLinesGap) * gridLinesGap
            : 0;
        var valuesRatio = (distanceBeforeZero + distanceAfterZero) / plotArea.height;
        var baseY = plotArea.y + plotArea.height;
        var valueY = value / valuesRatio;
        var translationY = distanceBeforeZero > 0 ? distanceBeforeZero / valuesRatio : 0;
        return baseY - valueY - translationY;
    };
    return {
        minValue: minValue,
        maxValue: maxValue,
        valuesDistance: valuesDistance,
        valueMapperX: valueMapperX,
        valueMapperY: valueMapperY,
        areas: {
            chart: area,
            bottom: bottomArea,
            left: leftArea,
            plot: plotArea,
        },
    };
};
