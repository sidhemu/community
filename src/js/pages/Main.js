import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Poll from "../pages/Poll";
import Question from "../pages/Question";
import Layout from "../pages/Layout";

export default class Main extends React.Component {

render(){
  return(
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Question}></IndexRoute>
        <Route path="poll" name="poll" component={Poll}></Route>
      </Route>
    </Router>
  );
}



}
