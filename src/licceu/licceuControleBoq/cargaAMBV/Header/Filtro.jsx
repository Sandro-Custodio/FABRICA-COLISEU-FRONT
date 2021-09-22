import React from "react";
import { reduxForm, reset, Field } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IconButton, Modal } from "common";
import { getVendors, getBoqsWithFilter } from "../actions";

const mapActionsFiltro = dispatch =>
  bindActionCreators({ getVendors, getBoqsWithFilter, dispatch }, dispatch);

const mapStateFiltro = state => ({
  loading_filter: state.licceuControleBoq.loading_filter,
  vendorsFiltro: state.licceuControleBoq.vendorsFiltro,
  page: state.licceuControleBoq.page
});

const Filtro = connect(
  mapStateFiltro,
  mapActionsFiltro
)(
  ({
    dispatch,
    getVendors,
    getBoqsWithFilter,
    loading_filter,
    vendorsFiltro,
    page
  }) => {
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
      getVendors();
      // getBoqsWithFilter();
    }, []);

    return (
      <>
        <IconButton
          icon="search"
          title="Filtrar"
          onClick={() => setOpen(true)}
        />
        <Modal
          title="Filtrar Boqs"
          open={open}
          onClose={() => setOpen(false)}
          disableBtnClose
          loading={loading_filter}
          footer={
            <>
              <button
                type="submit"
                onClick={() => {
                  getBoqsWithFilter(1);
                  setOpen(false);
                }}
                className="btn btn-primary"
              >
                Filtrar
              </button>
              <button
                type="submit"
                onClick={() => dispatch(reset("filterFormAMBV"))}
                className="btn btn-danger"
              >
                Limpar
              </button>
            </>
          }
        >
          <div>
            <label htmlFor="vendor">Vendor:</label>
            <div>
              <Field
                className="form-control input-sm"
                name="vendor"
                component="select"
              >
                <option value="">Selecione</option>
                {vendorsFiltro.map(vendorOpt => (
                  <option value={vendorOpt} key={vendorOpt}>
                    {vendorOpt}
                  </option>
                ))}
              </Field>
            </div>
          </div>
          <div>
            <label htmlFor="contrato">Contrato:</label>
            <div>
              <Field
                className="form-control input-sm"
                name="contrato"
                component="input"
                type="text"
              />
            </div>
          </div>
          <div>
            <label htmlFor="itemContrato">Item Contrato:</label>
            <div>
              <Field
                className="form-control input-sm"
                name="itemContrato"
                component="input"
                type="text"
              />
            </div>
          </div>
          <div>
            <label htmlFor="sapCode">Sap Code:</label>
            <div>
              <Field
                className="form-control input-sm"
                name="sapCode"
                component="input"
                type="text"
              />
            </div>
          </div>
          <div>
            <label htmlFor="descricao">Descrição:</label>
            <div>
              <Field
                className="form-control input-sm"
                name="descricao"
                component="input"
                type="text"
              />
            </div>
          </div>
        </Modal>
      </>
    );
  }
);

Filtro.defaultProps = {
  vendorsFiltro: []
};

export default reduxForm({
  form: "filterFormAMBV"
})(Filtro);
