import { MAX_BAR_WIDTH, DATASETS_GAP_X } from "./constants.js";
var paintSteps = function (ctx, _a, _b) {
    var _c = _a.areas, valuesStepsArea = _c.bottom, plotArea = _c.plot, minValue = _a.minValue, maxValue = _a.maxValue, valueMapperX = _a.valueMapperX;
    var gridLinesDistance = _b.gridLinesDistance;
    ctx.textBaseline = "alphabetic";
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
    distances.forEach(function (distanceFromZero, index) {
        var x = valueMapperX(distanceFromZero);
        ctx.beginPath();
        ctx.moveTo(x, plotArea.y);
        ctx.lineTo(x, plotArea.y + plotArea.height);
        ctx.stroke();
        var valueLabel = Math.floor(distanceFromZero).toString();
        var labelWidth = ctx.measureText(valueLabel).width;
        var textTranslationX;
        if (index === 0) {
            textTranslationX = 0;
        }
        else if (index === distances.length - 1) {
            textTranslationX = -labelWidth;
        }
        else {
            textTranslationX = -labelWidth / 2;
        }
        ctx.fillText(valueLabel, x + textTranslationX, valuesStepsArea.y + valuesStepsArea.height);
        distanceFromZero += gridLinesDistance;
    });
};
var paintLabels = function (ctx, _a, _b) {
    var labelsArea = _a.areas.left;
    var labels = _b.data.labels;
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
    var _c = _b.data, labels = _c.labels, datasets = _c.datasets;
    var slotHeight = plotArea.height / labels.length;
    var barHeight = Math.min((slotHeight - DATASETS_GAP_X * 2) / datasets.length, MAX_BAR_WIDTH);
    ctx.lineWidth = barHeight;
    datasets.forEach(function (dataset, datasetIndex) {
        ctx.strokeStyle = dataset.color || "#FF0000";
        dataset.values.forEach(function (value, index) {
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
