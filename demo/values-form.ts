import { ChartData } from "../dist/esm/models.js";

const createInput = (data: ChartData, onInput: () => void) => {
  const input = document.createElement("input");

  input.setAttribute("type", "number");
  input.setAttribute("value", data.value.toString());
  input.addEventListener("input", ({ target }) => {
    data.value = Number((target as HTMLInputElement).value);
    onInput();
  });

  return input;
};

const createLabelWithInput = (text: string, input: HTMLInputElement) => {
  const label = document.createElement("label");

  label.innerText = text;
  label.appendChild(input);

  return label;
};

const createButton = (
  label: string,
  onClickHandler: (ev: MouseEvent) => void
) => {
  const button = document.createElement("button");
  button.innerText = label;
  button.setAttribute("type", "button");
  button.addEventListener("click", onClickHandler);
  return button;
};

const createIncrementButton = (
  data: ChartData,
  increment: number,
  onIncrement: () => void
) => {
  return createButton(
    `${increment > 0 ? "+" : "-"}${Math.abs(increment)}`,
    () => {
      data.value += increment;
      onIncrement();
    }
  );
};

const dataForm = (
  root: HTMLElement,
  data: ChartData,
  onChange: () => void
): void => {
  const container = document.createElement("div");

  const input = createInput(data, onChange);
  const labelWithInput = createLabelWithInput(data.label, input);

  const onIncrement = () => {
    input.value = data.value.toString();
    onChange();
  };

  container.appendChild(labelWithInput);
  container.appendChild(createIncrementButton(data, -10, onIncrement));
  container.appendChild(createIncrementButton(data, 10, onIncrement));

  root.appendChild(container);
};

export default dataForm;
