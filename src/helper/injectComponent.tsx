import { localStorageDataInterface } from "./interfaceType";

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

export const handleBookMarkPointerRemover = async () => {
    // Select all elements with the class 'youtube-bookmark-dot'
    const bookmarkDots = document.querySelectorAll(".youtube-bookmark-dot");
    // Iterate over the NodeList and remove each element
    new Promise((resolve)=>{
        bookmarkDots.forEach(dot => {
            dot.remove();
          });
    })
  };
  
