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
import { validateOptions } from "./options.js";
import { getConfiguration } from "./configuration.js";
var painterByTypeMap = (_a = {},
    _a["horizontal-bars"] = horizontalBarPainter,
    _a["vertical-bars"] = verticalBarPainter,
    _a);
var update = function (ctx, options) {
    var validatedOptions = validateOptions(options);
    var chartArea = {
        x: 0,
        y: 0,
        width: validatedOptions.width,
        height: validatedOptions.height,
    };
    var titleArea = paintTitleAndGetArea(ctx, chartArea, validatedOptions.title);
    var datasetsLabelsArea = paintLegendAndGetArea(ctx, chartArea.x, chartArea.y + titleArea.height, chartArea.width, validatedOptions.datasets);
    var remainingArea = {
        x: chartArea.x,
        y: datasetsLabelsArea.y + datasetsLabelsArea.height,
        width: chartArea.width,
        height: chartArea.height - (titleArea.height + datasetsLabelsArea.height),
    };
    var configuration = getConfiguration(remainingArea, validatedOptions.datasets);
    var painter = painterByTypeMap[validatedOptions.type];
    painter.paintSteps(ctx, configuration, validatedOptions);
    painter.paintLabels(ctx, configuration, validatedOptions);
    painter.paintValues(ctx, configuration, validatedOptions);
};
export var paintChart = function (rootElement, options) {
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
