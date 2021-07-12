# @jorgemoreira/charts

> A library to render bar charts in HTML5 Canvas.

## Live Demo

https://jorgemoreira-charts.netlify.app/

## Installation

```bash
npm install @jorgemoreira/charts
```

## Usage

```javascript
import { paintChart } from "@jorgemoreira/charts";

const root = document.getElementById("chart-wrapper");
paintChart(root, options);
```

### `options` properties

| Name                | Type        | Description                                                           |
| ------------------- | ----------- | --------------------------------------------------------------------- |
| `type`              | `string`    | **Required**. Can be `"horizontal-bars"` or `"vertical-bars"`.        |
| `labels`            | `string[]`  | **Required**. An array of labels for the category axis.               |
| `datasets`          | `dataset[]` | **Required**. An array of [datasets](#dataset-properties).            |
| `width`             | `number`    | **Required**. The canvas width, in pixels.                            |
| `height`            | `number`    | **Required**. The canvas height, in pixels.                           |
| `gridLinesDistance` | `number`    | **Required**. The distance between the grid lines in the values axis. |
| `title`             | `string`    | Text to display at the top.                                           |

### `dataset` properties

| Name    | Type       | Description                                                                             |
| ------- | ---------- | --------------------------------------------------------------------------------------- |
| `label` | `string`   | **Required**. The label to show in the legend.                                          |
| `data`  | `number[]` | **Required**. The dataset values.                                                       |
| `color` | `string`   | A color value. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). |
