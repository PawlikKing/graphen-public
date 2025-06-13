import { Connection, Switch, Panel } from "../../../interfaces/index.js";

export function renderSwitchesAndPanels(
  switches: Switch[],
  panels: Panel[],
  connections: Connection[],
  container: HTMLElement
): void {
  container.innerHTML = "";

  const canvas = document.createElement("canvas");
  canvas.className = "connection-canvas";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Failed to get canvas context");
    return;
  }

  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;

  switches.forEach((switchObj) => {
    const switchElement = document.createElement("div");
    switchElement.className = "switch-backplate";
    switchElement.dataset.switchId = switchObj.switchId;

    const switchHeader = document.createElement("h3");
    switchHeader.className = "switch-header";
    switchHeader.textContent = switchObj.switch;
    switchElement.appendChild(switchHeader);

    const portsContainer = document.createElement("div");
    portsContainer.className = "ports-container";
    for (let port = 1; port <= switchObj.ports; port++) {
      const portElement = document.createElement("div");
      portElement.className = "port";
      portElement.textContent = `Port ${port}`;
      portElement.dataset.portId = port.toString();
      portsContainer.appendChild(portElement);
    }

    switchElement.appendChild(portsContainer);
    container.appendChild(switchElement);
  });

  panels.forEach((panelObj) => {
    const panelElement = document.createElement("div");
    panelElement.className = "panel-backplate";
    panelElement.dataset.panelId = panelObj.panelId;

    const panelHeader = document.createElement("h3");
    panelHeader.className = "panel-header";
    panelHeader.textContent = panelObj.panel;
    panelElement.appendChild(panelHeader);

    const portsContainer = document.createElement("div");
    portsContainer.className = "ports-container";
    for (let port = 1; port <= panelObj.ports; port++) {
      const portElement = document.createElement("div");
      portElement.className = "port";
      portElement.textContent = `Port ${port}`;
      portElement.dataset.portId = port.toString();
      portsContainer.appendChild(portElement);
    }

    panelElement.appendChild(portsContainer);
    container.appendChild(panelElement);
  });

  connections.forEach((connection) => {
    const panelElement = container.querySelector(
      `[data-panel-id="${connection.panel.panelId}"]`
    );
    const switchElement = container.querySelector(
      `[data-switch-id="${connection.switch.switchId}"]`
    );
    const panelPortElement = panelElement?.querySelector(
      `[data-port-id="${connection.panelPort}"]`
    );
    const switchPortElement = switchElement?.querySelector(
      `[data-port-id="${connection.switchPort}"]`
    );

    /*if (panelPortElement && switchPortElement) {
      const panelPortRect = panelPortElement.getBoundingClientRect();
      const switchPortRect = switchPortElement.getBoundingClientRect();

      const startX = panelPortRect.left + panelPortRect.width / 2;
      const startY = panelPortRect.top + panelPortRect.height / 2;
      const endX = switchPortRect.left + switchPortRect.width / 2;
      const endY = switchPortRect.top + switchPortRect.height / 2;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(startX, startY + 50, endX, endY - 50, endX, endY);
      ctx.strokeStyle = "#666";
      ctx.lineWidth = 2;
      ctx.stroke();
    }*/
  });
}
