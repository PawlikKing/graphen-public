export function parseStatus(statusValue: any): boolean | null {
  if (!statusValue) return null;

  const statusStr = String(statusValue).trim().toLowerCase();
  if (statusStr === "on") return true;
  if (statusStr === "off") return false;

  return null;
}
