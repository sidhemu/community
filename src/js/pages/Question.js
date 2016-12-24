import React, { Component } from "react";
import { Link, Route, IndexRoute } from "react-router";
import Request from "superagent";
import _ from "lodash";
import QuestReply from "./QuestionReply";
import { SocketProvider, socketConnect,} from 'socket.io-react';
import io from 'socket.io-client';
import { Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, Button, Row, Col  } from 'reactstrap';
require('../../css/main.css');

export default class Question extends React.Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
        pageNo : 1,
        dropdownOpen: false,
        questioninfo : [],
        questionItem: []
      }
  }
  componentWillMount(){
    var url = 'http://clients.yhatch.com/api/v3/question_response/3i52Hsr4XjGp3cQnp6ydsamx4HIt9ztv/?page='+this.state.pageNo;
    Request.get(url)
             .then((response) => {
              this.setState({
                questioninfo: response.body,
                questionItem: response.body.Items
              })
            })
  }

  gotoPage = (index) => {
    var url = 'http://clients.yhatch.com/api/v3/question_response/3i52Hsr4XjGp3cQnp6ydsamx4HIt9ztv/?page='+index;
    Request.get(url)
             .then((response) => {
              this.setState({
                questioninfo: response.body,
                questionItem: response.body.Items
              })
            })

    }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  likeQuestion = (e, data) => {
      console.log(data.clientTocken + " is the client token");
      console.log(data.quesId + " is the question id");
      console.log("Session get ");
      //But this is not working
   }

  render() {
      var totalPage = this.state.questioninfo.total_pages;
      var currentPage = this.state.questioninfo.current_page;


      var pgrow = [];

      for (var i = 1; i < totalPage; i++) {
          pgrow.push(<DropdownItem  onClick={this.gotoPage.bind(this, i)} key={i}>{i}</DropdownItem>);
      }
         //console.log("filter work in progress "+this.state.questioninfo.data);
        var canvases = this.state.questionItem.map(function(data,i) {
          var datInfo = {
            quesId : data.question_id,
            clientTocken: '3i52Hsr4XjGp3cQnp6ydsamx4HIt9ztv'
          }
            var qid = data.question_id;
          var firstLtr = data.user_name.charAt(0);
          if (data.total_replies == 0) {
            return (
               <div key={i}>
                     <Col sm="12" md={{ size: 12, offset: 2 }} className="questionCard">
                      <Card block>
                        <CardTitle>
                                <div className="outerCircle"><span>{firstLtr}</span></div> {data.user_name}
                                <i className="fa fa-flag-o flagging" aria-hidden="true"></i>
                                <a href={data.location_url} target="_blank" className="questionLocation">{data.location_url}</a>
                        </CardTitle>
                        <CardText className="questionTxt">{data.message}</CardText>
                        <div>
                             <Button className="replyBtn" disabled>No Discussion</Button>
                             <Button size="sm" color="link" className="disussionSpan"  onClick = {() => this.likeQuestion(this,datInfo)}>{data.likes} Likes</Button>
                        </div>
                      </Card>
                    </Col>
               </div>
            );
          }else{

            return (
               <div key={i}>
                     <Col sm="12" md={{ size: 12, offset: 2 }} className="questionCard">
                      <Card block>
                        <CardTitle>
                                    <div className="outerCircle"><span>{firstLtr}</span></div> {data.user_name}
                                    <i className="fa fa-flag-o flagging" aria-hidden="true"></i>
                                    <a href={data.location_url} target="_blank" className="questionLocation">{data.location_url}</a>
                        </CardTitle>
                        <CardText className="questionTxt">{data.message}</CardText>
                        <div>
                              <Button className="replyBtn">
                                <Link to={`questionReply/${data.question_id}/${data.question_url}`}>
                                  {data.total_replies} Discussions
                                </Link>
                              </Button>
                             <Button size="sm" color="link" className="disussionSpan" onClick = {() => this.likeQuestion(this, datInfo)}>{data.likes} Likes</Button>
                        </div>
                      </Card>
                    </Col>
               </div>
            );
          }

       },this);

    return(
      <div className="container">
        <div className="row">
        <div className="pageInfo">
        <Dropdown className="inline" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            Pages
          </DropdownToggle>
          <DropdownMenu>
            {pgrow}
          </DropdownMenu>
        </Dropdown>
        <p className="inline currPgNo">Page: {currentPage}</p>
        </div>
            <div className="col-md-8 col-md-offset-2">

                {canvases}
            </div>
        </div>

      </div>
    )
  }
}
