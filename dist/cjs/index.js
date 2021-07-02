"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drawings_js_1 = require("./drawings.js");
var options_js_1 = require("./options.js");
var chart = function (rootElement, options) {
    if (!options)
        throw Error("You must provide the options!");
    if (!options.labels)
        throw Error("You must provide the labels!");
    if (!options.values)
        throw Error("You must provide the values!");
    drawings_js_1.draw(rootElement, options_js_1.setupOptions(options));
};
exports.default = chart;
