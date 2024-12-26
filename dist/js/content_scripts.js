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
/*!****************************************!*\
  !*** ./src/content/content_scripts.ts ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/**
 * Scrapes YouTube video player data (current timestamp, video duration, and seek bar position) and sends it to the background script via chrome.runtime.sendMessage.
 * The data is scraped from the YouTube video player's progress bar and seek bar elements.
 * @returns {void}
 */
const handleDataScraping = () => {
    var _a, _b;
    const data = {
        minValue: "",
        maxValue: "",
        value: "",
        duration: "",
        position: "",
    };
    const timeTrackerElement = document.querySelector('[class="ytp-progress-bar"]');
    if (timeTrackerElement) {
        data.minValue = timeTrackerElement.ariaValueMin || "";
        data.maxValue = timeTrackerElement.ariaValueMax || "";
        data.value = timeTrackerElement.ariaValueNow || "";
        data.duration = timeTrackerElement.ariaValueText || "";
    }
    const positionTrackerElement = document.querySelector('[class^="ytp-play-progress ytp-swatch-background-color"]');
    if (positionTrackerElement) {
        const computedStyles = window.getComputedStyle(positionTrackerElement);
        const transformValue = computedStyles.getPropertyValue("transform");
        if (transformValue && transformValue.startsWith("matrix")) {
            const matrixValue = parseFloat((_b = (_a = transformValue.match(/matrix\(([^,]+)/)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : "0");
            data.position = transformValue || "";
        }
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
        image.src = chrome.runtime.getURL("../assets/resource/youtubeBookMarkIcon.png");
        image.style.marginBottom = "15px";
        image.style.marginRight = "10px";
        image.style.cursor = "pointer";
        image.onclick = () => handleDataScraping();
        const firstChilde = entity.firstChild;
        if (firstChilde) {
            entity.insertBefore(image, firstChilde);
        }
        else {
            entity.appendChild(image);
        }
    }
};
handleDocumentMutations();


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9zY3JpcHRzLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGdDQUFnQztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9jb250ZW50L2NvbnRlbnRfc2NyaXB0cy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBTY3JhcGVzIFlvdVR1YmUgdmlkZW8gcGxheWVyIGRhdGEgKGN1cnJlbnQgdGltZXN0YW1wLCB2aWRlbyBkdXJhdGlvbiwgYW5kIHNlZWsgYmFyIHBvc2l0aW9uKSBhbmQgc2VuZHMgaXQgdG8gdGhlIGJhY2tncm91bmQgc2NyaXB0IHZpYSBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZS5cbiAqIFRoZSBkYXRhIGlzIHNjcmFwZWQgZnJvbSB0aGUgWW91VHViZSB2aWRlbyBwbGF5ZXIncyBwcm9ncmVzcyBiYXIgYW5kIHNlZWsgYmFyIGVsZW1lbnRzLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGhhbmRsZURhdGFTY3JhcGluZyA9ICgpID0+IHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIG1pblZhbHVlOiBcIlwiLFxuICAgICAgICBtYXhWYWx1ZTogXCJcIixcbiAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgIGR1cmF0aW9uOiBcIlwiLFxuICAgICAgICBwb3NpdGlvbjogXCJcIixcbiAgICB9O1xuICAgIGNvbnN0IHRpbWVUcmFja2VyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcz1cInl0cC1wcm9ncmVzcy1iYXJcIl0nKTtcbiAgICBpZiAodGltZVRyYWNrZXJFbGVtZW50KSB7XG4gICAgICAgIGRhdGEubWluVmFsdWUgPSB0aW1lVHJhY2tlckVsZW1lbnQuYXJpYVZhbHVlTWluIHx8IFwiXCI7XG4gICAgICAgIGRhdGEubWF4VmFsdWUgPSB0aW1lVHJhY2tlckVsZW1lbnQuYXJpYVZhbHVlTWF4IHx8IFwiXCI7XG4gICAgICAgIGRhdGEudmFsdWUgPSB0aW1lVHJhY2tlckVsZW1lbnQuYXJpYVZhbHVlTm93IHx8IFwiXCI7XG4gICAgICAgIGRhdGEuZHVyYXRpb24gPSB0aW1lVHJhY2tlckVsZW1lbnQuYXJpYVZhbHVlVGV4dCB8fCBcIlwiO1xuICAgIH1cbiAgICBjb25zdCBwb3NpdGlvblRyYWNrZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzXj1cInl0cC1wbGF5LXByb2dyZXNzIHl0cC1zd2F0Y2gtYmFja2dyb3VuZC1jb2xvclwiXScpO1xuICAgIGlmIChwb3NpdGlvblRyYWNrZXJFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocG9zaXRpb25UcmFja2VyRWxlbWVudCk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybVZhbHVlID0gY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcInRyYW5zZm9ybVwiKTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybVZhbHVlICYmIHRyYW5zZm9ybVZhbHVlLnN0YXJ0c1dpdGgoXCJtYXRyaXhcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdHJpeFZhbHVlID0gcGFyc2VGbG9hdCgoX2IgPSAoX2EgPSB0cmFuc2Zvcm1WYWx1ZS5tYXRjaCgvbWF0cml4XFwoKFteLF0rKS8pKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMV0pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IFwiMFwiKTtcbiAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSB0cmFuc2Zvcm1WYWx1ZSB8fCBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogXCJzY3JhcGVEYXRhXCIsIGRhdGE6IGRhdGEgfSk7XG59O1xuLyoqXG4gKiBDcmVhdGVzIGFuIGltYWdlIGVsZW1lbnQgd2l0aCBhIFlvdVR1YmUgYm9va21hcmsgaWNvbiBhbmQgaW5zZXJ0cyBpdCBpbnRvIHRoZSBET00gcmlnaHQgYWZ0ZXIgdGhlIHZpZGVvIGNvbnRyb2xzLlxuICogVGhlIGVsZW1lbnQgaXMgaW5zZXJ0ZWQgYXMgdGhlIGZpcnN0IGNoaWxkIG9mIHRoZSBlbGVtZW50IHdpdGggYSBjbGFzcyBuYW1lIHRoYXQgc3RhcnRzIHdpdGggXCJ5dHAtcmlnaHQtY29udHJvbHNcIi5cbiAqIElmIG5vIHN1Y2ggZWxlbWVudCBpcyBmb3VuZCwgdGhlIGVsZW1lbnQgaXMgYXBwZW5kZWQgdG8gdGhlIGVuZCBvZiB0aGUgcGFyZW50IGVsZW1lbnQuXG4gKi9cbmNvbnN0IGhhbmRsZURvY3VtZW50TXV0YXRpb25zID0gKCkgPT4ge1xuICAgIGNvbnN0IGVudGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzc149XCJ5dHAtcmlnaHQtY29udHJvbHNcIl0nKTtcbiAgICBpZiAoZW50aXR5KSB7XG4gICAgICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKFwiLi4vYXNzZXRzL3Jlc291cmNlL3lvdXR1YmVCb29rTWFya0ljb24ucG5nXCIpO1xuICAgICAgICBpbWFnZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjE1cHhcIjtcbiAgICAgICAgaW1hZ2Uuc3R5bGUubWFyZ2luUmlnaHQgPSBcIjEwcHhcIjtcbiAgICAgICAgaW1hZ2Uuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIGltYWdlLm9uY2xpY2sgPSAoKSA9PiBoYW5kbGVEYXRhU2NyYXBpbmcoKTtcbiAgICAgICAgY29uc3QgZmlyc3RDaGlsZGUgPSBlbnRpdHkuZmlyc3RDaGlsZDtcbiAgICAgICAgaWYgKGZpcnN0Q2hpbGRlKSB7XG4gICAgICAgICAgICBlbnRpdHkuaW5zZXJ0QmVmb3JlKGltYWdlLCBmaXJzdENoaWxkZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbnRpdHkuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuICAgICAgICB9XG4gICAgfVxufTtcbmhhbmRsZURvY3VtZW50TXV0YXRpb25zKCk7XG5leHBvcnQge307XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=