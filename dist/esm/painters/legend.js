var LABELS_GAP_X = 20;
var LABELS_GAP_Y = 7;
var LABELS_SQUARE_MARGIN_X = 10;
var splitLabelsInRows = function (ctx, maxRowWidth, labelRectDimensions, labels) {
    var rows = [];
    var labelsDimensions = labels.map(function (label) { return ({
        label: label,
        width: ctx.measureText(label).width,
    }); });
    while (labelsDimensions.length) {
        var row = { width: 0, labels: [] };
        while (labelsDimensions.length &&
            row.width + labelsDimensions[0].width < maxRowWidth) {
            row.labels.push(labelsDimensions[0]);
            row.width +=
                labelRectDimensions.width +
                    LABELS_SQUARE_MARGIN_X +
                    labelsDimensions[0].width +
                    LABELS_GAP_X;
            labelsDimensions.splice(0, 1);
        }
        rows.push(row);
    }
    return rows;
};
var paintLabels = function (ctx, area, labelRectDimensions, rowHeight, rows) {
    ctx.textBaseline = "middle";
    rows.forEach(function (row, rowIndex) {
        // calculate x origin coordinate in order to center this row contents
        var unusedRowWidth = area.width - row.width;
        var labelX = area.x + unusedRowWidth / 2;
        row.labels.forEach(function (labelInfo) {
            var labelY = area.y + rowHeight * rowIndex;
            ctx.fillRect(labelX, labelY, labelRectDimensions.width, labelRectDimensions.height);
            // center the y coordinate due to the middle baseline set before
            ctx.fillText(labelInfo.label, labelX + labelRectDimensions.width + LABELS_SQUARE_MARGIN_X, labelY + labelRectDimensions.height / 2);
            // increment the origin x coordinate by the sum of this labels content and spacing
            labelX +=
                labelRectDimensions.width +
                    LABELS_SQUARE_MARGIN_X +
                    labelInfo.width +
                    LABELS_GAP_X;
        });
    });
};
export var paintLegendAndGetArea = function (ctx, x, y, width, labels) {
    var approximateTextHeight = ctx.measureText("M").width;
    var rowHeight = approximateTextHeight + LABELS_GAP_Y;
    var labelRectDimensions = {
        width: approximateTextHeight * 1.5,
        height: approximateTextHeight,
    };
    var rows = splitLabelsInRows(ctx, width * 0.8, labelRectDimensions, labels);
    var area = {
        x: x,
        y: y,
        width: width,
        height: rowHeight * rows.length,
    };
    paintLabels(ctx, area, labelRectDimensions, rowHeight, rows);
    return area;
};
