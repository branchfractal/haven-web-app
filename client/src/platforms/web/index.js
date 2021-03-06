import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { GlobalStyle } from "../../globalStyle";
import { AppWeb } from "./App";
import React from "react";
import {loadState, saveWebState} from "../../vendor/clipboard/dev-helper";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import { logger } from "../../vendor/clipboard/dev-helper";

let store = null;

export const startWebApp = () => {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  store = createStoreWithMiddleware(reducers);
  render();
};

export const startWebAppInDevMode = () => {
  const persistedState = loadState();
  const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(
    createStore
  );
  store = createStoreWithMiddleware(reducers, persistedState);
  store.subscribe(() => {
    saveWebState(store.getState());
  });

  render();
};

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <GlobalStyle />
      <AppWeb />
    </Provider>,
    document.querySelector("#root")
  );
};
