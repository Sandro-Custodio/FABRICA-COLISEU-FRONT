import React from 'react';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from "redux-form";
import { connect, useDispatch } from 'react-redux';
import { IconButton, ExportExcel, Dropzone } from "common";
import { get } from 'lodash';

import { upload_odsd_report, export_retencao_links, generate_base_od_sd } from './actions';

const ListHeader = ({ handleSearch, tableColumns, rows, filterOptions, upload_odsd_report, export_retencao_links, generate_base_od_sd, user_id, year }) => {
  const dispatch = useDispatch();
  const [optionsList, setOptionsList] = React.useState([]);
  React.useEffect(() => {
    setOptionsList(filterOptions.map((option) => <option value={option}>{option}</option>))
  }, [filterOptions])

  return (
    <>
      <div style={{ display: 'flex', alignContent: "space-between", marginBottom: "2em" }}>
        <form onSubmit={handleSearch}>
          <div className="input-group input-group-sm" style={{ height: "100%" }} >
            <Field
              style={{ height: "100%" }}
              className="form-control input-sm"
              name="filter"
              component="select"
              value="not-started"
            >
              <option value="not-started">Selecione</option>
              {optionsList}
            </Field>
            <span className="input-group-btn">
              <button
                style={{ height: "100%" }}
                type="submit"
                className="btn btn-primary btn-flat"
                data-toggle="tooltip"
                title="Busca Rápida"
              >
                <i className="fa fa-fast-forward" aria-hidden="true" />
              </button>
            </span>
          </div>
        </form>
        <IconButton
          style={{ padding: '1em' }}
          className="btn btn-primary"
          // icon="search"
          color="blue"
          onClick={() => generate_base_od_sd(user_id, year)}
        >
          Download Base SDs
        </IconButton>
        <IconButton
          style={{ padding: '1em' }}
          className="btn btn-primary"
          // icon="search"
          color="blue"
          onClick={() => export_retencao_links(user_id, year)}
        >
          Download Motivo Retenção
        </IconButton>
        <div style={{ position: 'absolute', right: '2em' }}>
          <Dropzone
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onDrop={(file) => upload_odsd_report(user_id, file)}
            label="Upload Motivo de Retenção"
          />
        </div>
        {/* <IconButton
          className="btn btn-primary"
          // icon="search"
          color="blue"
        >
          Upload Motivo de Retenção
        </IconButton> */}
      </div>
    </>
  )
}

const Form = reduxForm({ form: "sdEfficiencyFastForm" })(ListHeader);

const mapDispatchToProps = dispatch => bindActionCreators({
  upload_odsd_report,
  export_retencao_links,
  generate_base_od_sd
}, dispatch);

const mapStateToProps = state => ({
  tableColumns: state.sdEfficiency.tableColumns,
  filterOptions: state.sdEfficiency.yearFilterOptions,
  user_id: state.auth.user.id,
  year: get(state, `form.sdEfficiencyFastForm.values.filter`, "")
});

export default connect(mapStateToProps, mapDispatchToProps)(Form)

