import XLSX from "xlsx";
import { parseStatus } from "../utils/index.js";
import { Cabinet, Connection, Panel, Switch } from "../interfaces/index.js";
import { v4 as uuidv4 } from "uuid";

export function processNetworkExcel(filePath: string): Cabinet[] {
  try {
    const workbook = XLSX.readFile(filePath);
    const cabinets: Cabinet[] = [];

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(
        worksheet,
        {
          raw: false,
          defval: "",
        }
      );

      const connections: Connection[] = [];
      const panels = new Map<string, Panel>();
      const switches = new Map<string, Switch>();

      const firstRow = jsonData[0] || {};
      const columns = Object.keys(firstRow);

      const requiredColumns = [
        "panel/port",
        "Opis panel",
        "Status portu",
        "Uwagi",
      ];
      const hasRequiredColumns = requiredColumns.every((col) =>
        columns.includes(col)
      );
      if (!hasRequiredColumns) return;

      jsonData.forEach((row) => {
        const panelPortValue = row["panel/port"];
        if (!panelPortValue) return;

        const panelPortParts = String(panelPortValue).split(".");
        if (panelPortParts.length < 2) return;

        const [panelName, panelPort] = panelPortParts.map((p) => p.trim());
        if (!panelName || !panelPort) return;

        let panel: Panel;
        if (!panels.has(panelName)) {
          panel = {
            panelId: uuidv4(),
            panel: panelName,
            ip: undefined,
            mac: undefined,
            ports: 0,
          };
          panels.set(panelName, panel);
        } else {
          panel = panels.get(panelName)!;
        }

        const portNumber = parseInt(panelPort);
        if (!isNaN(portNumber)) {
          panel.ports = Math.max(panel.ports, portNumber);
        }

        const switchColumns = columns.filter(
          (col) =>
            !requiredColumns.includes(col) &&
            col !== "panel/port" &&
            col.trim() !== ""
        );

        let connectedSwitch: Switch | undefined;
        let switchPort = "";

        for (const switchName of switchColumns) {
          const portValue = row[switchName];
          if (!portValue) continue;

          const switchPortNumber = String(portValue).trim();
          if (switchPortNumber) {
            if (!switches.has(switchName)) {
              const newSwitch: Switch = {
                switchId: uuidv4(),
                switch: switchName,
                ip: undefined,
                mac: undefined,
                ports: 24,
              };
              switches.set(switchName, newSwitch);
            }
            connectedSwitch = switches.get(switchName)!;
            switchPort = switchPortNumber;

            const numericPort = parseInt(switchPortNumber);
            if (!isNaN(numericPort)) {
              connectedSwitch.ports = Math.max(
                connectedSwitch.ports,
                numericPort
              );

              if (numericPort > 24) {
                connectedSwitch.ports = 48;
              }
            }
            break;
          }
        }

        if (panel && connectedSwitch) {
          const connection: Connection = {
            connectionId: uuidv4(),
            panel,
            panelPort,
            switch: connectedSwitch,
            switchPort,
            description: row["Opis panel"] || null,
            isActive: parseStatus(row["Status portu"]),
            comment: row["Uwagi"] || null,
          };
          connections.push(connection);
        }
      });

      if (connections.length > 0) {
        cabinets.push({
          cabinetId: uuidv4(),
          name: sheetName,
          connections,
          panels: Array.from(panels.values()),
          switches: Array.from(switches.values()),
        });
      }
    });

    return cabinets;
  } catch (error) {
    console.error("Error processing network Excel file:", error);
    return [];
  }
}
