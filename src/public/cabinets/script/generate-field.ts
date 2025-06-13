export function generateField(title: string, value: string): HTMLDivElement {
  const Field = document.createElement("div");
  Field.classList.add("field");

  const title_element = document.createElement("span");
  title_element.classList.add("field-title");
  title_element.innerText = title + ":";

  const value_element = document.createElement("span");
  value_element.classList.add("field-value");
  value_element.innerText = value;

  Field.appendChild(title_element);
  Field.appendChild(value_element);

  return Field;
}
