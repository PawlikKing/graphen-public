import { Cabinet } from "../../../interfaces/index.js";
import { generateCabinet } from "./generate-cabinet.js";
import { generatePanel } from "./generate-panel.js";
import { generateSwitch } from "./generate-switch.js";

export function renderCabinets(cabinets: Cabinet[]) {
    const contentElement = document.getElementById("dynamic-content");
    if (contentElement) {
      cabinets.forEach((cabinet) => {
        const Panels: HTMLDivElement[] = [];
        const Switches: HTMLDivElement[] = [];
  
        cabinet.panels.forEach((pan) => {
          const Panel = generatePanel(
            pan.panelId,
            pan.panel,
            pan.ports,
            pan.mac,
            pan.ip
          );
          Panels.push(Panel);
        });
  
        cabinet.switches.forEach((sw) => {
          const Switch = generateSwitch(
            sw.switchId,
            sw.switch,
            sw.ports,
            sw.mac,
            sw.ip
          );
          Switches.push(Switch);
        });
  
        const Cabinet = generateCabinet(
          cabinet.cabinetId,
          cabinet.name,
          undefined,
          Panels,
          Switches
        );
        contentElement.appendChild(Cabinet);
      });
    }
  }
  