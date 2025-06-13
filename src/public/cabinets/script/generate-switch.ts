import { generateField } from "./generate-field.js";

export function generateSwitch(
  switchId: string,
  name: string,
  ports: number,
  mac?: string,
  ip?: string
): HTMLDivElement {
  const Switch = document.createElement("div");
  Switch.classList.add("switch");
  Switch.dataset.panelId = switchId;

  const title_element = document.createElement("h3");
  title_element.classList.add("switch-title");
  title_element.innerText = "Switch: " + name;

  const ports_element = document.createElement("p");
  ports_element.classList.add("switch-ports");
  ports_element.innerText = `Porty: ${ports}`;

  const mac_field = generateField("mac", mac || "nieznany");
  const ip_field = generateField("ip", ip || "nieznany");

  Switch.appendChild(title_element);
  Switch.appendChild(ports_element);
  Switch.appendChild(mac_field);
  Switch.appendChild(ip_field);

  return Switch;
}
