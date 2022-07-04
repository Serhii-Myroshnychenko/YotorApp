import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./redux/redux-store";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";


let rerenderEntireTree = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <App state={state} dispatch={store.dispatch.bind(store)} />
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById("root")
    );
}
rerenderEntireTree(store.getState());
store.subscribe(rerenderEntireTree);
reportWebVitals();
