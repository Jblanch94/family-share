import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";

import { SupabaseProvider } from "./contexts/SupabaseContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";

Sentry.init({
  dsn: "https://b97e6ae4d97f494f91a8b570e3e1edf3@o1211303.ingest.sentry.io/6347469",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});
const container = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <SupabaseProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </SupabaseProvider>

    <ToastContainer
      position='bottom-center'
      className='translate-x-0'
      closeOnClick
    />
  </React.StrictMode>,
  container
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
