import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import promise from "redux-promise";
import multi from "redux-multi";
import thunk from "redux-thunk";
import reducers from "./reducers/reducers";
import AuthOrApp from "./authOrApp";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const devTools =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : null;
const store =
  process.env.NODE_ENV === "development"
    ? applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)
    : applyMiddleware(multi, thunk, promise)(createStore)(reducers);

const Index = () => (
  <Provider store={store}>
    <AuthOrApp />
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById("app"));

serviceWorker.unregister();
