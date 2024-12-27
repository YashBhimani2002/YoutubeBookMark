import React, { useEffect, useState } from "react";
import "../static/main.css";
import { localStorageDataInterface } from "../helper/interfaceType";
import {
  closeImageUrl,
  righterImageUrl,
  deleteImageUrl,
  pauseImageUrl,
  playImageUrl,
} from "../helper/imageLink";
const Popup = () => {
  const [bookmarks, setBookmarks] = useState<localStorageDataInterface[]>([]);
  const [activeBookMarkNumber, setActiveBookMarkNumber] = useState(-1);
  const [deleteBookMarkNumber, setDeleteBookMarkNumber] = useState(-1);
  /**
   * Retrieves the youtubeBookmarks array from local Chrome storage and
   * updates the component's state with the retrieved data.
   * If the data is not present in local storage, the state is not updated.
   */
  const getLocalStorageData = () => {
    chrome.storage.local.get("youtubeBookmarks", (result) => {
      console.log(result, "background");
      if (result) {
        setBookmarks(result.youtubeBookmarks);
      }
    });
  };
  useEffect(() => {
    getLocalStorageData();
  }, []);

  const handlePlayPause = (index: number) => {
    setActiveBookMarkNumber(index);
    chrome.runtime.sendMessage({
      type: "playPause",
      url: bookmarks[index].url,
    });
  };
  const handleDelete = (index: number) => {
    chrome.runtime.sendMessage({ type: "delete", number: index });
    const updatedData = bookmarks.filter((_, i) => i !== index);
    setBookmarks(updatedData);
    setDeleteBookMarkNumber(-1);
    chrome.runtime.sendMessage({ type: "removePointer",updatedData:updatedData });
  };
  return (
    <div className="min-w-96 h-2/3 w-full flex flex-col items-center p-1 gap-1">
      <div className="flex bg-gray-300 p-1 w-full rounded-sm gap-2">
        <img
          src="../assets/resource/youtubeBookMarkIcon.png"
          className=" w-5 h-5"
        />
        <h2 className="flex-1 font-bold">YouTube Bookmarker</h2>
      </div>
      <div className="flex justify-center items-center h-full bg-slate-100 w-full p-1 rounded-sm border-[1px] border-gray-300">
        {bookmarks && bookmarks.length > 0 ? (
          <div className="relative max-h-[239px] overflow-y-auto overflow-x-hidden">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-1.5">
                    BookMark
                  </th>
                  <th scope="col" className="px-4 py-1.5">
                    Time
                  </th>
                  <th scope="col" className="px-4 py-1.5">
                    Play/Pause
                  </th>
                  <th scope="col" className="px-4 py-1.5">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {bookmarks?.map(
                  (bookmark: localStorageDataInterface, index: number) => (
                    <React.Fragment key={index}>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-3 py-1.5 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {`BookMark-${index + 1}`}
                        </th>
                        <td className="px-3 py-1.5">{bookmark.timeText}</td>
                        <td className="px-3 py-1.5 w-full flex justify-center">
                          {activeBookMarkNumber === index ? (
                            <img
                              src={pauseImageUrl}
                              className="w-5 h-5 cursor-pointer"
                              onClick={() => setActiveBookMarkNumber(-1)}
                            />
                          ) : (
                            <img
                              src={playImageUrl}
                              className="w-5 h-5 cursor-pointer"
                              onClick={() => handlePlayPause(index)}
                            />
                          )}
                        </td>
                        <td className="px-3 py-1.5">
                          <img
                            src={deleteImageUrl}
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => setDeleteBookMarkNumber(index)}
                          />
                        </td>
                      </tr>
                      {deleteBookMarkNumber === index && (
                        <tr className="bg-gray-300">
                          <td colSpan={3} className="text-black p-2">
                            Are you sure you want to delete this item?
                          </td>
                          <td className="flex gap-2 justify-center items-center h-full p-2">
                            <img
                              src={closeImageUrl}
                              className="w-5 h-5 cursor-pointer rounded-md"
                              onClick={() => setDeleteBookMarkNumber(-1)}
                            />
                            <img
                              src={righterImageUrl}
                              className="w-5 h-5 cursor-pointer rounded-md"
                              onClick={() => handleDelete(index)}
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="flex justify-center items-center h-full ">
            No bookmarks yet
          </h2>
        )}
      </div>
    </div>
  );
};
export default Popup;
