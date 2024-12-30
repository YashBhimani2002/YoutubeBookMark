import React, { use } from "react";
import "../static/main.css";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
/**
 * React component for a modal dialog that asks the user to confirm the deletion of a bookmark.
 * The component renders a modal dialog with a prompt message and two buttons: "No, cancel" and
 * "Yes, I'm sure". When the user clicks the "Yes, I'm sure" button, the component sends a message
 * to the background script to delete the currently selected bookmark and then removes the
 * corresponding bookmark pointer from the YouTube video player's progress bar. It also sends a
 * message to the background script to reactivate the popup for confirmation, so that the user can
 * confirm that the bookmark has been deleted.
 *
 * The component is connected to the Redux store using `useSelector` and gets the currently
 * selected bookmark index and the bookmark data array from the Redux store.
 */

const RemoveConformation = () => {
  const { positionIndex, bookMarkData } = useSelector(
    (state: RootState) => state.data
  );

  /**
   * Sends a message to the background script to cancel the deletion of the currently
   * selected bookmark and to reactivate the popup for confirmation.
   */
  const handleCancel = () => {
    chrome.runtime.sendMessage({ type: "activeRemoverConformationPopup" });
  };

  /**
   * Sends a message to the background script to delete the currently selected bookmark and then remove
   * the corresponding bookmark pointer from the YouTube video player's progress bar.
   * Also sends a message to the background script to reactivate the popup for confirmation, so that
   * the user can confirm that the bookmark has been deleted.
   */
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
