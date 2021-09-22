import React, { useState } from "react";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { IconButton, Modal } from "common";
import "./styles.css";
import { bindActionCreators } from "redux";
import ReadODS from "./ReadODS";
import UpdateODS from "./UpdateODS";
import FilterODS from "./FilterODS";
import TableProvCirc from "./TableProvCirc";
import { updateOd } from "./actions";
import getOdsList from "../action";
import { destroyForm } from "../action";
import FastForm from "./FastForm";
import { isPermited } from "../../../auth/actions";

const ToolBarOd = ({
  describe,
  describe: { code },
  getOdsList,
  destroyForm,
  size,
  user
}) => {
  const [open, handleOpen] = useState(false);
  const [openEdit, handleEditOpen] = useState(false);
  const [openFilter, handleFilterOpen] = useState(false);
  const [loadingEdit, handleLoadingEdit] = useState(false);
  const [change, setChange] = useState({});

  const handleChange = event => {
    event.persist();
    setChange(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const handleFilter = () => {
    getOdsList(1);
    handleFilterOpen(false);
    destroyForm("filterODS.values");
  };

  const handleSubmit = async () => {
    try {
      handleLoadingEdit(true);
      await updateOd({ ...change, od_id: describe.id });
      getOdsList(1);
      handleEditOpen(false);
      toastr.success("Sucesso", "ODS Atualizada!");
    } catch (error) {
      toastr.error("Erro", "Erro ao buscar dados");
    } finally {
      handleLoadingEdit(false);
    }
  };

  const setOpen = state => {
    handleOpen(state);
    if (state) {
      window
        .$("html, body, #app, .wrapper, .main, .content-wrapper")
        .addClass("yh");
    } else {
      window
        .$("html, body, #app, .wrapper, .main, .content-wrapper")
        .removeClass("yh");
    }
  };

  const setEditOpen = state => {
    handleEditOpen(state);
    if (state) {
      window
        .$("html, body, #app, .wrapper, .main, .content-wrapper")
        .addClass("yh");
    } else {
      window
        .$("html, body, #app, .wrapper, .main, .content-wrapper")
        .removeClass("yh");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <IconButton
            title="Filtrar"
            icon="search"
            onClick={() => handleFilterOpen(true)}
          />
          <FastForm onSubmit={() => getOdsList(1)} />
        </div>
        {size === 1 && (
          <>
            {isPermited(user.permissions, "DR_COD1A1") && (
              <IconButton
                title="Visualizar OD"
                icon="eye"
                onClick={() => setOpen(true)}
              />
            )}
            {isPermited(user.permissions, "DR_COD1B1A1") && (
              <IconButton
                title="Editar OD"
                icon="pencil"
                onClick={() => setEditOpen(true)}
              />
            )}
          </>
        )}
      </div>
      <Modal
        open={openFilter}
        dimension="lg"
        title="Filtrar OD"
        onClose={() => handleFilterOpen(false)}
        height="65vh"
        footer={
          <>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                destroyForm("filterODS.values");
              }}
            >
              <i className="fa fa-bitbucket" /> Limpar
            </button>
            <button
              type="button"
              onClick={handleFilter}
              className="btn btn-primary"
            >
              <i className="fa fa-search" /> Filtrar
            </button>
          </>
        }
      >
        <FilterODS describe={describe} />
      </Modal>

      {open && (
        <Modal
          open={open}
          dimension="lg full"
          title={`Visualização da ${code}`}
          onClose={() => setOpen(false)}
          className="modal-full"
        >
          <ReadODS describe={describe} />
          <TableProvCirc viewOnly={true} describe={describe} />
        </Modal>
      )}
      {openEdit && (
        <Modal
          open={openEdit}
          dimension="lg full"
          title={`Edição da ${code}`}
          onClose={() => setEditOpen(false)}
          loading={loadingEdit}
          footer={
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Salvar
            </button>
          }
        >
          <UpdateODS describe={describe} handleChange={handleChange} />
          <TableProvCirc describe={describe} />
        </Modal>
      )}
    </>
  );
};

ToolBarOd.defaultProps = {
  describe: {}
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOdsList,
      destroyForm
    },
    dispatch
  );

export default connect(
  state => ({
    loading_filter: state.listarODS.filter_loading,
    user: state.auth.user
  }),
  mapDispatchToProps
)(ToolBarOd);
