export interface Panel {
  panelId: string;
  panel: string;
  ip: string | undefined;
  mac: string | undefined;
  ports: number;
}

export interface Switch {
  switchId: string;
  switch: string;
  ip: string | undefined;
  mac: string | undefined;
  ports: number;
}

export type Status = boolean | null;

export interface Connection {
  connectionId: string;
  panel: Panel;
  panelPort: string;
  switch: Switch;
  switchPort: string;
  description: string | null;
  isActive: Status;
  comment: string | null;
}

export interface Cabinet {
  cabinetId: string;
  name: string;
  connections: Connection[];
  panels: Panel[];
  switches: Switch[];
}
