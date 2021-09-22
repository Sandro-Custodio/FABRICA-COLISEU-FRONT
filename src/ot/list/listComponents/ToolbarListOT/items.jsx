import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactExport from "react-data-export";
import get_ot_data from "../../../visualizar-ot/actions";
import update_object_ot_seg from "../../../visualizar-ot-seg/actions";
import { value } from "../api.json";

const CompViewOt = ({ Click, selection }) => {
  return (
    selection.length === 1 && (
      <button
        data-for="top_dark_float"
        data-tip="Visualizar OT"
        type="button"
        className="btn-lg btn-link pull-left"
        data-toggle="modal"
        data-target="#visualizar"
        onClick={() => Click()}
      >
        <i className="fa fa-eye" data-toggle="tooltip" title="Visualizar OT" />
      </button>
    )
  );
};

const CompViewSeg = ({ Click, selection }) => {
  return (
    selection.length === 1 && (
      <button
        data-for="top_dark_float"
        data-tip="Visualizar Segmento"
        type="button"
        className="btn-lg btn-link pull-left"
        data-toggle="modal"
        data-target="#view_seg"
        onClick={() => Click()}
      >
        <i
          className="fa fa-window-maximize"
          data-toggle="tooltip"
          title="Visualizar Segmento"
        />
      </button>
    )
  );
};

const CompEncaminharSeg = ({ Click, selection }) => {
  return (
    selection.length === 1 && (
      <button
        data-for="top_dark_float"
        data-tip="Encaminhar Segmento"
        type="button"
        className="btn-lg btn-link pull-left"
        data-toggle="modal"
        data-target="#encaminhar_seg"
        onClick={() => Click()}
      >
        <i
          className="fa fa-forward"
          data-toggle="tooltip"
          title="Encaminhar Segmento"
        />
      </button>
    )
  );
};

class CompDownload extends React.Component {
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
    const {
      ot: { list }
    } = this.props;
    const { downloading } = this.state;
    const {
      ExcelFile,
      ExcelFile: { ExcelSheet, ExcelColumn }
    } = ReactExport;
    return (
      list.length > 0 && (
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
              {value.map(item => (
                <ExcelColumn key={item} label={value} value={item} />
              ))}
            </ExcelSheet>
          </ExcelFile>
        </React.Fragment>
      )
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ get_ot_data, update_object_ot_seg }, dispatch);

const mapStateToProps = state => ({
  auth: state.auth,
  ot: state.ot
});

export const ViewOt = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompViewOt);

export const ViewSeg = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompViewSeg);

export const EncaminharSeg = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompEncaminharSeg);

export const Download = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompDownload);
