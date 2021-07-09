const createInput = (data: number[], index: number, onInput: () => void) => {
  const input = document.createElement("input");

  input.setAttribute("type", "number");
  input.setAttribute("value", data[index].toString());
  input.addEventListener("input", ({ target }) => {
    data[index] = Number((target as HTMLInputElement).value);
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
  data: number[],
  index: number,
  increment: number,
  onIncrement: () => void
) => {
  return createButton(
    `${increment > 0 ? "+" : "-"}${Math.abs(increment)}`,
    () => {
      data[index] += increment;
      onIncrement();
    }
  );
};

const dataForm = (
  root: HTMLElement,
  data: number[],
  index: number,
  onChange: () => void
): void => {
  const container = document.createElement("div");

  const input = createInput(data, index, onChange);
  const labelWithInput = createLabelWithInput(index.toString(), input);

  const onIncrement = () => {
    input.value = data[index].toString();
    onChange();
  };

  container.appendChild(labelWithInput);
  container.appendChild(createIncrementButton(data, index, -10, onIncrement));
  container.appendChild(createIncrementButton(data, index, 10, onIncrement));

  root.appendChild(container);
};

export default dataForm;
