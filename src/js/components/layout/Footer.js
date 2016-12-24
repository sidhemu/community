import React from "react";
require('../../../css/main.css');

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer navbar-default-bottom">

        <div class="row">
          <div class="col-lg-12">
            <p>Copyright &copy; yHatch.com</p>
          </div>
        </div>
      </footer>
    );
  }
}
