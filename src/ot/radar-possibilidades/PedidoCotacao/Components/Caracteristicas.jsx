import React from "react";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import { connect } from "react-redux";
import { Card } from "common";
import { Input } from "common/input";
import { toastr } from "react-redux-toastr";
import get from "lodash/get";
import { element_a, element_b, descrition } from "./mock.json";
import Upload from "./Upload";

const uploadFile = files => {
  return Promise.all(
    files.map(file => {
      const form = new FormData();
      form.append("Filedata", file);
      form.append("new_file_name", file.name);
      form.append("folder_name", "pedido_cotacao");
      return axios
        .post("/flex_upload/attachment", form)
        .then(res => {
          toastr.success("Anexo", "Upload realizado com sucesso!");
          console.log(res.data[0]);
        })
        .catch(() => {
          toastr.error("Erro", "Erro ao realizar upload");
        });
    })
  );
};

const Caracteristicas = ({
  response,
  response: { ot_element_a, ot_element_b, ot_speed }
}) => {
  if (!response) {
    return null;
  }

  return (
    <Card title="Descrição" color="default">
      <div className="col-md-4">
        {descrition.map(item =>
          item.isField ? (
            <Field
              component={Input}
              readOnly
              {...item}
              placeholder={get(ot_speed, item.placeholder, "")}
            />
          ) : (
            <div className="form-group" id="pedido-cotacao">
              <label htmlFor="anexar arquivo">Anexar um Arquivo</label>
              <Upload multiple onDrop={uploadFile} label="Upload" />
            </div>
          )
        )}
      </div>
      <div className="col-md-4">
        {element_a.map(el => (
          <Field
            component={Input}
            readOnly
            {...el}
            placeholder={get(ot_element_a, el.placeholder, "[N/A]")}
          />
        ))}
      </div>
      <div className="col-md-4">
        {element_b.map(el => (
          <Field
            component={Input}
            readOnly
            {...el}
            placeholder={get(ot_element_b, el.placeholder, "[N/A]")}
          />
        ))}
      </div>
    </Card>
  );
};

const formWrapper = reduxForm({
  form: "PedidoCotacaoCaracteristicas"
})(Caracteristicas);

const mapStateToProps = ({ radarPossibilidades }) => ({
  response: get(radarPossibilidades, "response") || {}
});

export default connect(mapStateToProps)(formWrapper);
