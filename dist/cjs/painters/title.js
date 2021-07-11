"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paintTitleAndGetArea = void 0;
var paintTitleAndGetArea = function (ctx, area, title) {
    var titleArea = {
        x: area.x,
        y: area.y,
        width: area.width,
        height: 50,
    };
    var textDimensions = ctx.measureText(title);
    var originX = titleArea.x + titleArea.width / 2;
    var centeredX = originX - textDimensions.width / 2;
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText(title, centeredX, titleArea.y + titleArea.height / 2);
    return titleArea;
};
exports.paintTitleAndGetArea = paintTitleAndGetArea;
