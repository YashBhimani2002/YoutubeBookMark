import React from "react";
import {createRoot} from "react-dom/client";
import Popup from "./popup";
import { Provider } from "react-redux";
import { store } from "../app/store";

const appElement = document.createElement("div");
document.body.appendChild(appElement);
if(!appElement){
    throw new Error("appElement not found");
}
const root = createRoot(appElement);
root.render(<Provider store={store}><Popup/></Provider>)