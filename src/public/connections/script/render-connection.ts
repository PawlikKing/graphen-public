import { Connection, Status } from "../../../interfaces/index.js";

export function renderConnection(connection: Connection): HTMLElement {
  const connectionElement = document.createElement("div");
  connectionElement.className = "connection";
  connectionElement.dataset.connectionId = connection.connectionId;

  const statusIndicator = document.createElement("span");
  statusIndicator.className = `status-indicator ${getStatusClass(
    connection.isActive
  )}`;
  statusIndicator.title = getStatusText(connection.isActive);

  const connectionInfo = document.createElement("div");
  connectionInfo.className = "connection-info";

  const panelInfo = document.createElement("div");
  panelInfo.className = "panel-info";
  panelInfo.innerHTML = `
        <strong>Panel:</strong> ${connection.panel.panel}
        <span class="port">Port ${connection.panelPort}</span>
    `;

  const switchInfo = document.createElement("div");
  switchInfo.className = "switch-info";
  switchInfo.innerHTML = `
        <strong>Switch:</strong> ${connection.switch.switch}
        <span class="port">Port ${connection.switchPort}</span>
    `;

  const metaInfo = document.createElement("div");
  metaInfo.className = "meta-info";

  if (connection.description) {
    const desc = document.createElement("h2");
    desc.className = "description";
    desc.textContent = connection.description;
    metaInfo.appendChild(desc);
  }

  if (connection.comment) {
    const comment = document.createElement("p");
    comment.className = "comment";
    comment.textContent = `Uwagi: ${connection.comment}`;
    metaInfo.appendChild(comment);
  }

  connectionInfo.appendChild(panelInfo);
  connectionInfo.appendChild(switchInfo);

  connectionElement.appendChild(statusIndicator);
  connectionElement.appendChild(connectionInfo);
  connectionElement.appendChild(metaInfo);

  return connectionElement;
}

export function renderConnections(
  connections: Connection[],
  container: HTMLElement
): void {
  container.innerHTML = "";

  const connectionsByPanel = new Map<string, Connection[]>();
  connections.forEach((conn) => {
    const panelId = conn.panel.panelId;
    if (!connectionsByPanel.has(panelId)) {
      connectionsByPanel.set(panelId, []);
    }
    connectionsByPanel.get(panelId)?.push(conn);
  });

  connectionsByPanel.forEach((panelConnections) => {
    const panel = panelConnections[0].panel;

    const panelSection = document.createElement("section");
    panelSection.className = "panel-section";
    panelSection.innerHTML = `
            <h3 class="panel-header">
                ${panel.panel}
                ${panel.ip ? `<span class="ip">${panel.ip}</span>` : ""}
                ${panel.mac ? `<span class="mac">${panel.mac}</span>` : ""}
            </h3>
            <div class="connections-container"></div>
        `;

    const connectionsContainer = panelSection.querySelector(
      ".connections-container"
    ) as HTMLElement;

    panelConnections.sort(
      (a, b) => parseInt(a.panelPort) - parseInt(b.panelPort)
    );

    panelConnections.forEach((conn) => {
      connectionsContainer.appendChild(renderConnection(conn));
    });

    container.appendChild(panelSection);
  });
}

function getStatusClass(status: Status): string {
  switch (status) {
    case true:
      return "active";
    case false:
      return "inactive";
    default:
      return "unknown";
  }
}

function getStatusText(status: Status): string {
  switch (status) {
    case true:
      return "Active connection";
    case false:
      return "Inactive connection";
    default:
      return "Connection status unknown";
  }
}
