import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initializeFirebase } from "./services/firestore";

initializeFirebase();

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
