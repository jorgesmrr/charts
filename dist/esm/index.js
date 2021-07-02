import { draw } from "./drawings.js";
import { setupOptions } from "./options.js";
var chart = function (rootElement, options) {
    if (!options)
        throw Error("You must provide the options!");
    if (!options.labels)
        throw Error("You must provide the labels!");
    if (!options.values)
        throw Error("You must provide the values!");
    draw(rootElement, setupOptions(options));
};
export default chart;
