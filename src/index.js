import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Containers/App/App";

import * as serviceWorker from "./serviceWorker";

//react-redux
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";

//reducers
import { appReducer } from "./Containers/App/Redux/app_reducers";
import { DMReducer } from "./Containers/DailyMaintenance/Redux/dm_reducers";
import { CSReducer } from "./Containers/CopingSkills/Redux/cs_reducers";
import { historyReducer } from "./Containers/History/Redux/history_reducers";
import { CBTReducer } from "./Containers/CBT/Redux/cbt_reducers";

//Redux middleware.
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

const rootReducer = combineReducers({
  appReducer,
  DMReducer,
  CSReducer,
  historyReducer,
  CBTReducer
});
const logger = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
