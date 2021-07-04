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
import { horizontalBarPainter } from "../bar/horizontal.js";
import { verticalBarPainter } from "../bar/vertical.js";
import { handleOptions } from "./options.js";
var painterByTypeMap = (_a = {},
    _a["horizontal-bars"] = horizontalBarPainter,
    _a["vertical-bars"] = verticalBarPainter,
    _a);
var update = function (ctx, options) {
    var painter = painterByTypeMap[options.type];
    var finalOptions = handleOptions(options);
    painter.paintSteps(ctx, finalOptions);
    painter.paintLabels(ctx, finalOptions);
    painter.paintValues(ctx, finalOptions);
};
export var paintChart = function (rootElement, options) {
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
