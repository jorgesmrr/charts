import { draw } from "./drawings.js";
import { IChartOptions } from "./models.js";
import { setupOptions } from "./options.js";

const chart: (rootElement: HTMLElement, options: IChartOptions) => void = (
  rootElement,
  options
) => {
  if (!options) throw Error("You must provide the options!");
  if (!options.labels) throw Error("You must provide the labels!");
  if (!options.values) throw Error("You must provide the values!");

  draw(rootElement, setupOptions(options));
};

export default chart;
