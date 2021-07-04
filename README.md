# @jorgemoreira/charts

A very simple library to render charts in HTML5 Canvas.

## Installation

```
npm install @jorgemoreira/charts
```

## Usage

```
import { paintChart } from "@jorgemoreira/charts";

const root = document.getElementById("chart-container");
paintChart(root, options)
```

### Options

| Name        | Data type | Description                                                                          |
| ----------- | --------- | ------------------------------------------------------------------------------------ |
| `type`      | `string`  | **Required**. Valid values: `"horizontal-bars"`, `"vertical-bars"`                   |
| `data`      | `array`   | **Required**. An array of objects in the format `{ label: "some text", value: 123 }` |
| `width`     | `number`  | **Required**. The canvas width, in pixels                                            |
| `height`    | `number`  | **Required**. The canvas height, in pixels                                           |
| `gridLines` | `number`  | How many lines must appear in the plot area                                          |
