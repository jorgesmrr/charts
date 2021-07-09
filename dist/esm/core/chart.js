var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
import { horizontalBarPainter } from "../painters/bar/horizontal.js";
import { verticalBarPainter } from "../painters/bar/vertical.js";
import { paintLegendAndGetArea } from "../painters/legend.js";
import { paintTitleAndGetArea } from "../painters/title.js";
import { handleOptions } from "./options.js";
var painterByTypeMap = (_a = {},
    _a["horizontal-bars"] = horizontalBarPainter,
    _a["vertical-bars"] = verticalBarPainter,
    _a);
var update = function (ctx, options) {
    var chartArea = {
        x: 0,
        y: 0,
        width: options.width,
        height: options.height,
    };
    var titleArea = paintTitleAndGetArea(ctx, chartArea, options.title);
    var datasetsLabelsArea = paintLegendAndGetArea(ctx, chartArea.x, chartArea.y + titleArea.height, chartArea.width, options.datasets.map(function (dataset) { return dataset.label; }));
    var remainingArea = {
        x: chartArea.x,
        y: datasetsLabelsArea.y + datasetsLabelsArea.height,
        width: chartArea.width,
        height: chartArea.height - (titleArea.height + datasetsLabelsArea.height),
    };
    var painter = painterByTypeMap[options.type];
    var finalOptions = handleOptions(remainingArea, options);
    painter.paintSteps(ctx, finalOptions);
    painter.paintLabels(ctx, finalOptions);
    painter.paintValues(ctx, finalOptions);
};
export var paintChart = function (rootElement, options) {
    if (!options)
        throw Error("You must provide the options!");
    if (!options.datasets)
        throw Error("You must provide the datasets!");
    if (!options.width)
        throw Error("You must provide the width!");
    if (!options.height)
        throw Error("You must provide the height!");
    rootElement.innerHTML = "<canvas id=\"canvas\" width=\"" + options.width + "\" height=\"" + options.height + "\" />";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "16px sans-serif";
    update(ctx, options);
    var wrappedUpdate = function (datasets) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        update(ctx, __assign(__assign({}, options), { datasets: datasets }));
    };
    return {
        update: wrappedUpdate,
    };
};
