/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
    //   chrome.storage.local.clear();
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
                    timeText: formateTime(Number(data.value))
                });
                chrome.storage.local.get("youtubeBookmarks", function (result) {
                    console.log(result, "local Storage data");
                    if (result.youtubeBookmarks) {
                        localStorageData = [...result.youtubeBookmarks, ...localStorageData];
                        localStoreData(localStorageData);
                        console.log(localStorageData, "old data with new Data");
                    }
                    else {
                        console.log(localStorageData, "new Data");
                        localStoreData(localStorageData);
                    }
                });
            }
        });
    }
});
const localStoreData = (data) => {
    chrome.storage.local.set({ 'youtubeBookmarks': data });
};
const formateTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    if (formattedHours == '00') {
        return `${formattedMinutes}:${formattedSeconds}`;
    }
    else {
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
};

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixJQUFJLEtBQUssV0FBVztBQUNoRDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUM7QUFDRDtBQUNBLCtCQUErQiwwQkFBMEI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQixHQUFHLGlCQUFpQjtBQUN2RDtBQUNBO0FBQ0Esa0JBQWtCLGVBQWUsR0FBRyxpQkFBaUIsR0FBRyxpQkFBaUI7QUFDekU7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZ3JvdW5kL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJFeHRlbnNpb24gaW5zdGFsbGVkXCIpO1xuICAgIC8vICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuY2xlYXIoKTtcbn0pO1xuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICAgIGlmIChtZXNzYWdlLnR5cGUgPT0gXCJzY3JhcGVEYXRhXCIpIHtcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgICAgIGlmICh0YWJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlLmRhdGEpO1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB0YWJzWzBdLnVybDtcbiAgICAgICAgICAgICAgICBpZiAodXJsID09PSBudWxsIHx8IHVybCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXJsLmluY2x1ZGVzKFwiJnRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gdXJsLnNwbGl0KFwiJnRcIilbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBsb2NhbFN0b3JhZ2VEYXRhID0gW107XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlRGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgJHt1cmx9JnQ9JHtkYXRhLnZhbHVlfXNgLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGRhdGEucG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHRpbWVUZXh0OiBmb3JtYXRlVGltZShOdW1iZXIoZGF0YS52YWx1ZSkpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwieW91dHViZUJvb2ttYXJrc1wiLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCwgXCJsb2NhbCBTdG9yYWdlIGRhdGFcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQueW91dHViZUJvb2ttYXJrcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlRGF0YSA9IFsuLi5yZXN1bHQueW91dHViZUJvb2ttYXJrcywgLi4ubG9jYWxTdG9yYWdlRGF0YV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JlRGF0YShsb2NhbFN0b3JhZ2VEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZURhdGEsIFwib2xkIGRhdGEgd2l0aCBuZXcgRGF0YVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZURhdGEsIFwibmV3IERhdGFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JlRGF0YShsb2NhbFN0b3JhZ2VEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59KTtcbmNvbnN0IGxvY2FsU3RvcmVEYXRhID0gKGRhdGEpID0+IHtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAneW91dHViZUJvb2ttYXJrcyc6IGRhdGEgfSk7XG59O1xuY29uc3QgZm9ybWF0ZVRpbWUgPSAoc2Vjb25kcykgPT4ge1xuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCk7XG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAvIDYwKTtcbiAgICBjb25zdCByZW1haW5pbmdTZWNvbmRzID0gc2Vjb25kcyAlIDYwO1xuICAgIGNvbnN0IGZvcm1hdHRlZEhvdXJzID0gU3RyaW5nKGhvdXJzKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgIGNvbnN0IGZvcm1hdHRlZE1pbnV0ZXMgPSBTdHJpbmcobWludXRlcykucGFkU3RhcnQoMiwgJzAnKTtcbiAgICBjb25zdCBmb3JtYXR0ZWRTZWNvbmRzID0gU3RyaW5nKHJlbWFpbmluZ1NlY29uZHMpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgaWYgKGZvcm1hdHRlZEhvdXJzID09ICcwMCcpIHtcbiAgICAgICAgcmV0dXJuIGAke2Zvcm1hdHRlZE1pbnV0ZXN9OiR7Zm9ybWF0dGVkU2Vjb25kc31gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGAke2Zvcm1hdHRlZEhvdXJzfToke2Zvcm1hdHRlZE1pbnV0ZXN9OiR7Zm9ybWF0dGVkU2Vjb25kc31gO1xuICAgIH1cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=