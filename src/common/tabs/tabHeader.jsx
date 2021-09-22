import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectTab } from "./actions";
import IF from "../operator/if";

class TabHeader extends Component {
  render() {
    return (
      <IF test={this.props.tab.visible[this.props.target]}>
        <li
          className={`${
            this.props.tab.selected === this.props.target ? "active" : ""
          }`}
        >
          <a
            href="/#/"
            data-toggle="tab"
            onClick={() => this.props.selectTab(this.props.target)}
            data-target={this.props.target}
          >
            <i className={`fa fa-${this.props.icon}`} /> {this.props.label}
          </a>
        </li>
      </IF>
    );
  }
}

const mapStateToProps = state => ({ tab: state.tab });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectTab }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabHeader);
