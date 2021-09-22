import React, { useState } from "react";
import { IconButton, Card, Modal } from "common";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import get from "lodash/get";
import { Label } from "common/form/components";
import Filtro from "./Filtro";
import Tabela from "./Tabela";
import { columnsListar, columnsListarWidth } from "./columns.json";
import AdicionarNovoAgrupador from "./AdicionarNovoAgrupador";
import { salvarNovoAgrupador } from "./action";
import Cell from "./AcoesAgrupadores";
import { useSelector } from "react-redux";
import { isPermited, logCodeAndCallback } from "auth/actions";
// import "./styles.css";

const Main = ({}) => {
  const [loading, setLoading] = useState(false);
  const [rows, setRowsTabela] = useState([]);
  const [rowsResponse, setRowsResponse] = useState([]);
  const [selection, onSelectionChange] = useState([]);
  const [paramsNovoAgrupador, setParamsNovoAgrupador] = React.useState([]);

  const LabelComp = ({ text, col }) => (
    <div className={`col-sm-${col}`}>
      <Label text={text} />
    </div>
  );
  LabelComp.defaultProps = { col: 6 };

  const [open, setOpen] = useState(false);

  const novoAgrupador = () => {
    toastr.confirm("Deseja criar um novo agrupador?", {
      onOk: () => {
        setOpen(true);
      }
    });
  };

  const user = useSelector(({ auth: { user } }) => user.permissions);

  return (
    <div>
      <Modal
        open={open}
        title="Cadastro de Agrupador"
        dimension="lg"
        onClose={() => setOpen(false)}
        footer={
          <div>
            <button
              type="button"
              className="btn btn-primary btn-footer"
              onClick={() => {
                setLoading(true);
                salvarNovoAgrupador(paramsNovoAgrupador)
                  .then(resp => {
                    if (resp.status === 200) {
                      toastr.info("Operação realizada com sucesso!");
                      setLoading(false);
                      setOpen(false);
                    } else {
                      toastr.info("Ocorreu um erro ao salvar na base!");
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  })
                  .finally(() => setLoading(false));
              }}
            >
              Salvar
            </button>
          </div>
        }
        disableBtnClose
      >
        <AdicionarNovoAgrupador
          open={open}
          setOpen={setOpen}
          setLoading={setLoading}
          setParamsNovoAgrupador={setParamsNovoAgrupador}
        />
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10
        }}
      >
        <Filtro
          setLoading={setLoading}
          setRowsTabela={setRowsTabela}
          setRowsResponse={setRowsResponse}
        />
        {isPermited(user, "DR_COF1D1A1") && (
          <IconButton
            icon="plus"
            className="btn-primary"
            onClick={() => {
              logCodeAndCallback("DR_COF1D1A1", novoAgrupador)
            }}
          >
            Novo Agrupador
          </IconButton>
        )}
      </div>
      <div>
        <Tabela
          columns={columnsListar}
          loading={loading}
          rows={rows}
          columnWidths={columnsListarWidth}
          actions={[
            {
              columnName: "tableAction",
              component: Cell
            }
          ]}
          selectionProps={{ selection, onSelectionChange }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ form, state }) => ({
  email: get(form.FiltroEmail, "values", null)
});

const formWrapper = reduxForm({
  form: "FiltroEmail"
})(Main);

export default connect(mapStateToProps)(formWrapper);
