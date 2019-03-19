import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

//react-redux
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';

//reducers
import { DMReducer } from './Containers/DailyMaintenance/Redux/dm_reducers';
import { CSReducer } from './Containers/CopingSkills/Redux/cs_reducers'

//Redux middleware.
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const rootReducer = combineReducers({ DMReducer, CSReducer })
const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
