import React from "react";
import { createRoot } from "react-dom/client";
import { localStorageDataInterface } from "./interfaceType";
import RemoveConformation from "../components/removeConformation";
import { Provider } from "react-redux";
import { store } from "../app/store";
// import RemoveConformation from "../components/removeConformation";

/**
 * Injects a single bookmark pointer into the YouTube video player's progress bar.
 *
 * Given a position (in pixels) in the progress bar, this function creates a
 * new `<div>` element with a yellow background and appends it to the progress
 * bar container at the given position. The element is positioned absolutely
 * and has a top position of 0px to align it with the top of the progress bar.
 * The element is given a z-index of 99 to ensure it appears above the progress
 * bar.
 *
 * @param {number | GLfloat | string} position - The position in pixels to place
 * the bookmark pointer in the progress bar.
 */
export const handleBookMarkPointer = (position: number | GLfloat | string) => {
  let progressBarContainer: any = document.querySelector(
    ".ytp-progress-bar-container"
  );
  let dot = document.createElement("div");
  dot.className = "youtube-bookmark-dot";
  dot.style.position = "absolute";
  dot.style.top = "0px"; // Align it to the top of the progress bar
  dot.style.left = `${position}px`; // Place the dot at the correct position
  dot.style.width = "3px"; // Dot size
  dot.style.height = "5px";
  dot.style.backgroundColor = "yellow";
  dot.style.zIndex = "99"; // Ensure it's above the progress bar

  // Append the dot to the progress bar container
  progressBarContainer.appendChild(dot);
};

/**
 * Injects multiple bookmark pointers into the YouTube video player's progress bar.
 *
 * This function iterates over the provided array of bookmark data and injects
 * a bookmark pointer at the correct position if the URL of the current tab
 * matches the URL of the bookmark. It does this by sending a message to the
 * background script to get the current tab URL, and then checks if the URLs
 * match by removing any timestamp parameters from both URLs. If the URLs
 * match, it calls `handleBookMarkPointer` to inject the bookmark pointer.
 * @param {localStorageDataInterface[]} data - An array of bookmark data objects
 */
export const multipleInjectPointer = (data: localStorageDataInterface[]) => {
  data.forEach((bookmark: localStorageDataInterface) => {
    // Send a message to background script to get the current tab URL
    chrome.runtime.sendMessage({ action: "getCurrentTabUrl" }, (response) => {
      let tabUrl: string = response.url; // Get the tab URL from the response
      let bookMarkUrl = bookmark.url;

      // Remove any timestamp parameters from both the current tab URL and the bookmark URL
      if (tabUrl?.includes("&t")) {
        tabUrl = tabUrl.split("&t")[0];
      }
      bookMarkUrl = bookMarkUrl.split("&t")[0];
      // Check if the URLs match
      if (tabUrl === bookMarkUrl) {
        handleBookMarkPointer(bookmark.position);
      }
    });
  });
};

/**
 * Asynchronously removes all bookmark pointers from the YouTube video player's progress bar.
 *
 * This function selects all elements with the class name 'youtube-bookmark-dot'
 * and removes them from the DOM. It's used to clear any existing bookmark pointers
 * on the progress bar. The operation is performed asynchronously.
 */
export const handleBookMarkPointerRemover = async () => {
  // Select all elements with the class 'youtube-bookmark-dot'
  const bookmarkDots = document.querySelectorAll(".youtube-bookmark-dot");
  // Iterate over the NodeList and remove each element
  new Promise((resolve) => {
    bookmarkDots.forEach((dot) => {
      dot.remove();
    });
  });
};

export const handlePopup = () => {
  const renderWrapper = document.createElement("div");
  renderWrapper.setAttribute(
    "style",
    `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 999999;
      font-size: 24px;
      pointer-events: all;
      `
  );
  renderWrapper.className = "yt-bookmark";
  const root = createRoot(renderWrapper);
  root.render(
    <Provider store={store}>
      <RemoveConformation />
    </Provider>
  );
  document.body.appendChild(renderWrapper);
};

export const handleTogglePopup = (value: string) => {
  const element = document.querySelector('[class^="yt-bookmark"]');
  // Check if element is found and cast to HTMLElement
  if (element && element instanceof HTMLElement) {
    // Change the display style to 'flex'
    element.style.display = value;
  }
};
