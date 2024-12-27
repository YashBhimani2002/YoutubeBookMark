/**
 * Scrapes YouTube video player data (current timestamp, video duration, and seek bar position) and sends it to the background script via chrome.runtime.sendMessage.
 * The data is scraped from the YouTube video player's progress bar and seek bar elements.
 * @returns {void}
 */

import { youTubeIconLink } from "../helper/imageLink";
import {
  handleBookMarkPointer,
  handleBookMarkPointerRemover,
  multipleInjectPointer,
} from "../helper/injectComponent";
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
    let video: any = document.querySelector("video");
    let currentTime = video.currentTime;
    let progressBarContainer: any = document.querySelector(
      ".ytp-progress-bar-container"
    );
    let progressBarWidth: any = progressBarContainer.offsetWidth;
    let videoDuration: any = video.duration; // Get the video duration
    let position = (currentTime / videoDuration) * progressBarWidth;
    handleBookMarkPointer(position);
    data.position = position.toString() || "";
  }

  chrome.runtime.sendMessage({ type: "scrapeData", data: data });
};
/**
 * Creates and places a yellow dot on the YouTube video progress bar at a specified position.
 *
 * @param {Object} progressBarContainer - The container element of the progress bar where the dot will be appended.
 * @param {number | GLfloat | string} position - The position on the progress bar where the dot should be placed.
 * The position can be a number, GLfloat, or string representing the pixel offset from the left.
 */

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

export const handleStorePointerOnVideoLoad = () => {
  chrome.storage.local.get("youtubeBookmarks", (result) => {
    if (result.youtubeBookmarks) {
      multipleInjectPointer(result.youtubeBookmarks);
    }
  });
};

handleStorePointerOnVideoLoad();
handleDocumentMutations();

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type == "removePointerContentScript") {
    await handleBookMarkPointerRemover();
    if (message.data.length > 0) {
      multipleInjectPointer(message.data);
    }
    sendResponse({ message: "success" });
  }
});
