import { generateField } from "./generate-field.js";

export function generatePanel(
  panelId: string,
  name: string,
  ports: number,
  mac?: string,
  ip?: string
): HTMLDivElement {
  const Panel = document.createElement("div");
  Panel.classList.add("panel");
  Panel.dataset.panelId = panelId;

  const title_element = document.createElement("h3");
  title_element.classList.add("panel-title");
  title_element.innerText = "Panel: " + name;

  const ports_element = document.createElement("p");
  ports_element.classList.add("panel-ports");
  ports_element.innerText = `Porty: ${ports}`;

  const mac_field = generateField("mac", mac || "nieznany");
  const ip_field = generateField("ip", ip || "nieznany");

  Panel.appendChild(title_element);
  Panel.appendChild(ports_element);
  Panel.appendChild(mac_field);
  Panel.appendChild(ip_field);

  return Panel;
}
