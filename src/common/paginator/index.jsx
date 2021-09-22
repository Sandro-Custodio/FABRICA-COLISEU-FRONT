import { Field, change, reduxForm } from "redux-form";
import React, { useEffect, useRef } from "react";
import {
  change_evt_paginator,
  change_listContrato_paginator,
  change_ll_paginator,
  change_ot_paginator,
  change_users_paginator,
  getContratoList,
  getCriticasHigienizacao,
  getEvtList,
  getOtConsultList,
  getOtList,
  getCancelamentoOtList,
  getSnoaHigieneCritics,
  get_ll_list,
  searchUser,
  get_ots,
  change_higieProjetos_paginator
} from "./actions";

import { IconButton } from "common";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import { withRouter } from "react-router-dom";

function Paginator(props) {
  const {
    auth,
    filterContrato,
    listarLL,
    get_ll_list,
    change_ll_paginator,
    evt,
    ot,
    listContratoPaginator,
    lpuContratosReducer,
    getEvtList,
    getOtList,
    getCancelamentoOtList,
    getContratoList,
    getOtConsultList,
    change_ot_paginator,
    change_listContrato_paginator,
    change_evt_paginator,
    usuariosForm,
    cadastroUsuariosReducer,
    searchUser,
    sincronizarBdConfigReducer,
    getCriticasHigienizacao,
    change_users_paginator,
    CurrentPageValue,
    updateField,
    useCase,
    get_ots,
    change_higieProjetos_paginator,
    listarOtHigienizarProj
  } = props;

  const useComponentDidMount = () => {
    const ref = useRef();
    useEffect(() => {
      ref.current = true;
    }, []);
    return ref.current;
  };

  const isComponentMounted = useComponentDidMount();

  useEffect(() => {
    if (isComponentMounted) {
      switch (useCase) {
        case "LISTAR_OT": {
          getOtList(auth, ot);
          break;
        }
        case "CONSULTAR_OT": {
          getOtConsultList(auth, ot);
          break;
        }
        case "LISTAR_OT_CANCELAMENTO": {
          getCancelamentoOtList(auth, ot);
          break;
        }
        default:
          break;
      }
    }
  }, [ot.paginator]);

  useEffect(() => {
    if (isComponentMounted) {
      getContratoList(filterContrato, listContratoPaginator);
    }
  }, [listContratoPaginator]);

  useEffect(() => {
    if (isComponentMounted) {
      get_ots(auth, listarOtHigienizarProj, false);
    }
  }, [listarOtHigienizarProj.paginator]);

  useEffect(() => {
    if (isComponentMounted) {
      get_ll_list(auth, listarLL);
    }
  }, [listarLL.paginator]);

  useEffect(() => {
    if (isComponentMounted) {
      searchUser(usuariosForm, cadastroUsuariosReducer);
    }
  }, [cadastroUsuariosReducer.paginator]);

  useEffect(() => {
    if (isComponentMounted) {
      getCriticasHigienizacao(sincronizarBdConfigReducer);
    }
  }, [sincronizarBdConfigReducer.paginator]);

  useEffect(() => {
    if (isComponentMounted) {
      getSnoaHigieneCritics(sincronizarBdConfigReducer);
    }
  }, [sincronizarBdConfigReducer.paginator]);

  useEffect(() => {
    if (isComponentMounted) {
      getEvtList(evt, evt.paginator.pageSize, evt.paginator.currentPage);
    }
  }, [evt.paginator]);

  let maxPagesQtd;

  // change maxPagesQtd based on useCase
  switch (useCase) {
    case "LISTAR_OT": {
      ({ maxPagesQtd } = ot);
      break;
    }

    case "CONSULTAR_OT": {
      ({ maxPagesQtd } = ot);
      break;
    }

    case "LISTAR_OT_CANCELAMENTO": {
      ({ maxPagesQtd } = ot);
      break;
    }

    case "LISTAR_LL": {
      ({ maxPagesQtd } = listarLL);
      break;
    }
    case "LISTA_CONTRATO": {
      ({ maxPagesQtd } = lpuContratosReducer);
      break;
    }
    case "HIGIE_PROJETOS": {
      ({ maxPagesQtd } = listarOtHigienizarProj);
      break;
    }

    case "LISTAR_USUARIOS": {
      ({ maxPagesQtd } = cadastroUsuariosReducer);
      break;
    }

    case "LISTAR_BDCONFIG": {
      ({ maxPagesQtd } = sincronizarBdConfigReducer);
      break;
    }

    case "LISTAR_SNOA": {
      ({ maxPagesQtd } = sincronizarBdConfigReducer);
      break;
    }

    case "LISTAR_EVT": {
      ({ maxPagesQtd } = evt);
      break;
    }

    default:
      break;
  }

  const incrementPaginatorThenGetList = (CurrentPageValue, Case) => {
    const incrementedCurrentPage =
      parseInt(CurrentPageValue?.values.currentPage, 10) + 1;

    updateField("currentPage", incrementedCurrentPage);

    switch (Case) {
      case "LISTAR_OT": {
        change_ot_paginator({
          currentPage: incrementedCurrentPage,
          pageSize: ot.paginator.pageSize
        });

        break;
      }

      case "CONSULTAR_OT": {
        change_ot_paginator({
          currentPage: incrementedCurrentPage,
          pageSize: ot.paginator.pageSize
        });

        break;
      }

      case "LISTAR_OT_CANCELAMENTO": {
        change_ot_paginator({
          currentPage: incrementedCurrentPage,
          pageSize: ot.paginator.pageSize
        });

        break;
      }

      case "LISTAR_LL": {
        change_ll_paginator({
          currentPage: incrementedCurrentPage,
          pageSize: listarLL.paginator.pageSize
        });

        break;
      }

      case "LISTAR_USUARIOS": {
        change_users_paginator({
          currentPage: incrementedCurrentPage,
          pageSize: cadastroUsuariosReducer.paginator.pagesize
        });

        break;
      }

      case "LISTAR_BDCONFIG": {
        change_users_paginator({
          currentPage: incrementedCurrentPage,
          pageSize: sincronizarBdConfigReducer.paginator.pagesize
        });
        break;
      }

      case "LISTAR_SNOA": {
        change_users_paginator({
          currentPage: incrementedCurrentPage,
          pageSize: sincronizarBdConfigReducer.paginator.pagesize
        });
        break;
      }

      case "LISTA_CONTRATO": {
        change_listContrato_paginator({
          currentPage: incrementedCurrentPage,
          pageSize: listContratoPaginator.pageSize
        });
      }

      case "HIGIE_PROJETOS": {
        change_higieProjetos_paginator({
          currentPage: incrementedCurrentPage,
          pageSize: listarOtHigienizarProj.paginator.pagesize
        });
      }

      case "LISTAR_EVT": {
        change_evt_paginator({
          currentPage: incrementedCurrentPage,
          pageSize: evt.paginator.pageSize
        });

        break;
      }

      default:
        break;
    }
  };

  const decrementPaginatorThenGetList = (CurrentPageValue, Case) => {
    const decrementedCurrentPage =
      parseInt(CurrentPageValue?.values.currentPage, 10) - 1;

    updateField("currentPage", decrementedCurrentPage);

    switch (Case) {
      case "LISTAR_OT": {
        change_ot_paginator({
          currentPage: decrementedCurrentPage,
          pageSize: ot.paginator.pageSize
        });

        break;
      }

      case "CONSULTAR_OT": {
        change_ot_paginator({
          currentPage: decrementedCurrentPage,
          pageSize: ot.paginator.pageSize
        });

        break;
      }

      case "LISTAR_OT_CANCELAMENTO": {
        change_ot_paginator({
          currentPage: decrementedCurrentPage,
          pageSize: ot.paginator.pageSize
        });

        break;
      }

      case "LISTAR_LL": {
        change_ll_paginator({
          currentPage: decrementedCurrentPage,
          pageSize: listarLL.paginator.pageSize
        });

        break;
      }

      case "LISTAR_USUARIOS": {
        change_users_paginator({
          currentPage: decrementedCurrentPage,
          pageSize: cadastroUsuariosReducer.paginator.pagesize
        });

        break;
      }

      case "LISTA_CONTRATO": {
        change_listContrato_paginator({
          currentPage: decrementedCurrentPage,
          pageSize: listContratoPaginator.pageSize
        });

        break;
      }

      case "HIGIE_PROJETOS": {
        change_higieProjetos_paginator({
          currentPage: decrementedCurrentPage,
          pageSize: listarOtHigienizarProj.paginator.pagesize
        });
      }

      case "LISTAR_EVT": {
        change_ot_paginator({
          currentPage: decrementedCurrentPage,
          pageSize: evt.paginator.pageSize
        });

        break;
      }

      default:
        break;
    }
  };

  const handlePageBlur = (value, Case) => {
    switch (Case) {
      case "LISTAR_OT": {
        change_ot_paginator({
          currentPage: parseInt(value, 10),
          pageSize: ot.paginator.pageSize
        });
        break;
      }

      case "CONSULTAR_OT": {
        change_ot_paginator({
          currentPage: parseInt(value, 10),
          pageSize: ot.paginator.pageSize
        });
        break;
      }

      case "LISTAR_OT_CANCELAMENTO": {
        change_ot_paginator({
          currentPage: parseInt(value, 10),
          pageSize: ot.paginator.pageSize
        });
        break;
      }

      case "LISTAR_LL": {
        change_ll_paginator({
          currentPage: parseInt(value, 10),
          pageSize: listarLL.paginator.pageSize
        });
        break;
      }

      case "LISTAR_USUARIOS": {
        change_users_paginator({
          currentPage: parseInt(value, 10),
          pageSize: cadastroUsuariosReducer.paginator.pageSize
        });
        break;
      }

      case "LISTA_CONTRATO": {
        change_listContrato_paginator({
          currentPage: parseInt(value, 10),
          pageSize: listContratoPaginator.pageSize
        });
      }

      case "HIGIE_PROJETOS": {
        change_higieProjetos_paginator({
          currentPage: parseInt(value, 10),
          pageSize: listarOtHigienizarProj.paginator.pagesize
        });
      }

      case "LISTAR_EVT": {
        change_evt_paginator({
          currentPage: parseInt(value, 10),
          pageSize: evt.paginator.pageSize
        });
        break;
      }

      default:
        break;
    }
  };

  const decrementButtonDisabled = () => {
    if (useCase && (useCase === "LISTAR_OT" || useCase === "CONSULTAR_OT" || useCase === "LISTAR_OT_CANCELAMENTO")) {
      return ot.paginator.currentPage === 1;
    }
    if (useCase && useCase === "LISTAR_LL") {
      return listarLL.paginator.currentPage === 1;
    }
    if (useCase && useCase === "LISTAR_USUARIOS") {
      return cadastroUsuariosReducer.paginator.currentPage === 1;
    }
    if (useCase && useCase === "LISTA_CONTRATO") {
      return listContratoPaginator.currentPage === 1;
    }
    if (useCase && useCase === "HIGIE_PROJETOS") {
      return listarOtHigienizarProj.paginator.currentPage === 1;
    }
    if (useCase && useCase === "LISTAR_EVT") {
      return evt.paginator.currentPage === 1;
    }
    return false;
  };

  const incrementButtonDisabled = () => {
    if (useCase && (useCase === "LISTAR_OT" || useCase === "CONSULTAR_OT" || useCase === "LISTAR_OT_CANCELAMENTO")) {
      return ot.paginator.currentPage === maxPagesQtd;
    }
    if (useCase && useCase === "LISTAR_LL") {
      return listarLL.paginator.currentPage === maxPagesQtd;
    }
    if (useCase && useCase === "LISTAR_USUARIOS") {
      return cadastroUsuariosReducer.paginator.currentPage === maxPagesQtd;
    }
    if (useCase && useCase === "LISTA_CONTRATO") {
      return listContratoPaginator.currentPage === maxPagesQtd;
    }
    if (useCase && useCase === "HIGIE_PROJETOS") {
      return listarOtHigienizarProj.paginator.currentPage === maxPagesQtd;
    }
    if (useCase && useCase === "LISTAR_EVT") {
      return evt.paginator.currentPage === maxPagesQtd;
    }
    return false;
  };

  return (
    <form style={{ maxWidth: "50vw" }} onSubmit={e => e.preventDefault()}>
      <div className="form-group" style={{ display: "inline-grid" }}>
        <IconButton
          style={{
            margin: 0,
            padding: "6px 0px",
            maxWidth: 20,
            display: "flex",
            justifyContent: "space-between",
            boxSizing: "content-box"
          }}
          icon="angle-double-left"
          className="col-xs-1 col-sm-1"
          onClick={() => {
            decrementPaginatorThenGetList(CurrentPageValue, useCase);
          }}
          disabled={decrementButtonDisabled()}
        />
      </div>
      <div className="form-group" style={{ display: "inline-grid" }}>
        <Field
          style={{ maxWidth: 60, maxHeight: 34 }}
          className="form-control"
          component="input"
          name="currentPage"
          type="number"
          min={1}
          max={maxPagesQtd}
          onInput={e => {
            e.target.value = `${e.target.value}`.replace(/[^0-9]/g, "");

            if (
              Number.isNaN(e.target.value) ||
              e.target.value === null ||
              e.target.value <= 0 ||
              e.target.value === ""
            ) {
              e.target.value = 1;
            }

            if (useCase === "LISTAR_OT" || useCase === "CONSULTAR_OT" || useCase === "LISTAR_OT_CANCELAMENTO") {
              if (e.target.value > ot.maxPagesQtd) {
                e.target.value = ot.maxPagesQtd;
              }
            } else if (useCase === "LISTAR_LL") {
              if (e.target.value > listarLL.maxPagesQtd) {
                e.target.value = listarLL.maxPagesQtd;
              }
            } else if (useCase === "LISTAR_USUARIOS") {
              if (e.target.value > cadastroUsuariosReducer.maxPagesQtd) {
                e.target.value = cadastroUsuariosReducer.maxPagesQtd;
              }
            } else if (useCase === "LISTA_CONTRATO") {
              if (e.target.value > lpuContratosReducer.maxPagesQtd) {
                e.target.value = lpuContratosReducer.maxPagesQtd;
              }
            } else if (useCase === "LISTAR_EVT") {
              if (e.target.value > evt.maxPagesQtd) {
                e.target.value = evt.maxPagesQtd;
              }
            }
          }}
          onBlur={() => {
            handlePageBlur(CurrentPageValue?.values.currentPage, useCase);
          }}
        />
      </div>
      <div className="form-group" style={{ display: "inline-grid" }}>
        <IconButton
          style={{
            margin: 0,
            padding: "6px 0px",
            maxWidth: 20,
            display: "flex",
            justifyContent: "space-between",
            boxSizing: "content-box"
          }}
          className="col-xs-1 col-sm-1"
          icon="angle-double-right"
          disabled={incrementButtonDisabled()}
          onClick={() => {
            incrementPaginatorThenGetList(CurrentPageValue, useCase);
          }}
        />
      </div>
      <div className="form-group" style={{ display: "inline-grid" }}>
        <p>total: {maxPagesQtd}</p>
      </div>
    </form>
  );
}

