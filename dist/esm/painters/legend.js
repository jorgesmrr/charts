var LABEL_GAP_X = 20;
var LABEL_GAP_Y = 7;
var LABEL_SQUARE_MARGIN_X = 10;
var LEGEND_BOTTOM_GAP = 20;
var splitDatasetsInRows = function (ctx, maxRowWidth, labelRectDimensions, datasets) {
    var rows = [];
    var datasetsWithDimensions = datasets.map(function (_a) {
        var label = _a.label, color = _a.color;
        return ({
            label: label,
            color: color,
            width: ctx.measureText(label).width,
        });
    });
    while (datasetsWithDimensions.length) {
        var row = { width: 0, labels: [] };
        while (datasetsWithDimensions.length &&
            row.width + datasetsWithDimensions[0].width < maxRowWidth) {
            row.labels.push(datasetsWithDimensions[0]);
            row.width +=
                labelRectDimensions.width +
                    LABEL_SQUARE_MARGIN_X +
                    datasetsWithDimensions[0].width +
                    LABEL_GAP_X;
            datasetsWithDimensions.splice(0, 1);
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
        row.labels.forEach(function (label) {
            var labelY = area.y + rowHeight * rowIndex;
            ctx.fillStyle = label.color;
            ctx.fillRect(labelX, labelY, labelRectDimensions.width, labelRectDimensions.height);
            // center the y coordinate due to the middle baseline set before
            ctx.fillStyle = "black";
            ctx.fillText(label.label, labelX + labelRectDimensions.width + LABEL_SQUARE_MARGIN_X, labelY + labelRectDimensions.height / 2);
            // increment the origin x coordinate by the sum of this labels content and spacing
            labelX +=
                labelRectDimensions.width +
                    LABEL_SQUARE_MARGIN_X +
                    label.width +
                    LABEL_GAP_X;
        });
    });
};
export var paintLegendAndGetArea = function (ctx, x, y, width, datasets) {
    var approximateTextHeight = ctx.measureText("M").width;
    var rowHeight = approximateTextHeight + LABEL_GAP_Y;
    var labelRectDimensions = {
        width: approximateTextHeight * 1.5,
        height: approximateTextHeight,
    };
    var rows = splitDatasetsInRows(ctx, width * 0.8, labelRectDimensions, datasets);
    var area = {
        x: x,
        y: y,
        width: width,
        height: rowHeight * rows.length + LEGEND_BOTTOM_GAP,
    };
    paintLabels(ctx, area, labelRectDimensions, rowHeight, rows);
    return area;
};
