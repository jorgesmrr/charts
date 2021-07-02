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
import { handleOptions } from "./options.js";
var update = function (painter, ctx, options) {
    var finalOptions = handleOptions(options);
    painter.paintSteps(ctx, finalOptions);
    painter.paintLabels(ctx, finalOptions);
    painter.paintValues(ctx, finalOptions);
};
export var paintChart = function (rootElement, painter, options) {
    if (!options)
        throw Error("You must provide the options!");
    if (!options.labels)
        throw Error("You must provide the labels!");
    if (!options.values)
        throw Error("You must provide the values!");
    if (!options.width)
        throw Error("You must provide the width!");
    if (!options.height)
        throw Error("You must provide the height!");
    rootElement.innerHTML = "<canvas id=\"canvas\" width=\"" + options.width + "\" height=\"" + options.height + "\" style=\"" + options.style + "\" />";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "16px sans-serif";
    update(painter, ctx, options);
    var wrappedUpdate = function (values, labels) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        update(painter, ctx, __assign(__assign({}, options), { values: values, labels: labels }));
    };
    return {
        update: wrappedUpdate,
    };
};
