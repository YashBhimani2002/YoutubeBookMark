import {
  DataInterface,
  localStorageDataInterface,
} from "../helper/interfaceType";


// created for return current tab url
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCurrentTabUrl") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tabUrl = tabs[0].url; // Get the URL of the current active tab
        sendResponse({ url: tabUrl });
      }
    });
    // Return true to indicate that the response will be sent asynchronously
    return true;
  }
});

//created for listen message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == "scrapeData") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs) {
        let data: DataInterface = { ...message.data };
        let url = tabs[0].url;
        if (url?.includes("&t")) {
          url = url.split("&t")[0];
        }
        let localStorageData: localStorageDataInterface[] = [];
        localStorageData.push({
          url: `${url}&t=${data.value}s`,
          duration: data.duration,
          position: data.position,
          timeText: formateTime(Number(data.value)),
          value: data.value,
        });

        chrome.storage.local.get("youtubeBookmarks", function (result) {
          if (result.youtubeBookmarks) {
            localStorageData = [
              ...result.youtubeBookmarks,
              ...localStorageData,
            ];
            localStoreData(localStorageData);
          } else {
            localStoreData(localStorageData);
          }
        });
      }
    });
  } else if (message.type == "playPause") {
    chrome.tabs.update({ url: message.url });
  } else if (message.type == "delete") {
    chrome.storage.local.get("youtubeBookmarks", function (result) {
      if (result.youtubeBookmarks) {
        const updatedData = result.youtubeBookmarks.filter(
          (_: any, index: number) => index !== message.number
        );
        localStoreData(updatedData);
        sendResponse({ message: "success" });
      }
    });
  } else if (message.type == "removePointer") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs) {
        chrome.tabs.sendMessage(tabs[0].id || 0, {
          type: "removePointerContentScript",
          data: message.updatedData,
        });
      }
    });
    sendResponse({ message: "success" });
  } else if (message.type == "activeRemoverConformationPopup") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id || 0, {
          type: "removePointerContentScriptDisable",
        });
      }
    })
  }
});

//created for listen url change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    // URL changed, send a message to the content script
    chrome.tabs.sendMessage(tabId, { type: "urlChanged"});
  }
});
/**
 * Stores the provided data in the local Chrome storage under the key "youtubeBookmarks".
 *
 * @param {localStorageDataInterface[]} data - An array of data objects to be stored in local storage.
 */

/**
 * Stores the provided data in the local Chrome storage under the key "youtubeBookmarks".
 *
 * @param {localStorageDataInterface[]} data - An array of data objects to be stored in local storage.
 */
const localStoreData = (data: localStorageDataInterface[]) => {
  chrome.storage.local.set({ youtubeBookmarks: data });
};

/**
 * Format a time in seconds into a string of the form "HH:MM:SS" or "MM:SS"
 * if the number of hours is zero.
 * @param {number} seconds The number of seconds to format.
 * @returns {string} The formatted time string.
 */
const formateTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  if (formattedHours == "00") {
    return `${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
};
