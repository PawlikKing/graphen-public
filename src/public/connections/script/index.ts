import { renderConnection } from "./render-connection.js";
import { renderSwitchesAndPanels } from "./render-switches.js";
import {
  fetchCabinets,
  getCabinet,
  getCabinets,
  versionIsValid,
} from "../../shared/script/get.js";

const returnButton = document.getElementById(
  "return-to-cabinets"
) as HTMLButtonElement | null;
returnButton?.addEventListener("click", () => {
  window.location.href = "/cabinets";
});

const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get("id");
const displayType = localStorage.getItem("displayType") || "connections";

function failedToLoad() {
  const title = document.getElementById("main-title");
  if (!title) return;
  title.innerText = "Błąd ładowania danych";
  title.classList.add("non-existing");
}

function setTitle(title: string) {
  const Title = document.getElementById("main-title");
  if (!Title) return;
  Title.innerText = title;
}

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

  render();
} else {
  fetchCabinets()
    .then((_) => render())
    .catch((err) => {
      console.error("Error:", err);
      const container = document.getElementById("cabinet-container");
      if (container)
        container.innerHTML = `<div style="color: red;">Error loading data: ${err.message}</div>`;
      failedToLoad();
    });
}

function render() {
  const dynamicContent = document.getElementById(
    "dynamic-content"
  ) as HTMLElement;
  if (!dynamicContent) return;

  dynamicContent.innerHTML = "";

  if (idParam) {
    const cabinet = getCabinet(idParam, cabinets);

    setTitle(cabinet.name);

    if (displayType === "switch") {
      renderSwitchesAndPanels(
        cabinet.switches,
        cabinet.panels,
        cabinet.connections,
        dynamicContent
      );
    } else if (displayType === "connections") {
      cabinet.connections.forEach((connection) => {
        if (connection) {
          const renderedElement = renderConnection(connection);
          if (renderedElement) {
            dynamicContent.appendChild(renderedElement);
          }
        }
      });
    }
  }
}

document
  .getElementById("toggle-display-type")
  ?.addEventListener("click", () => {
    const currentDisplayType =
      localStorage.getItem("displayType") || "connections";
    const newDisplayType =
      currentDisplayType === "connections" ? "switch" : "connections";
    localStorage.setItem("displayType", newDisplayType);

    //render();
    window.location.reload();
  });
