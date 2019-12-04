import "regenerator-runtime/runtime"; // Import this to fix regeneratorruntime issue. @babel/polyfill has been deprecated on Babel 7.4.0 and newer

import React from "react";
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

import App from './App';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

// Import main app

// Render App component to html
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
