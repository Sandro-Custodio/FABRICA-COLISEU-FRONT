import React from "react";

import { Dropzone, IconButton } from "common";
import { uploadFileMascaraBoq } from "../actions";

const UploadFile = ({ loadTabela }) => {
  const [arquivo, setArquivo] = React.useState({});

  const handleDrop = arquivo => {
    if (arquivo.length) {
      setArquivo(arquivo[0]);
    }
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("arquivo", arquivo);
    await uploadFileMascaraBoq(form);
    loadTabela(false);
  };

  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />

      <IconButton
        icon="upload"
        typeTooltip="success"
        className="btn btn-primary"
        iconProps={{ style: { fontSize: "16px", marginRight: "5px" } }}
        onClick={() => {
          loadTabela(true);
          handleSubmit();
        }}
      >
        Upload
      </IconButton>
    </>
  );
};

export default UploadFile;
