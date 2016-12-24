import React from "react";
import { Link, Route, IndexRoute } from "react-router";
import Request from "superagent";
import _ from "lodash";
import { Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, Button, Row, Col  } from 'reactstrap';
require('../../css/main.css');

export default class QuestReply extends React.Component {
  constructor(){
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
        pageNo : 1,
        dropdownOpen: false,
        questioninfo : [],
        questionItem: []
      }
  }
  componentWillMount(){
    var url = 'http://clients.yhatch.com/api/v3/reply_response/3i52Hsr4XjGp3cQnp6ydsamx4HIt9ztv/?page='+this.state.pageNo+'&question_id='+this.props.params.qId;
    Request.get(url)
             .then((response) => {
              this.setState({
                questioninfo: response.body,
                questionItem: response.body.Items
              })
            })
  }
  gotoPage(index) {
    var url = 'http://clients.yhatch.com/api/v3/reply_response/3i52Hsr4XjGp3cQnp6ydsamx4HIt9ztv/?page='+index+'&question_id='+this.props.params.qId;
    Request.get(url)
             .then((response) => {
              this.setState({
                questioninfo: response.body,
                questionItem: response.body.Items
              })
            })

    }

    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }
  render() {
    var totalPage = this.state.questioninfo.total_pages;
    var currentPage = this.state.questioninfo.current_page;
    var pgrow = [];

    for (var i = 1; i < totalPage; i++) {
        pgrow.push(<DropdownItem  onClick={this.gotoPage.bind(this, i)} key={i}>{i}</DropdownItem>);
    }
      // console.log("filter work in progress "+this.state.questionItem.question_id);

      var canvases = this.state.questionItem.map(function(data,i) {
          var firstLtr = data.user_name.charAt(0);
          var qid = data.question_id;
          return (
             <div key={i}>
                   <Col sm="12" md={{ size: 12, offset: 2 }} className="replyCard">
                    <Card block>
                      <CardTitle>
                                  <div className="outerCircle"><span>{firstLtr}</span></div> {data.user_name}
                                  <i className="fa fa-flag-o flagging" aria-hidden="true"></i>
                      </CardTitle>
                      <CardText className="replyTxt">{data.message}</CardText>
                      <div>
                           <Button size="sm" color="link" className="disussionSpan">{data.likes} Likes</Button>
                      </div>
                    </Card>
                  </Col>
             </div>
          );


     });

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
        <div className="ttlrplyDiv">
          <p className="inline ttlRply">{this.state.questioninfo.total_reply} Replies</p>
        </div>
        </div>
            <Col className="questionCardRPage">
            <Card block>
              <CardTitle>
                          <span className="quesUer"> {this.state.questioninfo.user_name}</span>
                          <i className="fa fa-flag-o flagging" aria-hidden="true"></i>
              </CardTitle>
              <CardText className="questionTxt">{this.state.questioninfo.message}</CardText>
              <div>
                   <Button size="sm" color="link" className="disussionSpan">{this.state.questioninfo.likes} Likes</Button>
              </div>
            </Card>
            </Col>
            <div className="col-md-10 col-md-offset-1">
                {canvases}
            </div>
        </div>

      </div>
    )
  }
}
