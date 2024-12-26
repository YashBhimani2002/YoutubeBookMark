/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!****************************************!*\
  !*** ./src/content/content_scripts.ts ***!
  \****************************************/

const handleDataScraping = () => {
    var _a, _b;
    const data = {};
    const timeTrackerElement = document.querySelector('[class="ytp-progress-bar"]');
    if (timeTrackerElement) {
        data.minValue = timeTrackerElement.ariaValueMin;
        data.maxValue = timeTrackerElement.ariaValueMax;
        data.value = timeTrackerElement.ariaValueNow;
        data.duration = timeTrackerElement.ariaValueText;
    }
    const positionTrackerElement = document.querySelector('[class^="ytp-play-progress ytp-swatch-background-color"]');
    if (positionTrackerElement) {
        const computedStyles = window.getComputedStyle(positionTrackerElement);
        const transformValue = computedStyles.getPropertyValue("transform");
        if (transformValue && transformValue.startsWith("matrix")) {
            const matrixValue = parseFloat((_b = (_a = transformValue.match(/matrix\(([^,]+)/)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : "0");
            data.position = transformValue;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9zY3JpcHRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxnQ0FBZ0M7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC9jb250ZW50X3NjcmlwdHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBoYW5kbGVEYXRhU2NyYXBpbmcgPSAoKSA9PiB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgY29uc3QgdGltZVRyYWNrZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzPVwieXRwLXByb2dyZXNzLWJhclwiXScpO1xuICAgIGlmICh0aW1lVHJhY2tlckVsZW1lbnQpIHtcbiAgICAgICAgZGF0YS5taW5WYWx1ZSA9IHRpbWVUcmFja2VyRWxlbWVudC5hcmlhVmFsdWVNaW47XG4gICAgICAgIGRhdGEubWF4VmFsdWUgPSB0aW1lVHJhY2tlckVsZW1lbnQuYXJpYVZhbHVlTWF4O1xuICAgICAgICBkYXRhLnZhbHVlID0gdGltZVRyYWNrZXJFbGVtZW50LmFyaWFWYWx1ZU5vdztcbiAgICAgICAgZGF0YS5kdXJhdGlvbiA9IHRpbWVUcmFja2VyRWxlbWVudC5hcmlhVmFsdWVUZXh0O1xuICAgIH1cbiAgICBjb25zdCBwb3NpdGlvblRyYWNrZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzXj1cInl0cC1wbGF5LXByb2dyZXNzIHl0cC1zd2F0Y2gtYmFja2dyb3VuZC1jb2xvclwiXScpO1xuICAgIGlmIChwb3NpdGlvblRyYWNrZXJFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocG9zaXRpb25UcmFja2VyRWxlbWVudCk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybVZhbHVlID0gY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcInRyYW5zZm9ybVwiKTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybVZhbHVlICYmIHRyYW5zZm9ybVZhbHVlLnN0YXJ0c1dpdGgoXCJtYXRyaXhcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdHJpeFZhbHVlID0gcGFyc2VGbG9hdCgoX2IgPSAoX2EgPSB0cmFuc2Zvcm1WYWx1ZS5tYXRjaCgvbWF0cml4XFwoKFteLF0rKS8pKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMV0pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IFwiMFwiKTtcbiAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSB0cmFuc2Zvcm1WYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHR5cGU6IFwic2NyYXBlRGF0YVwiLCBkYXRhOiBkYXRhIH0pO1xufTtcbi8qKlxuICogQ3JlYXRlcyBhbiBpbWFnZSBlbGVtZW50IHdpdGggYSBZb3VUdWJlIGJvb2ttYXJrIGljb24gYW5kIGluc2VydHMgaXQgaW50byB0aGUgRE9NIHJpZ2h0IGFmdGVyIHRoZSB2aWRlbyBjb250cm9scy5cbiAqIFRoZSBlbGVtZW50IGlzIGluc2VydGVkIGFzIHRoZSBmaXJzdCBjaGlsZCBvZiB0aGUgZWxlbWVudCB3aXRoIGEgY2xhc3MgbmFtZSB0aGF0IHN0YXJ0cyB3aXRoIFwieXRwLXJpZ2h0LWNvbnRyb2xzXCIuXG4gKiBJZiBubyBzdWNoIGVsZW1lbnQgaXMgZm91bmQsIHRoZSBlbGVtZW50IGlzIGFwcGVuZGVkIHRvIHRoZSBlbmQgb2YgdGhlIHBhcmVudCBlbGVtZW50LlxuICovXG5jb25zdCBoYW5kbGVEb2N1bWVudE11dGF0aW9ucyA9ICgpID0+IHtcbiAgICBjb25zdCBlbnRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3NePVwieXRwLXJpZ2h0LWNvbnRyb2xzXCJdJyk7XG4gICAgaWYgKGVudGl0eSkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGltYWdlLnNyYyA9IGNocm9tZS5ydW50aW1lLmdldFVSTChcIi4uL2Fzc2V0cy9yZXNvdXJjZS95b3V0dWJlQm9va01hcmtJY29uLnBuZ1wiKTtcbiAgICAgICAgaW1hZ2Uuc3R5bGUubWFyZ2luQm90dG9tID0gXCIxNXB4XCI7XG4gICAgICAgIGltYWdlLnN0eWxlLm1hcmdpblJpZ2h0ID0gXCIxMHB4XCI7XG4gICAgICAgIGltYWdlLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBpbWFnZS5vbmNsaWNrID0gKCkgPT4gaGFuZGxlRGF0YVNjcmFwaW5nKCk7XG4gICAgICAgIGNvbnN0IGZpcnN0Q2hpbGRlID0gZW50aXR5LmZpcnN0Q2hpbGQ7XG4gICAgICAgIGlmIChmaXJzdENoaWxkZSkge1xuICAgICAgICAgICAgZW50aXR5Lmluc2VydEJlZm9yZShpbWFnZSwgZmlyc3RDaGlsZGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW50aXR5LmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5oYW5kbGVEb2N1bWVudE11dGF0aW9ucygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9