/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import ReactExport from "react-data-export";
import { connect } from "react-redux";
import { columns } from "../api.json";

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
    const {
      listarCircuito: { mwRows }
    } = this.props;
    this.setState({ downloading: "refresh fa-spin" });
    setTimeout(() => {
      this.setState({ downloading: "file-excel-o" });
    }, (3000 * mwRows.length) / 35);
  };

  render() {
    const {
      listarCircuito: { mwRows }
    } = this.props;
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
          <ExcelSheet data={mwRows} name="Employees">
            {columns.map((item, index) => (
              <ExcelColumn
                key={item.id}
                label={columns[index].title}
                value={columns[index].name}
              />
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
  listarCircuito: state.listarCircuito
});

export default connect(mapStateToProps)(Download);
