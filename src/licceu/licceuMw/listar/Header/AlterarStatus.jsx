import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { IconButton, Modal } from "common";
import { changeStatus } from "../actions";
import status from "../status.json";

const AlterarStatus = ({ size, changeStatus }) => {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  if (size <= 1) return null;
  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        title="Alteração Múltipla de Status"
        icon="retweet"
        color="#00a65a"
        className="filtro-btn"
        style={{ padding: 10 }}
      />
      {open && (
        <Modal
          open
          title="Alteração Múltipla de Status"
          onClose={() => setOpen(false)}
          footer={
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                changeStatus(value);
                setOpen(false);
              }}
            >
              Salvar
            </button>
          }
        >
          <div className="form-group">
            <label htmlFor="status_change">Status</label>
            <select
              id="status_change"
              value={value}
              className="form-control"
              onChange={evt => setValue(evt.target.value)}
            >
              <option value="">Selecione</option>
              {status.map(s => (
                <option value={s.value} key={s.value}>
                  {s.text}
                </option>
              ))}
            </select>
          </div>
        </Modal>
      )}
    </>
  );
};

AlterarStatus.defaultProps = {
  rows: []
};

const mapDispacthToProps = dispatch =>
  bindActionCreators({ changeStatus }, dispatch);

export default connect(
  state => ({ size: state.listarMW.selection.length }),
  mapDispacthToProps
)(AlterarStatus);
