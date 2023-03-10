import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material";
import { persistor, store } from "./redux-saga/redux/store";
import App from "./App";
import { customTheme } from "./utils/customTheme";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   // <React.StrictMode>
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <ThemeProvider theme={customTheme}>
            <HelmetProvider>
               <Router>
                  <App />
               </Router>
            </HelmetProvider>
         </ThemeProvider>
      </PersistGate>
   </Provider>
   // </React.StrictMode>
);
