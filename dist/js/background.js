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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLDRCQUE0QixtQ0FBbUM7QUFDL0Q7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLElBQUksS0FBSyxXQUFXO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSw2QkFBNkIsa0JBQWtCO0FBQy9DO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsNkJBQTZCO0FBQ3hDO0FBQ0E7QUFDQSwrQkFBK0Isd0JBQXdCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCLEdBQUcsaUJBQWlCO0FBQ3ZEO0FBQ0E7QUFDQSxrQkFBa0IsZUFBZSxHQUFHLGlCQUFpQixHQUFHLGlCQUFpQjtBQUN6RTtBQUNBO0FBQ1UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiRXh0ZW5zaW9uIGluc3RhbGxlZFwiKTtcbiAgICAvLyBjaHJvbWUuc3RvcmFnZS5sb2NhbC5jbGVhcigpO1xufSk7XG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKG1lc3NhZ2UudHlwZSA9PSBcInNjcmFwZURhdGFcIikge1xuICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgICAgICAgaWYgKHRhYnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIG1lc3NhZ2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHRhYnNbMF0udXJsO1xuICAgICAgICAgICAgICAgIGlmICh1cmwgPT09IG51bGwgfHwgdXJsID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1cmwuaW5jbHVkZXMoXCImdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSB1cmwuc3BsaXQoXCImdFwiKVswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxvY2FsU3RvcmFnZURhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2VEYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGAke3VybH0mdD0ke2RhdGEudmFsdWV9c2AsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogZGF0YS5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgdGltZVRleHQ6IGZvcm1hdGVUaW1lKE51bWJlcihkYXRhLnZhbHVlKSksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwieW91dHViZUJvb2ttYXJrc1wiLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQueW91dHViZUJvb2ttYXJrcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlRGF0YSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5yZXN1bHQueW91dHViZUJvb2ttYXJrcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5sb2NhbFN0b3JhZ2VEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmVEYXRhKGxvY2FsU3RvcmFnZURhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yZURhdGEobG9jYWxTdG9yYWdlRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1lc3NhZ2UudHlwZSA9PSBcInBsYXlQYXVzZVwiKSB7XG4gICAgICAgIGNocm9tZS50YWJzLnVwZGF0ZSh7IHVybDogbWVzc2FnZS51cmwgfSk7XG4gICAgfVxufSk7XG4vKipcbiAqIFN0b3JlcyB0aGUgcHJvdmlkZWQgZGF0YSBpbiB0aGUgbG9jYWwgQ2hyb21lIHN0b3JhZ2UgdW5kZXIgdGhlIGtleSBcInlvdXR1YmVCb29rbWFya3NcIi5cbiAqXG4gKiBAcGFyYW0ge2xvY2FsU3RvcmFnZURhdGFJbnRlcmZhY2VbXX0gZGF0YSAtIEFuIGFycmF5IG9mIGRhdGEgb2JqZWN0cyB0byBiZSBzdG9yZWQgaW4gbG9jYWwgc3RvcmFnZS5cbiAqL1xuY29uc3QgbG9jYWxTdG9yZURhdGEgPSAoZGF0YSkgPT4ge1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IHlvdXR1YmVCb29rbWFya3M6IGRhdGEgfSk7XG59O1xuLyoqXG4gKiBGb3JtYXQgYSB0aW1lIGluIHNlY29uZHMgaW50byBhIHN0cmluZyBvZiB0aGUgZm9ybSBcIkhIOk1NOlNTXCIgb3IgXCJNTTpTU1wiXG4gKiBpZiB0aGUgbnVtYmVyIG9mIGhvdXJzIGlzIHplcm8uXG4gKiBAcGFyYW0ge251bWJlcn0gc2Vjb25kcyBUaGUgbnVtYmVyIG9mIHNlY29uZHMgdG8gZm9ybWF0LlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB0aW1lIHN0cmluZy5cbiAqL1xuY29uc3QgZm9ybWF0ZVRpbWUgPSAoc2Vjb25kcykgPT4ge1xuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCk7XG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAvIDYwKTtcbiAgICBjb25zdCByZW1haW5pbmdTZWNvbmRzID0gc2Vjb25kcyAlIDYwO1xuICAgIGNvbnN0IGZvcm1hdHRlZEhvdXJzID0gU3RyaW5nKGhvdXJzKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgY29uc3QgZm9ybWF0dGVkTWludXRlcyA9IFN0cmluZyhtaW51dGVzKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kcyA9IFN0cmluZyhyZW1haW5pbmdTZWNvbmRzKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgaWYgKGZvcm1hdHRlZEhvdXJzID09IFwiMDBcIikge1xuICAgICAgICByZXR1cm4gYCR7Zm9ybWF0dGVkTWludXRlc306JHtmb3JtYXR0ZWRTZWNvbmRzfWA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gYCR7Zm9ybWF0dGVkSG91cnN9OiR7Zm9ybWF0dGVkTWludXRlc306JHtmb3JtYXR0ZWRTZWNvbmRzfWA7XG4gICAgfVxufTtcbmV4cG9ydCB7fTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==