import "regenerator-runtime/runtime"; // Import this to fix regeneratorruntime issue. @babel/polyfill has been deprecated on Babel 7.4.0 and newer

import React from "react";
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import {withRouter} from "react-router-dom"

import routes from "./constants/routes";
import {
  BrowserRouter
} from "react-router-dom";

import App from './App';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

// Import main app
const MainApp = withRouter(App);

// Render App component to html
render(
  <Provider store={store}>
    <BrowserRouter basename="chat-app">
      <MainApp routes={routes}/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
