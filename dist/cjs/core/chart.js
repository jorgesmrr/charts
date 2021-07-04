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
var horizontal_js_1 = require("../bar/horizontal.js");
var vertical_js_1 = require("../bar/vertical.js");
var options_js_1 = require("./options.js");
var painterByTypeMap = (_a = {},
    _a["horizontal-bars"] = horizontal_js_1.horizontalBarPainter,
    _a["vertical-bars"] = vertical_js_1.verticalBarPainter,
    _a);
var update = function (ctx, options) {
    var painter = painterByTypeMap[options.type];
    var finalOptions = options_js_1.handleOptions(options);
    painter.paintSteps(ctx, finalOptions);
    painter.paintLabels(ctx, finalOptions);
    painter.paintValues(ctx, finalOptions);
};
var paintChart = function (rootElement, options) {
    if (!options)
        throw Error("You must provide the options!");
    if (!options.data)
        throw Error("You must provide the data!");
    if (!options.width)
        throw Error("You must provide the width!");
    if (!options.height)
        throw Error("You must provide the height!");
    rootElement.innerHTML = "<canvas id=\"canvas\" width=\"" + options.width + "\" height=\"" + options.height + "\" />";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "16px sans-serif";
    update(ctx, options);
    var wrappedUpdate = function (data) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        update(ctx, __assign(__assign({}, options), { data: data }));
    };
    return {
        update: wrappedUpdate,
    };
};
exports.paintChart = paintChart;
