/**
 * Scrapes YouTube video player data (current timestamp, video duration, and seek bar position) and sends it to the background script via chrome.runtime.sendMessage.
 * The data is scraped from the YouTube video player's progress bar and seek bar elements.
 * @returns {void}
 */

import { youTubeIconLink } from "../helper/imageLink";
import { DataInterface } from "../helper/interfaceType";

const handleDataScraping = (): void => {
  const data: DataInterface = {
    minValue: "",
    maxValue: "",
    value: "",
    duration: "",
    position: "",
  };
  const timeTrackerElement = document.querySelector(
    '[class="ytp-progress-bar"]'
  );
  if (timeTrackerElement) {
    data.minValue = timeTrackerElement.ariaValueMin || "";
    data.maxValue = timeTrackerElement.ariaValueMax || "";
    data.value = timeTrackerElement.ariaValueNow || "";
    data.duration = timeTrackerElement.ariaValueText || "";
  }
  const positionTrackerElement = document.querySelector(
    '[class^="ytp-play-progress ytp-swatch-background-color"]'
  );
  if (positionTrackerElement) {
    const computedStyles = window.getComputedStyle(positionTrackerElement);
    // const transformValue: string = computedStyles.getPropertyValue("transform");

    // if (transformValue && transformValue.startsWith("matrix")) {
    //   const matrixValue = parseFloat(
    //     transformValue.match(/matrix\(([^,]+)/)?.[1] ?? "0"
    //   );
      data.position =  "";
    // }
  }

  chrome.runtime.sendMessage({ type: "scrapeData", data: data });
};

/**
 * Creates an image element with a YouTube bookmark icon and inserts it into the DOM right after the video controls.
 * The element is inserted as the first child of the element with a class name that starts with "ytp-right-controls".
 * If no such element is found, the element is appended to the end of the parent element.
 */
const handleDocumentMutations = () => {
  const entity = document.querySelector('[class^="ytp-right-controls"]');

  if (entity) {
    const image = document.createElement("img");
    image.src = youTubeIconLink;
    image.style.marginBottom = "15px";
    image.style.marginRight = "10px";
    image.style.cursor = "pointer";
    image.style.width = "20px";
    image.style.height = "20px";
    image.onclick = () => handleDataScraping();
    const firstChilde = entity.firstChild;

    if (firstChilde) {
      entity.insertBefore(image, firstChilde);
    } else {
      entity.appendChild(image);
    }
  }
};

handleDocumentMutations();
