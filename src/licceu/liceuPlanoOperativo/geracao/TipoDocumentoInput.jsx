/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { IconButton } from "common";
import {
  listDocuments,
  addTipoDocumento,
  removeTipoDocumento
} from "./actions";

const TipoDocumentoInput = ({
  input,
  list,
  listDocuments,
  disableTodos,
  addTipoDocumento,
  removeTipoDocumento
}) => {
  const [creating, setCreating] = React.useState(false);
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    if (!list.length) listDocuments();
  }, []);

  const handleRemove = () => {
    toastr.confirm(`Deseja REMOVER a opção "${input.value}"?`, {
      onOk: () => removeTipoDocumento(input.value)
    });
  };

  const handleCreate = () => {
    toastr.confirm(`Deseja CRIAR a opção "${text}"?`, {
      onOk: () => {
        addTipoDocumento(text);
        setText("");
        setCreating(false);
      }
    });
  };

  return (
    <>
      <label htmlFor="tipo_documento">Tipo de Documento:</label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: 0,
          marginBottom: 10
        }}
      >
        {creating ? (
          <input
            onChange={evt => setText(evt.target.value)}
            style={{ margin: 0 }}
            type="text"
            autoFocus
            value={text}
            id="tipo_documento"
          />
        ) : (
          <select
            style={{ margin: 0 }}
            {...input}
            className="form-control input-sm"
            id="tipo_documento"
          >
            {disableTodos ? (
              <option hidden value="">
                Selecione
              </option>
            ) : (
              <option value="TODOS">TODOS</option>
            )}
            {list.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}
        <div style={{ display: "flex" }}>
          {creating ? (
            <>
              <IconButton
                style={{ margin: "0 10px", padding: 0 }}
                color="#5cb85c"
                icon="check-circle"
                title="Adicionar"
                onClick={handleCreate}
              />
              <IconButton
                id="cancelar"
                style={{ margin: 0, padding: 0 }}
                color="#d9534f"
                icon="times-circle"
                title="Cancelar"
                onClick={() => setCreating(false)}
              />
            </>
          ) : (
            <>
              <IconButton
                style={{ margin: "0 10px", padding: 0 }}
                color="#5cb85c"
                icon="plus-circle"
                onClick={() => setCreating(true)}
                title="Novo"
              />
              <IconButton
                style={{ margin: 0, padding: 0 }}
                color="#d9534f"
                icon="trash"
                title="Deletar"
                onClick={handleRemove}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

TipoDocumentoInput.defaultProps = {
  input: {},
  setLoading: () => {}
};

const mapActionsFiltro = dispatch =>
  bindActionCreators(
    { listDocuments, addTipoDocumento, removeTipoDocumento },
    dispatch
  );

const mapStateFiltro = state => ({ list: state.licceuGeracaoPLO.tipo_doc });

export default connect(
  mapStateFiltro,
  mapActionsFiltro
)(TipoDocumentoInput);
