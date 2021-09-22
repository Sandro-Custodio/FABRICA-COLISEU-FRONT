import React from "react";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import moment from "moment";
import toBinary from "common/utils";
import { IconButton } from "common";
import Upload from "./Upload";
import Info from "./Info";

const ToolBarAnexar = ({
  setUploadAnexar,
  setLoading,
  setSelected,
  setRowOperacao,
  setChecked,
  checked,
  uploadAnexar,
  user_id,
  rowOperacao,
  selected,
  label
}) => {
  const uploadFile = files => {
    console.log(files);

    setLoading(true);
    return Promise.all(
      files.map(file => {
        const form = new FormData();
        form.append("Filedata", file);
        form.append("new_file_name", file.name);
        form.append("folder_name", "ll_evidences");
        return axios
          .post("/flex_upload/attachment", form)
          .then(res => {
            console.log(res.data[0]);
            // toastr.success("Upload realizado com sucesso");
          })
          .catch(() => {
            toastr.error("Erro", "Erro ao realizar upload");
          })
          .finally(() => setLoading(false));
      })
    );
  };

  const updateBase = () => {
    const data = {
      lista: rowOperacao,
      index: selected,
      label,
      user: { id: user_id },
      list_files: uploadAnexar
      // ,ll_id: 202730
    };

    setLoading(true);
    return axios

      .post("/ot_leasedline_cleanner/update_values_audit", data)
      .then(() => {
        toastr.success("Base atualizada com sucesso.");
      })
      .catch(() => {
        toastr.error("Erro", "Erro na atualizaçãoda base.");
      })
      .finally(() => {
        setLoading(false);
        setChecked(false);
        setSelected("");
        setRowOperacao([]);
        setUploadAnexar([]);
      });
  };

  if (checked) {
    return (
      <div style={styles}>
        <Upload
          multiple
          onDrop={acceptedFiles => {
            const data = acceptedFiles.map(item => ({
              data: moment(item.lastModifiedDate).format("DD/MM/YYYY"),
              name: item.name,
              size: toBinary(item.size)
            }));
            uploadFile(acceptedFiles).then(() => {
              setUploadAnexar(data);
            });
          }}
        />
        {uploadAnexar.length > 0 && checked && (
          <IconButton className="btn-primary" onClick={updateBase}>
            Atualizar Base
          </IconButton>
        )}
      </div>
    );
  }
  return (
    <Info info="Para prosseguir, a Operação de Higienização deve estar de acordo." />
  );
};

const styles = {
  display: "flex",
  justifyContent: "space-between",
  flex: 1
};

const mapStateToProps = ({ auth }) => ({ user_id: auth.user.id });

export default connect(mapStateToProps)(ToolBarAnexar);
