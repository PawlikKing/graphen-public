import {
  fetchCabinets,
  getCabinets,
  versionIsValid,
} from "../../shared/script/get.js";
import { renderCabinets } from "./render-cabinets.js";

const cabinets = getCabinets();
if (cabinets && cabinets[0]) {
  versionIsValid("cabinets")
    .then((isValid) => {
      if (!isValid) {
        const updateButton = document.getElementById("update-button");
        updateButton?.classList.remove("hidden");
        updateButton?.addEventListener("click", () => {
          fetchCabinets().then(() => {
            window.location.reload();
          });
        });
      }
    })
    .catch((err) => {
      console.error("Error checking version:", err);
    });

  renderCabinets(cabinets);
} else {
  fetchCabinets()
    .then((_) => window.location.reload())
    .catch((err) => {
      console.error("Error:", err);
    });
}
