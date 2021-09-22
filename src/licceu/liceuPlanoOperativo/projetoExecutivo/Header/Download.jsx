import React from "react";

import { connect } from "react-redux";

import { IconButton } from "common";

const DownloadFile = ({ ids }) => {
  if (!ids.length) return null;
  const baseUrl = `${process.env.REACT_APP_API_URL_JAVA}/vendor/download`;
  const handleDownload = () => {
    window.open(`${baseUrl}/${ids.join(",")}`, "_blank");
  };

  return (
    <IconButton
      icon="download"
      title="Download dos Arquivo Selecionados"
      className="btn btn-primary"
      onClick={handleDownload}
    >
      Download
    </IconButton>
  );
};

DownloadFile.defaultProps = {
  ids: []
};

export default connect(state => ({
  ids: state.licceuProjetoExecutivoListar.rows_selected.map(
    ({ codigo }) => codigo
  )
}))(DownloadFile);
