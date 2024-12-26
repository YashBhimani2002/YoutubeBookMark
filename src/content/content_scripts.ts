const handleDataScraping = () => {
  const data: any = {};
  const timeTrackerElement = document.querySelector(
    '[class="ytp-progress-bar"]'
  );
  if (timeTrackerElement) {
    data.minValue = timeTrackerElement.ariaValueMin;
    data.maxValue = timeTrackerElement.ariaValueMax;
    data.value = timeTrackerElement.ariaValueNow;
    data.duration = timeTrackerElement.ariaValueText;
  }
  const positionTrackerElement = document.querySelector(
    '[class^="ytp-play-progress ytp-swatch-background-color"]'
  );
  if (positionTrackerElement) {
    const computedStyles = window.getComputedStyle(positionTrackerElement);
    const transformValue: string = computedStyles.getPropertyValue("transform");

    if (transformValue && transformValue.startsWith("matrix")) {
      const matrixValue = parseFloat(
        transformValue.match(/matrix\(([^,]+)/)?.[1] ?? "0"
      );
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
    image.src = chrome.runtime.getURL(
      "../assets/resource/youtubeBookMarkIcon.png"
    );
    image.style.marginBottom = "15px";
    image.style.marginRight = "10px";
    image.style.cursor = "pointer";
    image.onclick = () => handleDataScraping();
    const firstChilde = entity.firstChild;

    if (firstChilde) {
      entity.insertBefore(image, firstChilde);
    } else {
      entity.appendChild(image);
    }
  }
};

handleDocumentMutations();
