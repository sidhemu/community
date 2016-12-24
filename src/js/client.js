import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Poll from "./pages/Poll";
import Question from "./pages/Question";
import Main from "./pages/Main";
import Layout from "./pages/Layout";
import QuestReply from "./pages/QuestionReply";
import PollsReply from "./pages/PollReply";

// import IO from 'socket.io-client'
// var socket = IO("http://www.eldew.com:3000");
// socket.on('connect', function () {
//    socket.send('hi');
//
//    socket.on('message', function (msg) {
//      // my msg
//    });
//  });

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Question}></IndexRoute>
      <Route path="poll" name="poll" component={Poll}></Route>
      <Route path="questionReply/:qId/:question" name="questionReply" component={QuestReply}></Route>
      <Route path="pollReply" name="pollReply" component={PollsReply}></Route>
    </Route>
  </Router>,
app);
