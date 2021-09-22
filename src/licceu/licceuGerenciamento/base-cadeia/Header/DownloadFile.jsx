import React from "react";
import { connect } from "react-redux";

import { IconButton } from "common";

const baseUrl = process.env.REACT_APP_API_URL_JAVA;

const DownloadModel = ({ rows_selected }) => {
  if (!rows_selected.length) return null;
  const handleDownload = () => {
    if (rows_selected.length === 1)
      window.open(
        `${baseUrl}/base-cadeia/download/${rows_selected[0].codigo}/${rows_selected[0].nomeArquivo}`,
        "_blank"
      );
    else
      window.open(
        `${baseUrl}/base-cadeia/download/${rows_selected
          .map(el => el.codigo)
          .join(",")}/Base_Cadeia.zip`,
        "_blank"
      );
  };
  return (
    <IconButton
      icon="download"
      title="Download do Arquivo"
      onClick={handleDownload}
    />
  );
};

const mapStateTable = state => ({
  rows_selected: state.licceuGerenciamento.rows_selected
});

export default connect(mapStateTable)(DownloadModel);
