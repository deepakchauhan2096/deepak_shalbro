import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// redux's imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import { accountReducer, projectReducer } from './redux/reducer/account';
import env from "react-dotenv";

const middleware = [thunk, logger];

let store = createStore(
  combineReducers({
    account: accountReducer,
    projects:projectReducer,
  }),
  composeWithDevTools(applyMiddleware(...middleware)),
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
