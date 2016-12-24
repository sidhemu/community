import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }
  toggleCollapse(filter) {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed,selected  : filter});
  }
  isActive(value){
    return 'btn '+((value===this.state.selected) ?'active':'default');
  }
  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const navClass = collapsed ? "collapse" : "";

    return (
      <div>
      <nav className="navbar navbar-default navbar-fixed-top upperNav" role="navigation">
          <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">Giftzapp Community</a>
              </div>
          </div>
      </nav>
      <nav className="navbar navbar-default lowerNav" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <IndexLink to="/" className={this.isActive('question')} onClick={this.toggleCollapse.bind(this,'question')}>Questions</IndexLink>
              </li>
              <li>
                <Link to="poll" className={this.isActive('poll')} onClick={this.toggleCollapse.bind(this,'poll')}>Polls</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
    );
  }
}
