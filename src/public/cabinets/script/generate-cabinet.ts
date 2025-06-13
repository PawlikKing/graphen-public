export function generateCabinet(
  cabinetId: string,
  title: string,
  badgesHtml?: HTMLDivElement[],
  panelsHtml?: HTMLDivElement[],
  switchesHtml?: HTMLDivElement[]
): HTMLDivElement {
  const Cabinet = document.createElement("div");
  Cabinet.classList.add("cabinet");
  Cabinet.dataset.cabinetId = cabinetId;

  function onMouseUp() {
    window.location.replace(`/cabinets/?id=${Cabinet.dataset.cabinetId}`);
  }

  Cabinet.addEventListener("mouseup", onMouseUp, false);

  const title_element = document.createElement("h2");
  title_element.classList.add("cabinet-title");
  title_element.innerText = title;

  const badges = document.createElement("div");
  badges.classList.add("cabinet-badges");

  const devices = document.createElement("div");
  devices.classList.add("cabinet-devices");

  if (badgesHtml)
    badgesHtml.forEach((element) => {
      badges.appendChild(element);
    });

  if (panelsHtml)
    panelsHtml.forEach((element) => {
      devices.appendChild(element);
    });

  if (switchesHtml)
    switchesHtml.forEach((element) => {
      devices.appendChild(element);
    });

  Cabinet.appendChild(title_element);
  Cabinet.appendChild(badges);
  Cabinet.appendChild(devices);

  return Cabinet;
}
