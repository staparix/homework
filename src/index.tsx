import "toastr/build/toastr.min.css";

import * as React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";
import thunk  from "redux-thunk";
import { AppConnected } from "./AppConnected";
import { rootReducer } from "./state/rootReducer";

const root = document.querySelector("#app");

if (!root) {
    throw new Error("can not find dom element with id=app")
}

const store = createStore(rootReducer, applyMiddleware(thunk));

const MainApp: React.FunctionComponent = () => {
    return (
        <Provider store={ store }>
            <AppConnected/>
        </Provider>
    )
};

ReactDOM.render(<MainApp/>, root);
