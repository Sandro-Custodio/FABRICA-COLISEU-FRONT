import React from "react";
import { IconButton } from "common";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import get from "lodash/get";
import { bindActionCreators } from "redux";

import { updateCircuit, firstPage } from "../../licceuActions";

const SaveCircuit = ({
  name,
  handleClose,
  links,
  circuit_initial,
  circuit_values,
  user_id,
  row,
  refresh,
  setLoading,
  handleSaveAction
}) => {
  const handleSave = () => {
    toastr.confirm(`Deseja Editar o Circuito "${name}"?`, {
      onOk: () => {
        setLoading(true);
        handleSaveAction({
          links,
          circuit_initial,
          circuit_values,
          user_id,
          row
        })
          .then(() => {
            toastr.success("Sucesso", "Circuito editado com sucessso");
            refresh();
          })
          .catch(err => {
            toastr.error("Erro", "Erro ao atualizar circuito");
            console.error(err);
          })
          .finally(() => {
            setLoading(false);
            handleClose();
          });
      }
    });
  };

  return (
    <IconButton icon="save" className="btn-primary" onClick={handleSave}>
      Salvar
    </IconButton>
  );
};

SaveCircuit.defaultProps = {
  name: "",
  handleClose: () => {}
};

const mapSaveCircuitState = state => ({
  links: get(state, "licceuEditarCircuito.tableRows", []),
  circuit_initial: get(state, "form.licceuEditarCircuito.initial", {}),
  circuit_values: get(state, "form.licceuEditarCircuito.values", {}),
  user_id: get(state, "auth.user.id")
});
const mapSaveACircuitAction = dispatch =>
  bindActionCreators(
    { handleSaveAction: updateCircuit, refresh: firstPage },
    dispatch
  );

export default connect(
  mapSaveCircuitState,
  mapSaveACircuitAction
)(SaveCircuit);
