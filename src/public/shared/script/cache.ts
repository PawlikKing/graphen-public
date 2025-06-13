export function cacheDataSheet(
  data: Record<string, any>,
  cacheKey: string
): void {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(cacheKey, jsonData);
  } catch (error) {
    console.error("Failed to cache data sheet:", error);
  }
}

export function getCachedDataSheet(cacheKey: string): Record<string, any> | null {
  try {
    const jsonData = localStorage.getItem(cacheKey);
    if (jsonData) {
      return JSON.parse(jsonData);
    }
  } catch (error) {
    console.error("Failed to retrieve cached data sheet:", error);
  }
  return null;
}   