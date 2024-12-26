import React from "react";
import '../static/main.css';
const Popup = () => {
    return (
        <div className="min-w-44 h-44 w-full flex flex-col items-center p-1 gap-1">
            <div className="flex bg-gray-300 p-1 w-full rounded-sm gap-2">
                <img
                    src="../assets/resource/youtubeBookMarkIcon.png" className=" w-5 h-5" />
                <h2 className="flex-1 font-bold">YouTube Bookmarker</h2>
            </div>
            <div className="flex justify-center items-center h-full bg-slate-100 w-full p-1 rounded-sm border-[1px] border-gray-300">
                List of youtube bookmarks
            </div>
        </div>
    )
}
export default Popup;