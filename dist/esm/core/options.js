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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var DATASETS_PALETTE = [
    "#d9ed92",
    "#b5e48c",
    "#99d98c",
    "#76c893",
    "#52b69a",
    "#34a0a4",
    "#168aad",
    "#1a759f",
    "#1e6091",
    "#184e77",
];
export var validateOptions = function (options) {
    var datasets = options.data.datasets, _a = options.gridLinesDistance, gridLinesDistance = _a === void 0 ? 3 : _a, width = options.width, height = options.height;
    if (!datasets)
        throw Error("You must provide the datasets!");
    if (!width)
        throw Error("You must provide the width!");
    if (!height)
        throw Error("You must provide the height!");
    var validateDataset = function (_a, index) {
        var color = _a.color, dataset = __rest(_a, ["color"]);
        return (__assign(__assign({}, dataset), { color: color || DATASETS_PALETTE[index % DATASETS_PALETTE.length] }));
    };
    return __assign(__assign({}, options), { data: __assign(__assign({}, options.data), { datasets: datasets.map(validateDataset) }), gridLinesDistance: gridLinesDistance });
};
