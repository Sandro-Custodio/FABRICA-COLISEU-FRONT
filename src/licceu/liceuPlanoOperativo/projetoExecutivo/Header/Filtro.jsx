import React from "react";
import { reduxForm, reset, Field } from "redux-form";
import { connect } from "react-redux";
import get from "lodash/get";
import { bindActionCreators } from "redux";

import { IconButton, Modal, DropdownList } from "common";
import { getYears } from "../../comps";
import tipoDocs from "./tipoDocs.json";
import { filterLoad, listTable } from "../actions";

const SelectComp = ({
  label,
  data,
  input,
  id,
  textKey,
  valKey,
  className,
  notEmpty,
  ...others
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="fade-in fade-out">
          {label}
        </label>
      )}
      <select
        className={`${className} fade-in fade-out`}
        id={id}
        {...input}
        {...others}
      >
        {!notEmpty && <option>Selecione</option>}
        {data.map((el, idx) => (
          <option key={idx} value={el[valKey]}>
            {el[textKey]}
          </option>
        ))}
      </select>
    </>
  );
};

SelectComp.defaultProps = {
  data: [],
  textKey: "text",
  valKey: "value",
  className: ""
};

const Checkbox = ({ label, input, id }) => {
  return (
    <div>
      <input id={id} type="checkbox" style={{ marginRight: 10 }} {...input} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

const DropDownListComp = ({ label, id, textKey, valKey, ...others }) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <DropdownList id={id} {...others} style={{ padding: 0 }} />
    </div>
  );
};

const mapStateFilter = state => ({
  form: get(state, "form.filterProjetoExecutivo.values", {}),
  anos: getYears().map(val => ({ value: val, text: val })),
  ots: state.licceuProjetoExecutivoListar.ots,
  sites: state.licceuProjetoExecutivoListar.sites,
  loading: state.licceuProjetoExecutivoListar.loading_filter
});

const mapActionsFilter = dispatch =>
  bindActionCreators({ filterLoad, listTable, dispatch }, dispatch);

const Filtro = connect(
  mapStateFilter,
  mapActionsFilter
)(({ dispatch, loading, ots, sites, anos, form, filterLoad, listTable }) => {
  const [open, setOpen] = React.useState(false);
  React.useState(() => {
    filterLoad();
  }, []);

  return (
    <>
      <IconButton icon="search" title="Filtrar" onClick={() => setOpen(true)} />
      <Modal
        title="Filtrar"
        open={open}
        onClose={() => setOpen(false)}
        disableBtnClose
        loading={loading}
        height={350}
        footer={
          <>
            <button
              type="submit"
              onClick={() => {
                listTable();
                setOpen(false);
              }}
              className="btn btn-primary"
            >
              Filtrar
            </button>
            <button
              type="submit"
              onClick={() => dispatch(reset("filterProjetoExecutivo"))}
              className="btn btn-danger"
            >
              Limpar
            </button>
          </>
        }
      >
        <form>
          <Field
            className="form-control input-sm"
            name="ano"
            component={SelectComp}
            label="Ano"
            id="ano"
            data={anos}
            notEmpty
          />
          <Field
            className="form-control input-sm"
            name="siteId"
            component={DropDownListComp}
            label="Site ID"
            id="siteId"
            data={sites}
            textField="text"
          />
          <Field
            className="form-control input-sm"
            name="chaveOt"
            component={DropDownListComp}
            label="Chave/OT"
            id="chaveot"
            data={ots}
            textField="text"
          />
          {(!!form.acesso || !!form.transporte) && (
            <Field
              className="form-control input-sm"
              name="tipoDoc"
              component={SelectComp}
              label="Tipo Documento"
              id="tipoDoc"
              data={[]
                .concat(form.acesso ? tipoDocs.acesso : [])
                .concat(form.transporte ? tipoDocs.transporte : [])}
            />
          )}
          <Field
            label="Acesso"
            id="acesso"
            name="acesso"
            component={Checkbox}
          />
          <Field
            label="Transporte"
            name="transporte"
            id="transport"
            component={Checkbox}
          />
        </form>
      </Modal>
    </>
  );
});

Filtro.defaultProps = {
  anos: [],
  siteId: [],
  chaveOt: [],
  tipoDocumento: []
};

export default reduxForm({
  form: "filterProjetoExecutivo",
  initialValues: { ano: "2019" }
})(Filtro);
