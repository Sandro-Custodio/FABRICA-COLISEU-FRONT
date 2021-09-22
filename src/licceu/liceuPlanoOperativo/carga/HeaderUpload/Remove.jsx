import React from "react";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";

import { IconButton } from "common";

const Remove = ({ dispatch, size }) => {
  if (!size) return null;
  const handleRemove = () => {
    toastr.confirm("Você realmente deseja remover os arquivos selecionados?", {
      onOk: () => dispatch({ type: "REMOVE_CARGA_PLO_ROWSUPLOAD" })
    });
  };

  return (
    <IconButton
      onClick={handleRemove}
      icon="trash"
      title="Remover os Arquivos Selecionados"
      color="#dd4b39"
    />
  );
};

export default connect(state => ({
  size: state.licceuCargaPLO.rows_selected_upload.length
}))(Remove);
