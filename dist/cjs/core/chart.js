"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paintChart = void 0;
var horizontal_js_1 = require("../painters/bar/horizontal.js");
var vertical_js_1 = require("../painters/bar/vertical.js");
var legend_js_1 = require("../painters/legend.js");
var title_js_1 = require("../painters/title.js");
var options_js_1 = require("./options.js");
var configuration_js_1 = require("./configuration.js");
var painterByTypeMap = (_a = {},
    _a["horizontal-bars"] = horizontal_js_1.horizontalBarPainter,
    _a["vertical-bars"] = vertical_js_1.verticalBarPainter,
    _a);
var update = function (ctx, options) {
    var validatedOptions = options_js_1.validateOptions(options);
    var chartArea = {
        x: 0,
        y: 0,
        width: validatedOptions.width,
        height: validatedOptions.height,
    };
    var titleArea = validatedOptions.title
        ? title_js_1.paintTitleAndGetArea(ctx, chartArea, validatedOptions.title)
        : null;
    var datasetsLabelsArea = legend_js_1.paintLegendAndGetArea(ctx, chartArea.x, chartArea.y + ((titleArea === null || titleArea === void 0 ? void 0 : titleArea.height) || 0), chartArea.width, validatedOptions.datasets);
    var remainingArea = {
        x: chartArea.x,
        y: datasetsLabelsArea.y + datasetsLabelsArea.height,
        width: chartArea.width,
        height: chartArea.height - (((titleArea === null || titleArea === void 0 ? void 0 : titleArea.height) || 0) + datasetsLabelsArea.height),
    };
    var configuration = configuration_js_1.getConfiguration(remainingArea, validatedOptions.datasets, validatedOptions.gridLinesDistance);
    var painter = painterByTypeMap[validatedOptions.type];
    painter.paintSteps(ctx, configuration, validatedOptions);
    painter.paintLabels(ctx, configuration, validatedOptions);
    painter.paintValues(ctx, configuration, validatedOptions);
};
var paintChart = function (rootElement, options) {
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
exports.paintChart = paintChart;
