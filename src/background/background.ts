chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
//   chrome.storage.local.clear();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == "scrapeData") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs) {
        let data: any = { ...message.data };
        let url = tabs[0].url;
        if (url?.includes("&t")) {
          url = url.split("&t")[0];
        }
        let localStorageData: any = [];
        localStorageData.push({
          url: `${url}&t=${data.value}s`,
          duration: data.duration,
          position: data.position,
          timeText : formateTime(Number(data.value))
        });

     
        chrome.storage.local.get("youtubeBookmarks", function (result) {
            console.log(result,"local Storage data");
            
          if (result.youtubeBookmarks) {
            localStorageData = [...result.youtubeBookmarks, ...localStorageData];
            localStoreData(localStorageData);
            console.log(localStorageData,"old data with new Data");
          }else{
            console.log(localStorageData,"new Data");
            
            localStoreData(localStorageData)
          }
        })
      }
    });
  }
});

const localStoreData = (data:any)=>{
    chrome.storage.local.set({ 'youtubeBookmarks': data });
}

const formateTime = (seconds:number)=>{
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    if(formattedHours=='00'){
        return `${formattedMinutes}:${formattedSeconds}`
    }else{
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
}
