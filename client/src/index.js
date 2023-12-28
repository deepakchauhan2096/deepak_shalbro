import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


// redux's imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import store from "./redux/store"

// reducers
// import { accountReducer, projectReducer } from './redux/reducer/account';
// import env from "react-dotenv";
// const middleware = [thunk, logger];

// let store = createStore(
//   combineReducers({
//     account: accountReducer,
//     projects:projectReducer,
//   }),
//   composeWithDevTools(applyMiddleware(...middleware)),
// )


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
      
      <App />
    </Provider>
  </React.StrictMode>
);


