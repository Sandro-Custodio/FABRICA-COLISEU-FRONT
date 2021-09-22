import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactTooltip from "react-tooltip";
import { logout } from "../../auth/actions";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  black = () => {
    window
      .$("body")
      .removeClass("skin-red skin-blue")
      .addClass("skin-black");
  };

  default = () => {
    window
      .$("body")
      .removeClass("skin-red skin-black")
      .addClass("skin-blue");
  };

  changeOpen = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  render() {
    const { open } = this.state;
    const { logout } = this.props;
    const {
      auth: {
        user: { name, area, id }
      }
    } = this.props || null;
    return (
      <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
          <li>
            <ul className="content__color">
              <li
                name="color-item--black"
                className="content__color-item content__color-item--black"
                onClick={this.black}
              />
              <li
                name="color-item--default"
                className="content__color-item content__color-item--default"
                onClick={this.default}
              />
            </ul>
          </li>
          <li
            onMouseLeave={this.changeOpen}
            className={`dropdown user user-menu ${open ? "open" : ""}`}
          >
            <a
              data-for="user-navbar"
              data-tip={`${area?.name ? area?.name : ""}`}
              href="#/"
            >
              <span className="hidden-xs">{name}</span>
            </a>
          </li>

          <li>
            <a
              href="#/"
              onClick={() => Promise.all([logout(id)])}
              data-for="power-off"
              data-tip="Sair"
            >
              <i className="fa fa-power-off" />
            </a>
          </li>
        </ul>
        <ReactTooltip
          id="power-off"
          place="bottom"
          type="error"
          effect="float"
        />
        <ReactTooltip
          id="user-navbar"
          place="bottom"
          type="info"
          effect="float"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
