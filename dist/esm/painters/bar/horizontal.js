import { MAX_BAR_WIDTH, DATASETS_GAP_X } from "./constants.js";
var paintSteps = function (ctx, _a, _b) {
    var _c = _a.areas, valuesStepsArea = _c.bottom, plotArea = _c.plot, minValue = _a.minValue, maxValue = _a.maxValue, valueMapperX = _a.valueMapperX;
    var gridLinesGap = _b.gridLinesGap;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    var paintGridLine = function (distanceFromZero) {
        var x = valueMapperX(distanceFromZero);
        ctx.beginPath();
        ctx.moveTo(x, plotArea.y);
        ctx.lineTo(x, plotArea.y + plotArea.height);
        ctx.stroke();
        var valueLabel = Math.floor(distanceFromZero).toString();
        var labelWidth = ctx.measureText(valueLabel).width;
        ctx.fillText(valueLabel, x - labelWidth / 2, valuesStepsArea.y + valuesStepsArea.height);
    };
    var distanceFromZero = 0;
    do {
        paintGridLine(distanceFromZero);
        distanceFromZero += gridLinesGap;
    } while (distanceFromZero - gridLinesGap <= maxValue);
    distanceFromZero = -gridLinesGap;
    while (distanceFromZero + gridLinesGap >= minValue) {
        paintGridLine(distanceFromZero);
        distanceFromZero -= gridLinesGap;
    }
};
var paintLabels = function (ctx, _a, _b) {
    var labelsArea = _a.areas.left;
    var labels = _b.labels;
    var slotHeight = labelsArea.height / labels.length;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "black";
    labels.forEach(function (label, index) {
        var y = labelsArea.y + index * slotHeight + slotHeight / 2;
        ctx.fillText(label, labelsArea.x, y);
    });
};
var paintValues = function (ctx, _a, _b) {
    var plotArea = _a.areas.plot, valueMapperX = _a.valueMapperX;
    var labels = _b.labels, datasets = _b.datasets;
    var slotHeight = plotArea.height / labels.length;
    var barHeight = Math.min((slotHeight - DATASETS_GAP_X * 2) / datasets.length, MAX_BAR_WIDTH);
    ctx.lineWidth = barHeight;
    datasets.forEach(function (dataset, datasetIndex) {
        ctx.strokeStyle = dataset.color || "#FF0000";
        dataset.data.forEach(function (value, index) {
            var slotCenterY = plotArea.y + slotHeight * index + slotHeight / 2;
            var slotOriginY = slotCenterY - (barHeight * datasets.length) / 2;
            var barY = slotOriginY + barHeight * datasetIndex + barHeight / 2;
            ctx.beginPath();
            ctx.moveTo(valueMapperX(0), barY);
            ctx.lineTo(valueMapperX(value), barY);
            ctx.stroke();
        });
    });
};
export var horizontalBarPainter = {
    paintSteps: paintSteps,
    paintLabels: paintLabels,
    paintValues: paintValues,
};
