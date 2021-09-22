import React from "react";
import { IconButton } from "common";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";

const Download = ({ rows }) => {
  if (!rows.length) return null;
  const confirmDownload = () => {
    toastr.confirm("Você realmente deseja baixar os arquivos selecionados?", {
      onOk: handleDownload
    });
  };

  const handleDownload = () => {
    const baseUrl = `${process.env.REACT_APP_API_URL_JAVA}/carga/download`;
    if (rows.length === 1)
      window.open(`${baseUrl}/${rows[0].codigo}/${rows[0].name}`);
    else if (rows.length > 1)
      window.open(
        `${baseUrl}/${rows.reduce(
          (init, cur, idx) => `${init}${idx > 0 ? "," : ""}${cur.codigo}`,
          ""
        )}/Downloads.zip`
      );
  };

  // http://localhost:8091/carga/download/548,528,468,448/2017_Acesso%20Geral%20de%20Sites.zip
  // http://localhost:8091/carga/download/548/TNE-BNE-2017-PLO%20Backhauling-2017-B00-00062.0.xlsx

  return (
    <IconButton
      onClick={confirmDownload}
      icon="download"
      title="Download dos Arquivos Selecionados"
    />
  );
};

export default connect(state => ({
  rows: state.licceuCargaPLO.rows_selected
}))(Download);
