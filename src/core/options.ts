import {
  ChartDataset,
  ChartOptions,
  ChartValidatedDataset,
  ChartValidatedOptions,
} from "./../models";

const DATASETS_PALETTE = [
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

export const validateOptions: (options: ChartOptions) => ChartValidatedOptions =
  (options) => {
    const { datasets, gridLines = 3, width, height } = options;

    if (!datasets) throw Error("You must provide the datasets!");
    if (!width) throw Error("You must provide the width!");
    if (!height) throw Error("You must provide the height!");

    const validateDataset = (
      { color, ...dataset }: ChartDataset,
      index: number
    ): ChartValidatedDataset => ({
      ...dataset,
      color: color || DATASETS_PALETTE[index % DATASETS_PALETTE.length],
    });

    return {
      ...options,
      datasets: datasets.map(validateDataset),
      gridLines,
    };
  };
