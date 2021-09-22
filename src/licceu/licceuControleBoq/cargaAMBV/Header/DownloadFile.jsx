import React from "react";
import { connect } from "react-redux";

import { IconButton } from "common";

const DownloadFile = ({ rows }) => {
  if (!rows.length) return null;
  const baseUrl = `${process.env.REACT_APP_API_URL_JAVA}/geracao-po/download`;
  const handleDownload = () => {
    if (rows.length === 1)
      window.open(`${baseUrl}/${rows[0].codigo}/${rows[0].nomeArquivo}`);
    else if (rows.length > 1)
      window.open(
        `${baseUrl}/${rows.reduce(
          (init, cur, idx) => `${init}${idx > 0 ? "," : ""}${cur.codigo}`,
          ""
        )}/Planos_Gerados.zip`
      );
  };

  return (
    <IconButton
      icon="download"
      title="Download dos Arquivo Selecionados"
      onClick={handleDownload}
    />
  );
};

DownloadFile.defaultProps = {
  rows: []
};

export default connect(state => ({
  rows: state.licceuGeracaoPLO.rows_selected
}))(DownloadFile);
