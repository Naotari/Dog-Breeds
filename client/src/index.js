import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <video src="Dog_video_background.mp4" autoPlay muted loop poster='https://images3.alphacoders.com/860/860391.jpg'></video>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