const PaginatorForm = reduxForm({
  form: "ChangePaginator",
  enableReinitialize: true
})(Paginator);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEvtList,
      change_evt_paginator,
      getOtList,
      getCancelamentoOtList,
      getOtConsultList,
      getContratoList,
      get_ll_list,
      change_ot_paginator,
      change_ll_paginator,
      change_listContrato_paginator,
      get_ots,
      change_higieProjetos_paginator,
      searchUser,
      getSnoaHigieneCritics,
      getCriticasHigienizacao,
      change_users_paginator,
      updateField: (field, data) => {
        return dispatch(change("ChangePaginator", field, data));
      }
    },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
  filterContrato: get(state.form.FiltroContratos, "values", {}),
  CurrentPageValue: state.form.ChangePaginator,
  ot: state.ot,
  evt: state.evt,
  listContratoPaginator: state.lpuContratosReducer.paginator,
  listarOtHigienizarProj: state.listarOtHigienizar,
  lpuContratosReducer: state.lpuContratosReducer,
  listarLL: state.listarLL,
  cadastroUsuariosReducer: state.cadastroUsuariosReducer,
  sincronizarBdConfigReducer: state.sincronizarBdConfigReducer,
  usuariosForm: get(state.form.UsuariosForm, "values", null),
  initialValues: { currentPage: 1 },
  enableReinitialize: true
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PaginatorForm)
);
