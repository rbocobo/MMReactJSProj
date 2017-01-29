import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import App from "./app.js";
import Content from "./components/content";
import TaskTable from "./components/tasktable"

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Content}></IndexRoute>
      <Route path="tasktable" name="tasktable" component={TaskTable}></Route>
    </Route>
  </Router>,
  document.getElementById("root")
);
