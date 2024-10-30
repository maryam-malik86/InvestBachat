import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import AppProvider from "./app/AppContext";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const container = document.getElementById("root");
<link
  href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap"
  rel="stylesheet"
></link>;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
      <App  />
      </AppProvider>
      <ToastContainer 
      autoClose={2000}
      />
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
