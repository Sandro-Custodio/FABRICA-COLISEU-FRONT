import { destroy, reduxForm } from "redux-form";

import ExportarResultado from "./ExportarResultado";
import FormFilter from "./FormFilter";
import { IconButton } from "../comps";
import { Modal } from "common";
import React from "react";
import VisualizarEvt from "./VisualizarEvt";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import { getEvtList } from "./actions";

const Header = ({
  getEvtList,
  selection,
  rows,
  rowsView,
  evtStatusList,
  provedorList,
  projetoList,
  otList,
  filter,
  makeRequest,
  columns,
  destroyForm
}) => {
  const linhaSelecionada = selection.length === 1 && rows[selection[0]];
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  const linhaSelecionadaComParametrosParaOBackend =
    selection.length === 1 && rows[selection[0]] && rowsView[selection[0]];

  const destroyFormHandler = () => {
    destroyForm();
  };

  const filtersObj = {
    request_protocol: text
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          display: "flex",
          justifContent: "center",
          alignContent: "center",
          maxHeight: "30px"
        }}
      >
        <IconButton icon="search" onClick={() => setOpen(true)} />
        <div
          className="input-group input-group-sm"
          style={{ display: "flex", width: "170px", marginRight: "30px" }}
        >
          <input
            style={{ width: "100%" }}
            className="form-control input-sm"
            type="text"
            value={text}
            onChange={evt => setText(evt.target.value)}
            placeholder="Cód. Evt"
          />
          <span className="input-group-btn">
            <button
              type="submit"
              className="btn btn-primary btn-flat"
              data-toggle="tooltip"
              title="Busca Rápida"
              onClick={() => getEvtList(filtersObj)}
            >
              <i className="fa fa-fast-forward" aria-hidden="true" />
            </button>
          </span>
        </div>
        {open && (
          <Modal
            open={open}
            title="Buscar EVT"
            dimension="sm"
            width="60vw"
            onClose={() => setOpen(false)}
            footer={
              <>
                {Object.keys(filter).length > 0 && (
                  <button
                    type="button"
                    className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                    onClick={() => {
                      destroyFormHandler();
                    }}
                  >
                    <i className="fa fa-eraser" /> LIMPAR
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary btn-footer"
                  onClick={() => {
                    makeRequest(filter, 1);
                    setOpen(false);
                  }}
                >
                  Pesquisar
                </button>
              </>
            }
          >
            <FormFilter
              projetoList={projetoList}
              otList={otList}
              provedorList={provedorList}
              evtStatusList={evtStatusList}
            />
          </Modal>
        )}
        <VisualizarEvt
          selection={selection}
          linhaSelecionada={linhaSelecionada}
          linhaSelecionadaComParametrosParaOBackend={
            linhaSelecionadaComParametrosParaOBackend
          }
        />
      </div>
      <ExportarResultado selection={selection} rows={rows} columns={columns} />
    </div>
  );
};

Header.defaultProps = {
  rows: [],
  columns: []
};

const formWrapper = reduxForm({
  form: "evtForm"
})(Header);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      destroyForm: () => destroy("evtForm.values"),
      getEvtList
    },
    dispatch
  );

const mapStateToProps = state => ({
  filter: get(state, "form.evtForm.values", {})
});

export default connect(mapStateToProps, mapDispatchToProps)(formWrapper);
