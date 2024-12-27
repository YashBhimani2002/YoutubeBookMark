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
    // chrome.storage.local.clear();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLDRCQUE0QixtQ0FBbUM7QUFDL0Q7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLElBQUksS0FBSyxXQUFXO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSw2QkFBNkIsa0JBQWtCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixvQkFBb0I7QUFDbkQ7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsV0FBVyw2QkFBNkI7QUFDeEM7QUFDQTtBQUNBLCtCQUErQix3QkFBd0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUIsR0FBRyxpQkFBaUI7QUFDdkQ7QUFDQTtBQUNBLGtCQUFrQixlQUFlLEdBQUcsaUJBQWlCLEdBQUcsaUJBQWlCO0FBQ3pFO0FBQ0E7QUFDVSIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJFeHRlbnNpb24gaW5zdGFsbGVkXCIpO1xuICAgIC8vIGNocm9tZS5zdG9yYWdlLmxvY2FsLmNsZWFyKCk7XG59KTtcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICBpZiAobWVzc2FnZS50eXBlID09IFwic2NyYXBlRGF0YVwiKSB7XG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICAgICAgICBpZiAodGFicykge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZS5kYXRhKTtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gdGFic1swXS51cmw7XG4gICAgICAgICAgICAgICAgaWYgKHVybCA9PT0gbnVsbCB8fCB1cmwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVybC5pbmNsdWRlcyhcIiZ0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHVybC5zcGxpdChcIiZ0XCIpWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxTdG9yYWdlRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZURhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYCR7dXJsfSZ0PSR7ZGF0YS52YWx1ZX1zYCxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBkYXRhLnBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0aW1lVGV4dDogZm9ybWF0ZVRpbWUoTnVtYmVyKGRhdGEudmFsdWUpKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJ5b3V0dWJlQm9va21hcmtzXCIsIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC55b3V0dWJlQm9va21hcmtzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2VEYXRhID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnJlc3VsdC55b3V0dWJlQm9va21hcmtzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmxvY2FsU3RvcmFnZURhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yZURhdGEobG9jYWxTdG9yYWdlRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JlRGF0YShsb2NhbFN0b3JhZ2VEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobWVzc2FnZS50eXBlID09IFwicGxheVBhdXNlXCIpIHtcbiAgICAgICAgY2hyb21lLnRhYnMudXBkYXRlKHsgdXJsOiBtZXNzYWdlLnVybCB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobWVzc2FnZS50eXBlID09IFwiZGVsZXRlXCIpIHtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwieW91dHViZUJvb2ttYXJrc1wiLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LnlvdXR1YmVCb29rbWFya3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkRGF0YSA9IHJlc3VsdC55b3V0dWJlQm9va21hcmtzLmZpbHRlcigoXywgaW5kZXgpID0+IGluZGV4ICE9PSBtZXNzYWdlLm51bWJlcik7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yZURhdGEodXBkYXRlZERhdGEpO1xuICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7IG1lc3NhZ2U6IFwic3VjY2Vzc1wiIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59KTtcbi8qKlxuICogU3RvcmVzIHRoZSBwcm92aWRlZCBkYXRhIGluIHRoZSBsb2NhbCBDaHJvbWUgc3RvcmFnZSB1bmRlciB0aGUga2V5IFwieW91dHViZUJvb2ttYXJrc1wiLlxuICpcbiAqIEBwYXJhbSB7bG9jYWxTdG9yYWdlRGF0YUludGVyZmFjZVtdfSBkYXRhIC0gQW4gYXJyYXkgb2YgZGF0YSBvYmplY3RzIHRvIGJlIHN0b3JlZCBpbiBsb2NhbCBzdG9yYWdlLlxuICovXG5jb25zdCBsb2NhbFN0b3JlRGF0YSA9IChkYXRhKSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgeW91dHViZUJvb2ttYXJrczogZGF0YSB9KTtcbn07XG4vKipcbiAqIEZvcm1hdCBhIHRpbWUgaW4gc2Vjb25kcyBpbnRvIGEgc3RyaW5nIG9mIHRoZSBmb3JtIFwiSEg6TU06U1NcIiBvciBcIk1NOlNTXCJcbiAqIGlmIHRoZSBudW1iZXIgb2YgaG91cnMgaXMgemVyby5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzIFRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHRpbWUgc3RyaW5nLlxuICovXG5jb25zdCBmb3JtYXRlVGltZSA9IChzZWNvbmRzKSA9PiB7XG4gICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcbiAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2Vjb25kcyAlIDM2MDApIC8gNjApO1xuICAgIGNvbnN0IHJlbWFpbmluZ1NlY29uZHMgPSBzZWNvbmRzICUgNjA7XG4gICAgY29uc3QgZm9ybWF0dGVkSG91cnMgPSBTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICBjb25zdCBmb3JtYXR0ZWRNaW51dGVzID0gU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICBjb25zdCBmb3JtYXR0ZWRTZWNvbmRzID0gU3RyaW5nKHJlbWFpbmluZ1NlY29uZHMpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICBpZiAoZm9ybWF0dGVkSG91cnMgPT0gXCIwMFwiKSB7XG4gICAgICAgIHJldHVybiBgJHtmb3JtYXR0ZWRNaW51dGVzfToke2Zvcm1hdHRlZFNlY29uZHN9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBgJHtmb3JtYXR0ZWRIb3Vyc306JHtmb3JtYXR0ZWRNaW51dGVzfToke2Zvcm1hdHRlZFNlY29uZHN9YDtcbiAgICB9XG59O1xuZXhwb3J0IHt9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9