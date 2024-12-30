/**
 * Scrapes YouTube video player data (current timestamp, video duration, and seek bar position) and sends it to the background script via chrome.runtime.sendMessage.
 * The data is scraped from the YouTube video player's progress bar and seek bar elements.
 * @returns {void}
 */
import { storeData } from "../app/redux/features/DeleteData";
import { store } from "../app/redux/store";
import { bookMarkImageLogoStyle } from "../helper/contentStyle";
import { youTubeIconLink } from "../helper/imageLink";
import {
  handleBookMarkPointer,
  handleBookMarkPointerRemover,
  handlePopup,
  handleTogglePopup,
  multipleInjectPointer,
} from "../helper/injectComponent";
import { DataInterface } from "../helper/interfaceType";

//created for listen updated book mark pointer
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type == "removerConformationPopupActive") {
    store.dispatch(storeData(message.data));
    handleTogglePopup("flex");
  } else if (message.type == "removePointerContentScriptDisable") {
    store.dispatch(
      storeData({
        positionIndex: -1,
        bookMarkData: [],
      })
    );
    handleTogglePopup("none");
  } else if (message.type == "removePointerContentScript") {
    await handleBookMarkPointerRemover();
    if (message.data.length > 0) {
      multipleInjectPointer(message.data);
    }
    sendResponse({ message: "success" });
  } else if (message.type == "urlChanged") {
    await handleBookMarkPointerRemover();
    handleStorePointerOnVideoLoad();
  }
});
/**
 * Scrapes the current YouTube video player data, including timestamp, video duration,
 * and seek bar position, and sends it to the background script.
 *
 * The function retrieves the minimum, maximum, current timestamp, and duration values
 * from the YouTube video player's progress bar. It also calculates the position of the
 * video on the seek bar and uses it to place a bookmark pointer on the progress bar.
 *
 * The scraped data is then sent to the background script using `chrome.runtime.sendMessage`.
 *
 * @returns {void}
 */
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
 * Retrieves the youtubeBookmarks array from local Chrome storage and
 * injects bookmarks into the YouTube video player's progress bar.
 * If the data is not present in local storage, no action is taken.
 * This function is called when the popup is opened or when the user
 * navigates to a new YouTube video.
 */
const handleStorePointerOnVideoLoad = () => {
  chrome.storage.local.get("youtubeBookmarks", (result) => {
    if (result.youtubeBookmarks) {
      multipleInjectPointer(result.youtubeBookmarks);
    }
  });
};
/**
 * Creates an image element with a YouTube bookmark icon and inserts it into the DOM right after the video controls.
 * The element is inserted as the first child of the element with a class name that starts with "ytp-right-controls".
 * If no such element is found, the element is appended to the end of the parent element.
 */
const main = () => {
  handleStorePointerOnVideoLoad();
  handlePopup();
  const entity = document.querySelector('[class^="ytp-right-controls"]');
  if (entity) {
    const image = document.createElement("img");
    image.src = youTubeIconLink;
    Object.assign(image.style, bookMarkImageLogoStyle);
    image.onclick = () => handleDataScraping();
    const firstChilde = entity.firstChild;

    if (firstChilde) {
      entity.insertBefore(image, firstChilde);
    } else {
      entity.appendChild(image);
    }
  }
};

main();
