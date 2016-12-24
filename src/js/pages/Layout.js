import React from "react";
import { Link } from "react-router";


import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
require('../../css/main.css');

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <div>

        <Nav location={location} />

        <div className="container mainCont">
          <div className="row">
            <div className="col-lg-12">
                {this.props.children}
            </div>
          </div>

        </div>
        <Footer/>
      </div>

    );
  }
}
