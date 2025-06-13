import { Cabinet } from "@/interfaces";
import { cacheDataSheet, getCachedDataSheet } from "./cache.js";

export async function versionIsValid(dataType: string): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    fetch(`/api/${dataType}/modified`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.modifiedTime) {
          console.log(`Data version for ${dataType} is: ${data.modifiedTime}`);
          resolve(
            localStorage.getItem(`${dataType}_version`) === data.modifiedTime
          );
        }
      })
      .catch((error) => {
        console.error(`Failed to fetch version for ${dataType}:`, error);
        reject(error);
      });
  });
}

export async function setVersion(dataType: string, version: string) {
  localStorage.setItem(`${dataType}_version`, version);
}

export function getCabinets(): Cabinet[] {
  return getCachedDataSheet("cabinets") as Cabinet[];
}

export async function fetchCabinets(): Promise<Cabinet[]> {
  return fetch("/api/cabinets")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data.cabinets)) {
        throw new Error("Invalid data format");
      }

      cacheDataSheet(data.cabinets, "cabinets");

      setVersion("cabinets", data.version);

      return data.cabinets as Cabinet[];
    })
    .catch((error) => {
      console.error("Failed to fetch cabinets:", error);
      throw error;
    });
}

export function getCabinet(cabinetId: string, cabinets: Cabinet[]): Cabinet {;
  const data = cabinets.find(
    (cabinet: Cabinet) => cabinet.cabinetId === cabinetId
  );
  if (data) {
    return data as Cabinet;
  } else {
    throw new Error("Cabinet not found");
  }
}
