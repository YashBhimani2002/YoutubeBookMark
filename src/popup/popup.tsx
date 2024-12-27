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
        setBookmarks(bookmarks.filter((_, i) => i !== index));
        setDeleteBookMarkNumber(-1);
    };
    return (
        <div className="min-w-96 h-full w-full flex flex-col items-center p-1 gap-1">
            <div className="flex bg-gray-300 p-1 w-full rounded-sm gap-2">
                <img
                    src="../assets/resource/youtubeBookMarkIcon.png"
                    className=" w-5 h-5"
                />
                <h2 className="flex-1 font-bold">YouTube Bookmarker</h2>
            </div>
            <div className="flex justify-center items-center h-full bg-slate-100 w-full p-1 rounded-sm border-[1px] border-gray-300">
                {bookmarks && bookmarks.length > 0 ? (
                    <div className="relative overflow-x-auto">
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
                            <tbody>
                                {bookmarks?.map((bookmark: localStorageDataInterface, index: number) => (
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
                                ))}

                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h2 className="flex justify-center items-center h-full ">
                        No bookmarks yet
                    </h2>
                )}
            </div>
            {/* <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                <div>
                    <h2>Are you sure you want to delete this item?</h2>
                    <div className="flex justify-center items-center space-x-4">
                        <button data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            No, cancel
                        </button>
                        <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                            Yes, I'm sure
                        </button>
                    </div>
                </div>
            </div> */}
        </div>
    );
};
export default Popup;
