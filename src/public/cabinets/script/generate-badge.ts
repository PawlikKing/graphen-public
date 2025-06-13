export function generateBadge(title: string, value: string): HTMLDivElement {
  const Badge = document.createElement("div");
  Badge.classList.add("badge");

  const title_element = document.createElement("span");
  title_element.classList.add("badge-title");
  title_element.innerText = title + ":";

  const value_element = document.createElement("span");
  value_element.classList.add("badge-value");
  value_element.innerText = value;

  Badge.appendChild(title_element);
  Badge.appendChild(value_element);

  return Badge;
}
