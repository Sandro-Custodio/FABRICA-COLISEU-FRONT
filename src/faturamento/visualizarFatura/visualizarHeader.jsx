import React from "react";
import { Modal } from "common";
import { connect } from "react-redux";
import get from "lodash/get";
import { reduxForm } from "redux-form";
import { IconButton } from "../comps";
import FormFilter from "./FormFilter";
import ExportarResultado from "./ExportarResultado";
import ReactTooltip from "react-tooltip";

const VisualizarHeader = ({
  selection,
  rows,
  columns,
  regionalList,
  provedorList,
  faturaStatusList,
  agrupadorList,
  makeRequest,
  filter,
  loading
}) => {
  // const linhaSelecionada = selection.length === 1 && rows[selection[0]];
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <IconButton icon="search" onClick={() => setOpen(true)} />
        {open && (
          <Modal
            open={open}
            loading={loading}
            title="Buscar Fatura"
            dimension="sm"
            width="60vw"
            onClose={() => setOpen(false)}
            footer={
              <>
                <button
                  type="button"
                  className="btn btn-primary btn-footer"
                  onClick={() => {
                    makeRequest(filter);
                    setOpen(false);
                  }}
                >
                  Filtrar
                </button>
              </>
            }
          >
            <FormFilter
              regionalList={regionalList}
              provedorList={provedorList}
              faturaStatusList={faturaStatusList}
              agrupadorList={agrupadorList}
            />
          </Modal>
        )}
        {selection && selection.length === 1 &&(
          <>
            <IconButton
              icon="times"
              onClick={() => console.log("btn_invalidar_fatura")}
              title="Invalidar Fatura"
              id="btn_invalidar_fatura"
            />
            <ReactTooltip
              id="btn_invalidar_fatura"
              place="top"
              type="dark"
              effect="float"
            />
          </>
        )}
      </div>
      <ExportarResultado selection={selection} rows={rows} columns={columns} />
    </div>
  );
};

VisualizarHeader.defaultProps = {
  rows: [],
  columns: []
};

export default connect(state => ({
  filter: get(state, "form.faturaForm.values", {})
}))(reduxForm({ form: "faturaForm" })(VisualizarHeader));
