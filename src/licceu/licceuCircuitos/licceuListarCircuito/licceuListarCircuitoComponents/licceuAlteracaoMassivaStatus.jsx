import React from "react";
import { connect } from "react-redux";
import { IconButton, Modal } from "common";
import get from "lodash/get";
import { bindActionCreators } from "redux";
import { filter } from "../api.json";

import { postAlteracaoMassiva } from "../licceuActions";

const AlterarStatus = ({ rows, user, handleSubmit }) => {
  const [status, setStatus] = React.useState("");
  const [open, setOpen] = React.useState(false);

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
          disableBtnClose
          title="Alteração Múltipla de Status"
          onClose={() => setOpen(false)}
          footer={
            <button
              type="button"
              onClick={() => {
                handleSubmit({
                  user,
                  status,
                  rows: rows.map(({ id }) => ({ id }))
                });
                setOpen(false);
              }}
              className="btn btn-primary"
            >
              Salvar
            </button>
          }
        >
          <div className="form-group">
            <label htmlFor="status_change">Status</label>
            <select
              id="status_change"
              value={status}
              className="form-control"
              onChange={evt => setStatus(evt.target.value)}
            >
              <option value="">Selecione</option>
              {filter.status.map(todo => (
                <option value={todo.short_name} key={todo.id}>
                  {todo.value}
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
  bindActionCreators({ handleSubmit: postAlteracaoMassiva }, dispatch);

export default connect(
  state => ({ user: get(state, "auth.user.id") }),
  mapDispacthToProps
)(AlterarStatus);
