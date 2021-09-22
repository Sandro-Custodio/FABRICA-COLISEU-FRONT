import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";

import { delete_roles_items } from "../actions";

const CancelarRegra = ({
  rule_id,
  auth,
  delete_roles_items,
  handleFilter,
  ...others
}) => {
  return (
    <div className="overlay-wrapper" width="device-width">
      <Grid style={{ padding: "1vw" }}>
        <Row>
          <label>
            A regra de classificação será apagada, deseja continuar?
          </label>
        </Row>
        <Row>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              delete_roles_items(rule_id, auth.user.id);
              window.$("#cancelar_regra_classificacao").modal("hide");
              setTimeout(() => {
                handleFilter();
              }, 1000);
            }}
          >
            Sim
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() =>
              window.$("#cancelar_regra_classificacao").modal("hide")
            }
          >
            Não
          </button>
        </Row>
      </Grid>
      <Overlay />
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      delete_roles_items
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    regrasClassificacaoReducer: state.regrasClassificacaoReducer,
    auth: state.auth
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CancelarRegra);
