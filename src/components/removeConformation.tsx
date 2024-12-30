import React, { use } from "react";
import "../static/main.css";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
const RemoveConformation = () => {
  const { positionIndex, bookMarkData } = useSelector(
    (state: RootState) => state.data
  );

  const handleCancel = () => {
    chrome.runtime.sendMessage({ type: "activeRemoverConformationPopup" });
  };
  const handleDelete = () => {
    chrome.runtime.sendMessage({ type: "delete", number: positionIndex });
    const updatedData = bookMarkData.filter((_, i) => i !== positionIndex);
    chrome.runtime.sendMessage({
      type: "removePointer",
      updatedData: updatedData,
    });
    chrome.runtime.sendMessage({ type: "activeRemoverConformationPopup" });
  };
  return (
    <div className="modal-container">
      <div className="modal-content">
        <p className="modal-content-text">
          Are you sure you want to delete this 
          BookMark-{positionIndex || 0}, {bookMarkData[positionIndex]?.timeText || '00:00'}?
        </p>
        <div className="modal-content-button-container">
          <button
            data-modal-toggle="deleteModal"
            type="button"
            className="modal-button btn-gray"
            onClick={() => handleCancel()}
          >
            No, cancel
          </button>
          <button type="submit" className="modal-button btn-red" onClick={()=>handleDelete()}>
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveConformation;
