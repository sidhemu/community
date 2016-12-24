import React from "react";
import { Link } from "react-router";
import Request from "superagent";
import _ from "lodash";
import { Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';
require('../../css/main.css');

export default class Poll extends React.Component {
  constructor(){
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
        pageNo : 1,
        pollinfo : [],
        pollItem: [],
        pollOptsinfo: { }
      }
  }
  componentWillMount(){

        var pageNo = 1;
        var url = 'http://clients.yhatch.com/api/v3/poll_response/3i52Hsr4XjGp3cQnp6ydsamx4HIt9ztv/?page='+pageNo;
        Request.get(url)
                 .then((response) => {
                  this.setState({
                    pollinfo: response.body,
                    pollItem: response.body.Items,
                    pollOptsinfo: response.body.Items[0].options,
                  })
                })
  }
  gotoPage(index) {
    var url = 'http://clients.yhatch.com/api/v3/poll_response/3i52Hsr4XjGp3cQnp6ydsamx4HIt9ztv/?page='+index;
    Request.get(url)
             .then((response) => {
              this.setState({
                pollinfo: response.body,
                pollItem: response.body.Items
              })
            })

    }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    var totalPage = this.state.pollinfo.total_pages;
    var currentPage = this.state.pollinfo.current_page;

    var pgrow = [];

    for (var i = 1; i < totalPage; i++) {
        pgrow.push(<DropdownItem  onClick={this.gotoPage.bind(this, i)} key={i}>{i}</DropdownItem>);
    }
        var canvases = this.state.pollItem.map(function(data,i) {
          var firstLtr = data.user_name.charAt(0);

          if (data.total_replies == 0) {
            return (
               <div key={i}>
                     <Col sm="12" md={{ size: 12, offset: 2 }} className="questionCard">
                      <Card block>
                        <CardTitle>
                                <div className="outerCircle"><span>{firstLtr}</span></div> {data.user_name}
                                <i className="fa fa-flag-o flagging" aria-hidden="true"></i>
                                <a className="questionLocation">{data.location_url}</a>
                        </CardTitle>
                        <CardText className="questionTxt">{data.message}</CardText>
                        <div> </div>
                        <div>
                             <Button className="replyBtn" disabled>No Discussion</Button>
                             <Button size="sm" color="link" className="disussionSpan">{data.likes} Likes</Button>
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
                                    <a className="questionLocation">{data.location_url}</a>
                        </CardTitle>
                        <CardText className="questionTxt">{data.message}</CardText>
                          <div> </div>
                        <div>
                             <Button className="replyBtn">
                                  <Link to="pollReply">
                                      {data.total_replies} Discussions
                                  </Link>
                            </Button>
                             <Button size="sm" color="link" className="disussionSpan">{data.likes} Likes</Button>
                        </div>
                      </Card>
                    </Col>
               </div>
            );
          }

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
        </div>
            <div className="col-md-8 col-md-offset-2">
              {canvases}
            </div>
        </div>
      </div>
    )
  }
}
