import React from "react";
import { Modal } from "common";
import ModalForm from "common/layout/modal";
import FastFormDropdown from "common/FastFormDropdown";
import ReactTooltip from "react-tooltip";
import { connect, useSelector } from "react-redux";
import get from "lodash/get";
import { bindActionCreators } from "redux";
import { IconButton } from "../comps";
import Cell from "./acoesAgrupadores";
import FormFilter from "./FormFilter";
import ContractHistoryTable from "./ContractHistoryTable";
import EditarContrato from "contrato/editar-contrato";
import {
  getContratoList,
  getContractHistory,
  setOpenViewContract,
  setOpenVigencia,
  get_attachments_and_remarks,
  destroyForm
} from "../actions";
import { isPermited, logUserMenuAccess } from "auth/actions";

const Header = ({
  contratosProvedor,
  selection,
  filterContrato,
  redeList,
  abrangenciaList,
  contratoTimList,
  contratoProvedorList,
  detalheObjetoList,
  provedorList,
  grupoList,
  getContratoList,
  setLoading,
  getContractHistory,
  contrato_list,
  contract_hist_list,
  setOpenVigencia,
  setOpenViewContract,
  get_attachments_and_remarks,
  listContratoPaginator,
  destroyForm
}) => {
  const [open, setOpen] = React.useState(false);
  const [openHistView, setOpenHistView] = React.useState(false);

  const user = useSelector(({ auth: { user } }) => user.permissions);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxHeight: "35px"
      }}
    >
      <div style={{ display: "flex" }}>
        <IconButton icon="search" onClick={() => setOpen(true)} />
        <FastFormDropdown
          data={contratosProvedor}
          filterName="contract"
          handleSubmit={getContratoList}
        />
        {selection.length === 1 && (
          <>
            <IconButton
              icon="history"
              data-tip="Visualizar Histórico de Vigência de Contrato"
              onClick={() => {
                Promise.all([
                  getContractHistory(contrato_list[selection[0]]?.id)
                ]);
                setOpenHistView(true);
              }}
            />
            {isPermited(user, "DR_COJ1B1B1A1") &&
              contrato_list?.length > 0 &&
              selection?.length > 0 && (
                <>
                  <button
                    data-for="top_dark_float"
                    data-tip="Editar Contrato"
                    type="button"
                    className="btn-link pull-left"
                    data-toggle="modal"
                    data-target="#editar_contrato"
                    onClick={() => {
                      get_attachments_and_remarks(
                        contrato_list[selection[0]].id
                      );
                      logUserMenuAccess("DR_COJ1B1B1A1");
                    }}
                  >
                    <i className="fa fa-pencil" data-toggle="tooltip" />
                  </button>
                  <ReactTooltip
                    id="top_dark_float"
                    place="top"
                    type="dark"
                    effect="float"
                  />
                </>
              )}
            <button
              type="button"
              className="btn btn-link"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Vigência de Contrato"
              onClick={() => setOpenVigencia(true)}
            >
              <span className="primary">
                <i className="glyphicon glyphicon-edit" />
              </span>
            </button>

            <button
              type="button"
              className="btn btn-link"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Visualizar Contrato"
              onClick={() => setOpenViewContract(true)}
            >
              <span className="primary">
                <i className="glyphicon glyphicon-eye-open" />
              </span>
            </button>
          </>
        )}
        {open && (
          <Modal
            open={open}
            title="Buscar Contrato"
            dimension="sm"
            width="60vw"
            onClose={() => setOpen(false)}
            footer={
              <>
                {Object.keys(filterContrato).length > 0 && (
                  <button
                    type="button"
                    className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                    onClick={() => {
                      destroyForm("FiltroContratos.values");
                    }}
                  >
                    <i className="fa fa-eraser" /> LIMPAR
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary btn-footer"
                  disabled={filterContrato === null}
                  onClick={() => {
                    Promise.all([
                      getContratoList(filterContrato, listContratoPaginator)
                    ]);
                    setOpen(false);
                  }}
                >
                  Pesquisar
                </button>
              </>
            }
          >
            <FormFilter
              redeList={redeList}
              abrangenciaList={abrangenciaList}
              contratoTimList={contratoTimList}
              contratoProvedorList={contratoProvedorList}
              detalheObjetoList={detalheObjetoList}
              provedorList={provedorList}
              grupoList={grupoList}
            />
          </Modal>
        )}

        {openHistView && (
          <Modal
            open={openHistView}
            title={`Histórico de Vigência do Contrato ${
              contrato_list[selection[0]]?.contrato
            }`}
            dimension="lg"
            onClose={() => setOpenHistView(false)}
          >
            <ContractHistoryTable />
          </Modal>
        )}

        {contrato_list?.length > 0 && selection?.length > 0 && (
          <ModalForm
            LabelButtonSubmit=" "
            id="editar_contrato"
            title="Editar Contrato"
            dimension="modal-lg"
            height="80vw"
          >
            <EditarContrato
              linha_contrato={contrato_list[selection[0]]}
              reloadParent={() => getContratoList(filterContrato)}
            />
          </ModalForm>
        )}
        {contrato_list?.length > 0 && selection?.length > 0 && (
          <Cell row={contrato_list[selection[0]]} />
        )}
      </div>
    </div>
  );
};

Header.defaultProps = {
  rows: [],
  columns: []
};

const mapStateToProps = state => ({
  filterContrato: get(state.form.FiltroContratos, "values", {}),
  listContratoPaginator: state.lpuContratosReducer.paginator,
  contratosProvedor: get(state.lpuContratosReducer, "contratoProvedorList", [])
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getContratoList,
      getContractHistory,
      setOpenViewContract,
      setOpenVigencia,
      get_attachments_and_remarks,
      destroyForm
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
