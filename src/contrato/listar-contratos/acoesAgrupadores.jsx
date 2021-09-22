import React from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { Modal } from "common";
import { toastr } from "react-redux-toastr";
import AlterarVigencia from "./alterarVigencia";
import {
  saveVigenciaContrato,
  getContractResume,
  setOpenVigencia,
  setOpenViewContract
} from "../actions";
import ContractResume from "./ContractResume";

const Cell = props => {
  const {
    lpuContratosReducer: { openVigencia, openViewContract },
    setOpenVigencia,
    setOpenViewContract
  } = props;

  const [loading, setLoading] = React.useState(false);
  const [paramsVigenciaContrato, setParamsVigenciaContrato] = React.useState(
    {}
  );

  const user = useSelector(({ auth }) => auth.user);

  return (
    <div>
      {openVigencia && (
        <Modal
          open={openVigencia}
          title="Alterar Vigência de Contrato"
          dimension="lg"
          width="60vw"
          onClose={() => setOpenVigencia(false)}
          footer={
            <div>
              <button
                type="button"
                className="btn btn-primary btn-footer"
                onClick={() => {
                  toastr.confirm("Deseja alterar a vigência deste Contrato?", {
                    onOk: () => {
                      setLoading(true);
                      saveVigenciaContrato(paramsVigenciaContrato, user)
                        .then(resp => {
                          if (resp.status === 200) {
                            toastr.info("Operação realizada com sucesso!");
                            setLoading(false);
                            setOpenVigencia(false);
                          } else {
                            toastr.info("Ocorreu um erro ao salvar na base!");
                          }
                        })
                        .catch(error => {
                          console.log(error);
                        })
                        .finally(() => setLoading(false));
                    }
                  });
                }}
              >
                Salvar
              </button>
            </div>
          }
          disableBtnClose
        >
          <AlterarVigencia
            setParamsVigenciaContrato={setParamsVigenciaContrato}
            linhaSelecionada={props.row}
          />
        </Modal>
      )}
      {openViewContract && (
        <Modal
          open={openViewContract}
          title="Resumo de Contrato"
          dimension="lg"
          width="60vw"
          onClose={() => setOpenViewContract(false)}
          footer={<></>}
          disableBtnClose
        >
          <ContractResume contract={props.row} />
        </Modal>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getContractResume,
      setOpenVigencia,
      setOpenViewContract
    },
    dispatch
  );

const mapStateToProps = state => ({
  lpuContratosReducer: state.lpuContratosReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
