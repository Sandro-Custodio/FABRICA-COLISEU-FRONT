import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Overlay from "common/msg/overlay/overlay";
import ReactTooltip from "react-tooltip";
import { reduxForm } from "redux-form";
import { edit_multi_segmentation, show_overlay, hide_overlay } from "./actions";

const _ = require("lodash");

const OtMultiGrid = props => {
  const {
    encaminharOtSegReducer: { seg_list },
    segsToSend,
    edit_multi_segmentation,
    show_overlay,
    hide_overlay,
    handleReloadParentPage
  } = props;

  const columns = ["OT Seg", " ", "Mensagem"];
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    let leftSegsToSend = 0;
    show_overlay();
    segsToSend.map(seg => {
      Promise.all([edit_multi_segmentation(seg)]).then(() => {
        leftSegsToSend = leftSegsToSend + 1;

        if (leftSegsToSend === segsToSend.length) {
          hide_overlay();
        }
      });
    });
    setSaved(true);
  };

  return (
    <div className="overlay-wrapper">
      <div className="box-body">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {seg_list &&
              seg_list.map(row => (
                <tr key={row?.seg_id}>
                  <td>{row?.seg_id}</td>
                  <td>
                    {row?.done && (
                      <>
                        {(row?.done === -2 || row?.done === -1) && (
                          <i className="fa fa-times" />
                        )}
                        {(row?.done === 1 || row?.done === 0) && (
                          <i className="fa fa-check" />
                        )}
                      </>
                    )}
                  </td>
                  <td>
                    {row?.done && (
                      <>
                        {row?.done === -1 &&
                          "Falha na transição do Segmento da Ot. Favor informar o suporte."}
                        {row?.done === -2 && "Inválido para ação múltipla"}
                        {row?.done === 1 && "OK"}
                      </>
                    )}
                  </td>
                  <ReactTooltip
                    id="top_dark_float"
                    place="top"
                    type="dark"
                    effect="float"
                  />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="box-footer">
        {!saved && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSave()}
          >
            Salvar
          </button>
        )}
        {saved && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              handleReloadParentPage();
              window.$("#ot_multi_grid_encaminhar").modal("hide");
              window.$("#encaminhar_multiplos_seg").modal("hide");
            }}
          >
            Concluir
          </button>
        )}
      </div>
      <Overlay />
    </div>
  );
};

const OtMultiGridForm = reduxForm({ form: "OtMultiGrid" })(OtMultiGrid);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      edit_multi_segmentation,
      show_overlay,
      hide_overlay
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    encaminharOtSegReducer: state.encaminharOtSeg
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtMultiGridForm);
