import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { bindActionCreators } from "redux";
import { toastr } from "react-redux-toastr";

import { IconButton, Modal } from "common";
import { inactivate } from "../actions";

const InactivateProject = ({ row, inactivate, filter }) => {
  const [open, setOpen] = React.useState(false);
  const [ctrlRadio, setCtrlRadio] = React.useState("subproject");

  if (!row) return null;
  return (
    <>
      <IconButton
        title="Inativar Projeto"
        icon="power-off"
        onClick={() => setOpen(true)}
      />
      {open && (
        <Modal
          open
          title="Inativar Projeto"
          onClose={() => setOpen(false)}
          footer={
            <button
              onClick={() =>
                toastr.confirm(
                  `Você realmente deseja inativar ${
                    ctrlRadio === "project"
                      ? `todos os subprojetos que estão contidos no projeto "${row.project_name}"?`
                      : `o subprojeto "${row.sub_project_name}"?`
                  }`,
                  {
                    onOk: () => {
                      inactivate({
                        id: row.id,
                        filter,
                        parent_id: ctrlRadio === "project" && row.project_id
                      });
                      setOpen(false);
                    }
                  }
                )
              }
              type="button"
              className="btn btn-primary"
            >
              Inativar
            </button>
          }
        >
          <div className="radio">
            <label>
              <input
                type="radio"
                name="inactivate"
                checked={ctrlRadio === "subproject"}
                onChange={() => setCtrlRadio("subproject")}
              />
              Inativar o subprojeto <b>{`"${row.sub_project_name}"`}</b>
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="inactivate"
                value="option2"
                checked={ctrlRadio === "project"}
                onChange={() => setCtrlRadio("project")}
              />
              Inativar <b>todos</b> os subprojetos que estão contidos no projeto{" "}
              <b>{`"${row.project_name}"`}</b>
            </label>
          </div>
        </Modal>
      )}
    </>
  );
};

InactivateProject.defaultProps = {
  name: ""
};

const mapActionsInactivate = dispatch =>
  bindActionCreators({ inactivate }, dispatch);

const mapSateInactivate = state => ({
  row: get(state, "higienizarProjetos.row_selected"),
  filter: get(state, "form.higienizarFilter.values")
});

export default connect(
  mapSateInactivate,
  mapActionsInactivate
)(InactivateProject);
