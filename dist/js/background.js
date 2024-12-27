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
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0EsNENBQTRDO0FBQzVDLCtCQUErQixhQUFhO0FBQzVDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsNEJBQTRCLG1DQUFtQztBQUMvRDtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsSUFBSSxLQUFLLFdBQVc7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDZCQUE2QixrQkFBa0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLDZCQUE2QjtBQUN4QztBQUNBO0FBQ0EsK0JBQStCLHdCQUF3QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQixHQUFHLGlCQUFpQjtBQUN2RDtBQUNBO0FBQ0Esa0JBQWtCLGVBQWUsR0FBRyxpQkFBaUIsR0FBRyxpQkFBaUI7QUFDekU7QUFDQTtBQUNVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9iYWNrZ3JvdW5kL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIkV4dGVuc2lvbiBpbnN0YWxsZWRcIik7XG59KTtcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IFwiZ2V0Q3VycmVudFRhYlVybFwiKSB7XG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XG4gICAgICAgICAgICBpZiAodGFicy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFiVXJsID0gdGFic1swXS51cmw7IC8vIEdldCB0aGUgVVJMIG9mIHRoZSBjdXJyZW50IGFjdGl2ZSB0YWJcbiAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyB1cmw6IHRhYlVybCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFJldHVybiB0cnVlIHRvIGluZGljYXRlIHRoYXQgdGhlIHJlc3BvbnNlIHdpbGwgYmUgc2VudCBhc3luY2hyb25vdXNseVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59KTtcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICBpZiAobWVzc2FnZS50eXBlID09IFwic2NyYXBlRGF0YVwiKSB7XG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICAgICAgICBpZiAodGFicykge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZS5kYXRhKTtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gdGFic1swXS51cmw7XG4gICAgICAgICAgICAgICAgaWYgKHVybCA9PT0gbnVsbCB8fCB1cmwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVybC5pbmNsdWRlcyhcIiZ0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHVybC5zcGxpdChcIiZ0XCIpWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxTdG9yYWdlRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZURhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYCR7dXJsfSZ0PSR7ZGF0YS52YWx1ZX1zYCxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBkYXRhLnBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0aW1lVGV4dDogZm9ybWF0ZVRpbWUoTnVtYmVyKGRhdGEudmFsdWUpKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJ5b3V0dWJlQm9va21hcmtzXCIsIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC55b3V0dWJlQm9va21hcmtzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2VEYXRhID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnJlc3VsdC55b3V0dWJlQm9va21hcmtzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmxvY2FsU3RvcmFnZURhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yZURhdGEobG9jYWxTdG9yYWdlRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JlRGF0YShsb2NhbFN0b3JhZ2VEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobWVzc2FnZS50eXBlID09IFwicGxheVBhdXNlXCIpIHtcbiAgICAgICAgY2hyb21lLnRhYnMudXBkYXRlKHsgdXJsOiBtZXNzYWdlLnVybCB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobWVzc2FnZS50eXBlID09IFwiZGVsZXRlXCIpIHtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwieW91dHViZUJvb2ttYXJrc1wiLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LnlvdXR1YmVCb29rbWFya3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkRGF0YSA9IHJlc3VsdC55b3V0dWJlQm9va21hcmtzLmZpbHRlcigoXywgaW5kZXgpID0+IGluZGV4ICE9PSBtZXNzYWdlLm51bWJlcik7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yZURhdGEodXBkYXRlZERhdGEpO1xuICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7IG1lc3NhZ2U6IFwic3VjY2Vzc1wiIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59KTtcbi8qKlxuICogU3RvcmVzIHRoZSBwcm92aWRlZCBkYXRhIGluIHRoZSBsb2NhbCBDaHJvbWUgc3RvcmFnZSB1bmRlciB0aGUga2V5IFwieW91dHViZUJvb2ttYXJrc1wiLlxuICpcbiAqIEBwYXJhbSB7bG9jYWxTdG9yYWdlRGF0YUludGVyZmFjZVtdfSBkYXRhIC0gQW4gYXJyYXkgb2YgZGF0YSBvYmplY3RzIHRvIGJlIHN0b3JlZCBpbiBsb2NhbCBzdG9yYWdlLlxuICovXG5jb25zdCBsb2NhbFN0b3JlRGF0YSA9IChkYXRhKSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgeW91dHViZUJvb2ttYXJrczogZGF0YSB9KTtcbn07XG4vKipcbiAqIEZvcm1hdCBhIHRpbWUgaW4gc2Vjb25kcyBpbnRvIGEgc3RyaW5nIG9mIHRoZSBmb3JtIFwiSEg6TU06U1NcIiBvciBcIk1NOlNTXCJcbiAqIGlmIHRoZSBudW1iZXIgb2YgaG91cnMgaXMgemVyby5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzIFRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHRpbWUgc3RyaW5nLlxuICovXG5jb25zdCBmb3JtYXRlVGltZSA9IChzZWNvbmRzKSA9PiB7XG4gICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcbiAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2Vjb25kcyAlIDM2MDApIC8gNjApO1xuICAgIGNvbnN0IHJlbWFpbmluZ1NlY29uZHMgPSBzZWNvbmRzICUgNjA7XG4gICAgY29uc3QgZm9ybWF0dGVkSG91cnMgPSBTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICBjb25zdCBmb3JtYXR0ZWRNaW51dGVzID0gU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICBjb25zdCBmb3JtYXR0ZWRTZWNvbmRzID0gU3RyaW5nKHJlbWFpbmluZ1NlY29uZHMpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICBpZiAoZm9ybWF0dGVkSG91cnMgPT0gXCIwMFwiKSB7XG4gICAgICAgIHJldHVybiBgJHtmb3JtYXR0ZWRNaW51dGVzfToke2Zvcm1hdHRlZFNlY29uZHN9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBgJHtmb3JtYXR0ZWRIb3Vyc306JHtmb3JtYXR0ZWRNaW51dGVzfToke2Zvcm1hdHRlZFNlY29uZHN9YDtcbiAgICB9XG59O1xuZXhwb3J0IHt9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9