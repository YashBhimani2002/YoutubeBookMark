/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});
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
                let data = Object.assign({}, message.data);
                let url = tabs[0].url;
                if (url === null || url === void 0 ? void 0 : url.includes("&t")) {
                    url = url.split("&t")[0];
                }
                let localStorageData = [];
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
                    }
                    else {
                        localStoreData(localStorageData);
                    }
                });
            }
        });
    }
    else if (message.type == "playPause") {
        chrome.tabs.update({ url: message.url });
    }
    else if (message.type == "delete") {
        chrome.storage.local.get("youtubeBookmarks", function (result) {
            if (result.youtubeBookmarks) {
                const updatedData = result.youtubeBookmarks.filter((_, index) => index !== message.number);
                localStoreData(updatedData);
                sendResponse({ message: "success" });
            }
        });
    }
    else if (message.type == "removePointer") {
        // chrome.runtime.sendMessage({ type: "removePointerContentScript" });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs) {
                chrome.tabs.sendMessage(tabs[0].id || 0, {
                    type: "removePointerContentScript",
                    data: message.updatedData,
                });
            }
        });
        sendResponse({ message: "success" });
    }
});
//created for listen url change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        // URL changed, send a message to the content script
        chrome.tabs.sendMessage(tabId, { type: "urlChanged" });
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
const localStoreData = (data) => {
    chrome.storage.local.set({ youtubeBookmarks: data });
};
/**
 * Format a time in seconds into a string of the form "HH:MM:SS" or "MM:SS"
 * if the number of hours is zero.
 * @param {number} seconds The number of seconds to format.
 * @returns {string} The formatted time string.
 */
const formateTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    if (formattedHours == "00") {
        return `${formattedMinutes}:${formattedSeconds}`;
    }
    else {
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
};


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixtQ0FBbUM7QUFDL0Q7QUFDQSw0Q0FBNEM7QUFDNUMsK0JBQStCLGFBQWE7QUFDNUM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixtQ0FBbUM7QUFDL0Q7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLElBQUksS0FBSyxXQUFXO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDZCQUE2QixrQkFBa0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esd0NBQXdDLG9DQUFvQztBQUM1RSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNULHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsb0JBQW9CO0FBQzdEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsNkJBQTZCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyw2QkFBNkI7QUFDeEM7QUFDQTtBQUNBLCtCQUErQix3QkFBd0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUIsR0FBRyxpQkFBaUI7QUFDdkQ7QUFDQTtBQUNBLGtCQUFrQixlQUFlLEdBQUcsaUJBQWlCLEdBQUcsaUJBQWlCO0FBQ3pFO0FBQ0E7QUFDVSIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJFeHRlbnNpb24gaW5zdGFsbGVkXCIpO1xufSk7XG4vLyBjcmVhdGVkIGZvciByZXR1cm4gY3VycmVudCB0YWIgdXJsXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBcImdldEN1cnJlbnRUYWJVcmxcIikge1xuICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCAodGFicykgPT4ge1xuICAgICAgICAgICAgaWYgKHRhYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhYlVybCA9IHRhYnNbMF0udXJsOyAvLyBHZXQgdGhlIFVSTCBvZiB0aGUgY3VycmVudCBhY3RpdmUgdGFiXG4gICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgdXJsOiB0YWJVcmwgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBSZXR1cm4gdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IHRoZSByZXNwb25zZSB3aWxsIGJlIHNlbnQgYXN5bmNocm9ub3VzbHlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSk7XG4vL2NyZWF0ZWQgZm9yIGxpc3RlbiBtZXNzYWdlXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKG1lc3NhZ2UudHlwZSA9PSBcInNjcmFwZURhdGFcIikge1xuICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgICAgICAgaWYgKHRhYnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIG1lc3NhZ2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHRhYnNbMF0udXJsO1xuICAgICAgICAgICAgICAgIGlmICh1cmwgPT09IG51bGwgfHwgdXJsID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1cmwuaW5jbHVkZXMoXCImdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSB1cmwuc3BsaXQoXCImdFwiKVswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxvY2FsU3RvcmFnZURhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2VEYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGAke3VybH0mdD0ke2RhdGEudmFsdWV9c2AsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogZGF0YS5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgdGltZVRleHQ6IGZvcm1hdGVUaW1lKE51bWJlcihkYXRhLnZhbHVlKSksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnZhbHVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcInlvdXR1YmVCb29rbWFya3NcIiwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnlvdXR1YmVCb29rbWFya3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZURhdGEgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucmVzdWx0LnlvdXR1YmVCb29rbWFya3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ubG9jYWxTdG9yYWdlRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JlRGF0YShsb2NhbFN0b3JhZ2VEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmVEYXRhKGxvY2FsU3RvcmFnZURhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT0gXCJwbGF5UGF1c2VcIikge1xuICAgICAgICBjaHJvbWUudGFicy51cGRhdGUoeyB1cmw6IG1lc3NhZ2UudXJsIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT0gXCJkZWxldGVcIikge1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJ5b3V0dWJlQm9va21hcmtzXCIsIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQueW91dHViZUJvb2ttYXJrcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWREYXRhID0gcmVzdWx0LnlvdXR1YmVCb29rbWFya3MuZmlsdGVyKChfLCBpbmRleCkgPT4gaW5kZXggIT09IG1lc3NhZ2UubnVtYmVyKTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JlRGF0YSh1cGRhdGVkRGF0YSk7XG4gICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgbWVzc2FnZTogXCJzdWNjZXNzXCIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT0gXCJyZW1vdmVQb2ludGVyXCIpIHtcbiAgICAgICAgLy8gY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyB0eXBlOiBcInJlbW92ZVBvaW50ZXJDb250ZW50U2NyaXB0XCIgfSk7XG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICAgICAgICBpZiAodGFicykge1xuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQgfHwgMCwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlbW92ZVBvaW50ZXJDb250ZW50U2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG1lc3NhZ2UudXBkYXRlZERhdGEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBtZXNzYWdlOiBcInN1Y2Nlc3NcIiB9KTtcbiAgICB9XG59KTtcbi8vY3JlYXRlZCBmb3IgbGlzdGVuIHVybCBjaGFuZ2VcbmNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcigodGFiSWQsIGNoYW5nZUluZm8sIHRhYikgPT4ge1xuICAgIGlmIChjaGFuZ2VJbmZvLnVybCkge1xuICAgICAgICAvLyBVUkwgY2hhbmdlZCwgc2VuZCBhIG1lc3NhZ2UgdG8gdGhlIGNvbnRlbnQgc2NyaXB0XG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYklkLCB7IHR5cGU6IFwidXJsQ2hhbmdlZFwiIH0pO1xuICAgIH1cbn0pO1xuLyoqXG4gKiBTdG9yZXMgdGhlIHByb3ZpZGVkIGRhdGEgaW4gdGhlIGxvY2FsIENocm9tZSBzdG9yYWdlIHVuZGVyIHRoZSBrZXkgXCJ5b3V0dWJlQm9va21hcmtzXCIuXG4gKlxuICogQHBhcmFtIHtsb2NhbFN0b3JhZ2VEYXRhSW50ZXJmYWNlW119IGRhdGEgLSBBbiBhcnJheSBvZiBkYXRhIG9iamVjdHMgdG8gYmUgc3RvcmVkIGluIGxvY2FsIHN0b3JhZ2UuXG4gKi9cbi8qKlxuICogU3RvcmVzIHRoZSBwcm92aWRlZCBkYXRhIGluIHRoZSBsb2NhbCBDaHJvbWUgc3RvcmFnZSB1bmRlciB0aGUga2V5IFwieW91dHViZUJvb2ttYXJrc1wiLlxuICpcbiAqIEBwYXJhbSB7bG9jYWxTdG9yYWdlRGF0YUludGVyZmFjZVtdfSBkYXRhIC0gQW4gYXJyYXkgb2YgZGF0YSBvYmplY3RzIHRvIGJlIHN0b3JlZCBpbiBsb2NhbCBzdG9yYWdlLlxuICovXG5jb25zdCBsb2NhbFN0b3JlRGF0YSA9IChkYXRhKSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgeW91dHViZUJvb2ttYXJrczogZGF0YSB9KTtcbn07XG4vKipcbiAqIEZvcm1hdCBhIHRpbWUgaW4gc2Vjb25kcyBpbnRvIGEgc3RyaW5nIG9mIHRoZSBmb3JtIFwiSEg6TU06U1NcIiBvciBcIk1NOlNTXCJcbiAqIGlmIHRoZSBudW1iZXIgb2YgaG91cnMgaXMgemVyby5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzIFRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHRpbWUgc3RyaW5nLlxuICovXG5jb25zdCBmb3JtYXRlVGltZSA9IChzZWNvbmRzKSA9PiB7XG4gICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcbiAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2Vjb25kcyAlIDM2MDApIC8gNjApO1xuICAgIGNvbnN0IHJlbWFpbmluZ1NlY29uZHMgPSBzZWNvbmRzICUgNjA7XG4gICAgY29uc3QgZm9ybWF0dGVkSG91cnMgPSBTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICBjb25zdCBmb3JtYXR0ZWRNaW51dGVzID0gU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICBjb25zdCBmb3JtYXR0ZWRTZWNvbmRzID0gU3RyaW5nKHJlbWFpbmluZ1NlY29uZHMpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICBpZiAoZm9ybWF0dGVkSG91cnMgPT0gXCIwMFwiKSB7XG4gICAgICAgIHJldHVybiBgJHtmb3JtYXR0ZWRNaW51dGVzfToke2Zvcm1hdHRlZFNlY29uZHN9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBgJHtmb3JtYXR0ZWRIb3Vyc306JHtmb3JtYXR0ZWRNaW51dGVzfToke2Zvcm1hdHRlZFNlY29uZHN9YDtcbiAgICB9XG59O1xuZXhwb3J0IHt9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9