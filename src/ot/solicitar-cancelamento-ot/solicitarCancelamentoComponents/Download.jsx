/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import ReactExport from "react-data-export";
import { connect } from "react-redux";
import { value } from "./api.json";

const {
  ExcelFile,
  ExcelFile: { ExcelSheet, ExcelColumn }
} = ReactExport;

class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloading: "file-excel-o"
    };
  }

  downloadExec = () => {
    const { list } = this.props;
    this.setState({ downloading: "refresh fa-spin" });
    setTimeout(() => {
      this.setState({ downloading: "file-excel-o" });
    }, (3000 * list.length) / 35);
  };

  render() {
    const { list } = this.props;
    const { downloading } = this.state;
    return (
      <React.Fragment>
        <ExcelFile
          element={
            <button
              type="button"
              data-for="top_green_float"
              data-tip="Download"
              className="btn-lg btn-link fade-in filtro-btn pull-right"
              onClick={() => this.downloadExec()}
            >
              <i
                className={`fa fa-${downloading} text-success`}
                data-toggle="tooltip"
                title="Download"
              />
            </button>
          }
        >
          <ExcelSheet data={list} name="Employees">
            {value.map((_item, index) => (
              <ExcelColumn key={index} label={value} value={value[index]} />
            ))}
          </ExcelSheet>
        </ExcelFile>
        <ReactTooltip
          id="top_green_float"
          place="top"
          type="success"
          effect="float"
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  list: state.ot.list
});

export default connect(mapStateToProps)(Download);
