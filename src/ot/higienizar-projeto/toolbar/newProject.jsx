import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import get from "lodash/get";
import uniqBy from "lodash/uniqBy";
import { bindActionCreators } from "redux";

import { IconButton, Modal } from "common";
import { newProject } from "../actions";

const NovoProjeto = ({
  input: {
    value: { text },
    onChange
  },
  handleChange
}) => {
  React.useEffect(() => {
    onChange({ isNew: true, text: "" });
  }, []);
  return (
    <>
      <input
        className="form-control input-sm"
        value={text}
        onChange={evt => onChange({ text: evt.target.value, isNew: true })}
        type="text"
        placeholder="Nome  do novo Projeto"
      />
      <IconButton
        style={{ paddingTop: 0 }}
        icon="minus-circle"
        title="Projeto Existente"
        color="#dd4b39"
        onClick={() => {
          onChange("");
          handleChange();
        }}
      />
    </>
  );
};

const ProjetoExistente = connect(state => ({
  list: uniqBy(
    get(state, "higienizarProjetos.aux_rows", []),
    "project_id"
  ).map(el => ({ value: el.project_id, text: el.project_name, ano: el.ano })),
  row: get(state, "higienizarProjetos.row_selected") || {}
}))(
  ({
    input: {
      value: { text },
      onChange
    },
    list,
    row,
    handleChange
  }) => {
    React.useEffect(() => {
      if (row.project_name) onChange({ isNew: false, text: row.project_id });
      else onChange({ text: "", isNew: false });
    }, []);
    return (
      <>
        <select
          className="form-control input-sm"
          value={text}
          onChange={evt => onChange({ isNew: false, text: evt.target.value })}
        >
          {row.project_name ? (
            <option hidden value={row.project_name}>
              {row.project_name}
            </option>
          ) : (
            <option hidden value="">
              Selecione um projeto existente
            </option>
          )}
          {list.map(item => (
            <option key={item.value} value={item.value}>
              {`${item.text} [${item.ano}]`}
            </option>
          ))}
        </select>
        <IconButton
          style={{ paddingTop: 0 }}
          icon="plus"
          title="Novo Projeto"
          onClick={() => {
            onChange("");
            handleChange();
          }}
        />
      </>
    );
  }
);

const ProjectInput = props => {
  const [novoProjeto, setNovoProjeto] = React.useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ flex: 1 }}>
        <label htmlFor="nome">Nome do projeto: </label>
        <div style={{ display: "flex" }}>
          {novoProjeto ? (
            <NovoProjeto
              handleChange={() => setNovoProjeto(false)}
              {...props}
            />
          ) : (
            <ProjetoExistente
              handleChange={() => setNovoProjeto(true)}
              {...props}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const FormProject = ({ formData }) => {
  return (
    <form>
      <Field
        component={ProjectInput}
        type="text"
        name="project"
        id="nome"
        className="form-control input-sm"
      />
      <div>
        <label htmlFor="ano">
          Ano:{" "}
          {formData?.project?.isNew === true
            ? "(Projeto e Subprojeto)"
            : "(Subprojeto)"}
        </label>
        <Field
          component="input"
          type="number"
          name="ano"
          id="ano"
          className="form-control input-sm"
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: 15 }}>
          <label htmlFor="sub_project_name">Subprojeto: </label>
          <Field
            component="input"
            type="text"
            name="sub_project_name"
            id="sub_project_name"
            className="form-control input-sm"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="classificacao_nfe">Classificação TSD: </label>
          <Field
            component="input"
            type="text"
            name="classificacao_nfe"
            id="classificacao_nfe"
            className="form-control input-sm"
          />
        </div>
      </div>
    </form>
  );
};

const FormNewProject = reduxForm({ form: "higienizarNovoProjeto" })(
  FormProject
);

const formIsValid = ({ formData, row }) => {
  return (
    JSON.stringify(row) !== JSON.stringify(formData) &&
    formData.project &&
    formData.project.text &&
    formData.ano &&
    formData.sub_project_name
  );
};

const NewProject = ({ row, formData, filter, newProject }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        title="Cadastrar"
        icon="plus-circle"
      />
      {open && (
        <Modal
          open
          onClose={() => setOpen(false)}
          title="Cadastrar"
          height="70vh"
          maxHeight="210px"
          footer={
            <button
              type="button"
              className="btn btn-primary"
              disabled={!formIsValid({ formData, row })}
              onClick={() => {
                newProject({ formData, filter });
                setOpen(false);
              }}
            >
              Criar
            </button>
          }
        >
          <FormNewProject initialValues={row} formData={formData} />
        </Modal>
      )}
    </>
  );
};

const mapStateNewProject = state => ({
  formData: get(state, "form.higienizarNovoProjeto.values", {}),
  row: get(state, "higienizarProjetos.row_selected"),
  filter: get(state, "form.higienizarFilter.values")
});

const mapActionNewProject = dispatch =>
  bindActionCreators({ newProject }, dispatch);

export default connect(mapStateNewProject, mapActionNewProject)(NewProject);
