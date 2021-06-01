import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { QueryParamProvider } from 'use-query-params';


// const Router =
//   process.env.NODE_ENV === "production" ? HashRouter : BrowserRouter;

ReactDOM.render(
  <Router basename="/">
    <QueryParamProvider ReactRouterRoute={Route}>
      <App />
    </QueryParamProvider>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
