import { DATASETS_GAP_X, MAX_BAR_WIDTH } from "./constants.js";
var paintSteps = function (ctx, _a, _b) {
    var _c = _a.areas, valuesStepsArea = _c.left, valuesArea = _c.plot, minValue = _a.minValue, maxValue = _a.maxValue, valueMapperY = _a.valueMapperY;
    var gridLinesDistance = _b.gridLinesDistance;
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    var distanceFromZero = minValue > 0
        ? 0
        : Math.floor(minValue / gridLinesDistance) * gridLinesDistance;
    var maxDistance = maxValue > 0
        ? Math.ceil(maxValue / gridLinesDistance) * gridLinesDistance
        : 0;
    var distances = [];
    do {
        distances.push(distanceFromZero);
        distanceFromZero += gridLinesDistance;
    } while (distanceFromZero <= maxDistance);
    distances.forEach(function (distanceFromZero) {
        var y = valueMapperY(distanceFromZero);
        ctx.beginPath();
        ctx.moveTo(valuesArea.x, y);
        ctx.lineTo(valuesArea.x + valuesArea.width, y);
        ctx.stroke();
        ctx.fillText(Math.floor(distanceFromZero).toString(), valuesStepsArea.x, y);
        distanceFromZero += gridLinesDistance;
    });
};
var paintLabels = function (ctx, _a, _b) {
    var labelsArea = _a.areas.bottom;
    var labels = _b.data.labels;
    var slotWidth = labelsArea.width / labels.length;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "black";
    labels.forEach(function (label, index) {
        var textDimensions = ctx.measureText(label);
        var originX = labelsArea.x + index * slotWidth + slotWidth / 2;
        var centeredX = originX - textDimensions.width / 2;
        ctx.fillText(label, centeredX, labelsArea.y + labelsArea.height);
    });
};
var paintValues = function (ctx, _a, _b) {
    var plotArea = _a.areas.plot, valueMapperY = _a.valueMapperY;
    var _c = _b.data, labels = _c.labels, datasets = _c.datasets;
    var slotWidth = plotArea.width / labels.length;
    var barWidth = Math.min((slotWidth - DATASETS_GAP_X * 2) / datasets.length, MAX_BAR_WIDTH);
    ctx.lineWidth = barWidth;
    datasets.forEach(function (dataset, datasetIndex) {
        ctx.strokeStyle = dataset.color;
        dataset.values.forEach(function (value, index) {
            var slotCenterX = plotArea.x + slotWidth * index + slotWidth / 2;
            var slotOriginX = slotCenterX - (barWidth * datasets.length) / 2;
            var barX = slotOriginX + barWidth * datasetIndex + barWidth / 2;
            ctx.beginPath();
            ctx.moveTo(barX, valueMapperY(value));
            ctx.lineTo(barX, valueMapperY(0));
            ctx.stroke();
        });
    });
};
export var verticalBarPainter = {
    paintSteps: paintSteps,
    paintLabels: paintLabels,
    paintValues: paintValues,
};
