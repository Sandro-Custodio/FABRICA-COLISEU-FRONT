/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { bindActionCreators } from "redux";
import get from "lodash/get";
import { connect, useDispatch, useSelector } from "react-redux";
import { reduxForm, Field, clearFields, change } from "redux-form";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import ContentHeader from "common/adminLTE/contentHeader";
import Content from "common/adminLTE/content";
import Table from "common/layout/simple-table";
import { toastr } from "react-redux-toastr";
import {
  DropdownListField,
  LabelField,
  DateTimePickerField
} from "common/form/components";
import ModalForm from "common/layout/modal";
import UploadFatura from "./upload-fatura";
import {
  get_operators_and_vendors,
  get_groups,
  import_files,
  delete_bill_dds,
  save_circuits_by_vendor,
  get_circuits_by_vendor
} from "./actions";
import BillsImport from "./BillsImport";
import NewCircuit from "./NewCircuit";

const ImportarFatura = props => {
  const {
    importarFaturaForm,
    importarFaturaReducer: { vendor_list, operators, groups, list, columns },
    get_operators_and_vendors,
    get_groups,
    import_files,
    delete_bill_dds,
    save_circuits_by_vendor,
    get_circuits_by_vendor,
    auth,
    newCircuit
  } = props;

  const [isBillsImportOpen, setIsBillsImportOpen] = React.useState(false);
  const network_list = ["MÓVEL", "FIXA", "FIBER"];
  const [fileName, setFileName] = React.useState("");
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const [dd_previo, set_dd_previo] = React.useState(false);
  const [forceReloadDateFields, setForceReloadDateFields] = React.useState(
    true
  );
  const [forceReloadDropzone, setForceReloadDropzone] = React.useState(true);
  const [dropzoneAccept, setDropzoneAccept] = React.useState(".csv");
  const [isInvoiceCostEnabled, setIsInvoiceCostEnabled] = React.useState(true);
  const [isOrderAtEnabled, setIsOrderAtEnabled] = React.useState(true);
  const [isDeadLineAtEnabled, setIsDeadLineAtEnabled] = React.useState(true);
  const [isGroupEnabled, setIsGroupEnabled] = React.useState(true);
  const [isUploadFileEnabled, setIsUploadFileEnabled] = React.useState(true);
  const [isOperatorEnabled, setIsOperatorEnabled] = React.useState(true);
  const [isddPrevio, setIsDdPrevioDisabled] = React.useState(false);
  const [isInvoiceNumberEnabled, setIsInvoiceNumberEnabled] = React.useState(
    true
  );
  const vendor = importarFaturaForm?.values?.vendor || null;
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch({ type: "BILL_DDS_REMOVED", payload: list });
    get_operators_and_vendors();
  }, []);

  React.useEffect(() => {
    if (
      importarFaturaForm &&
      importarFaturaForm.values &&
      importarFaturaForm.values.network &&
      importarFaturaForm.values.vendor &&
      importarFaturaForm.values.mes_ref &&
      fileName.length > 0
    ) {
      if (importarFaturaForm.values.checked_dd_previo) {
        setSubmitDisabled(false);
      } else if (
        importarFaturaForm.values.invoice_cost &&
        importarFaturaForm.values.invoice_number &&
        importarFaturaForm.values.order_at &&
        importarFaturaForm.values.deadline_at &&
        importarFaturaForm.values.regional &&
        importarFaturaForm.values.group
      ) {
        setSubmitDisabled(false);
      }
      else {
        setSubmitDisabled(true);
      }
    }
    else {
      vendor !== null &&
        (vendor.id === 15 ||
          vendor.id === 176 ||
          vendor.id === 157 ||
          vendor.id === 158 ||
          vendor.id === 159 ||
          vendor.id === 160 ||
          vendor.id === 161 ||
          vendor.id === 162 ||
          vendor.id === 163 ||
          vendor.id === 165 ||
          vendor.id === 167 ||
          vendor.id === 33 ||
          vendor.id === 32 ||
          vendor.id === 41 ||
          vendor.id === 27 ||
          vendor.id === 228 ||
          vendor.id === 42
        ) ? setSubmitDisabled(false)
        : setSubmitDisabled(true);
    }
  }, [importarFaturaForm, fileName]);

  React.useEffect(() => {
    if (!importarFaturaForm) {
      return;
    }
    // eslint-disable-next-line no-use-before-define
    disabledFiles();
  }, [dd_previo]);

  React.useEffect(() => {
    if (
      vendor !== null &&
      (vendor.id === 15 ||
        vendor.id === 176 ||
        vendor.id === 157 ||
        vendor.id === 158 ||
        vendor.id === 159 ||
        vendor.id === 160 ||
        vendor.id === 161 ||
        vendor.id === 162 ||
        vendor.id === 163 ||
        vendor.id === 165 ||
        vendor.id === 167 ||
        vendor.id === 33 ||
        vendor.id === 32 ||
        vendor.id === 41 ||
        vendor.id === 27 ||
        vendor.id === 228 ||
        vendor.id === 42)
    ) {
      setIsBillsImportOpen(true);
      set_dd_previo(true)
      setIsUploadFileEnabled(false)
      setSubmitDisabled(false)
      importarFaturaForm.values.checked_dd_previo = true
      window.$("#bills_circuit").modal("show");
    }
    else {
      if (vendor !== null) {
        setIsUploadFileEnabled(true)
        importarFaturaForm.values.checked_dd_previo = false
        set_dd_previo(false)
      }
    }
  }, [vendor]);

  const checkEnableGroup = () => {
    if (
      importarFaturaForm &&
      importarFaturaForm.values &&
      importarFaturaForm.values.network &&
      importarFaturaForm.values.vendor &&
      importarFaturaForm.values.regional
    ) {
      const params = {
        operator_id: importarFaturaForm.values.regional.id,
        vendor_id: importarFaturaForm.values.vendor.id,
        rede: importarFaturaForm.values.network
      };
      // props.clearFields("ImportarFatura", false, false, ["group"]);
      dispatch(change("ImportarFatura", "group", null))
      get_groups(params);
      setIsGroupEnabled(true);
    } else {
      setIsGroupEnabled(false);
      // props.clearFields("ImportarFatura", false, false, ["group"]);
      dispatch(change("ImportarFatura", "group", null))
    }
  };

  function visibleItems(group_name) {
    if (!dd_previo) {
      if (
        group_name.toUpperCase() === "VIVAXTIM" ||
        group_name.toUpperCase() === "TVH"
      ) {
        setIsInvoiceCostEnabled(false);
        setIsInvoiceNumberEnabled(false);
      } else {
        setIsInvoiceCostEnabled(true);
        setIsInvoiceNumberEnabled(true);
      }
    }
  }

  const circuits = useSelector(state => state.importarFaturaReducer.circuits);

  function disabledFiles() {
    const vendor_id = importarFaturaForm.values.vendor?.id || null;
    const { network } = importarFaturaForm.values || null;
    const { group } = importarFaturaForm.values || null;
    if (dd_previo) {
      // props.clearFields("ImportarFatura", false, false, ["invoice_number"]);
      // props.clearFields("ImportarFatura", false, false, ["invoice_cost"]);
      // props.clearFields("ImportarFatura", false, false, ["order_at"]);
      // props.clearFields("ImportarFatura", false, false, ["deadline_at"]);
      dispatch([
        change("ImportarFatura", "invoice_number", null),
        change("ImportarFatura", "invoice_cost", null),
        change("ImportarFatura", "order_at", null),
        change("ImportarFatura", "deadline_at", null)
      ])
      setIsInvoiceNumberEnabled(false);
      setIsInvoiceCostEnabled(false);
      setIsOrderAtEnabled(false);
      setIsDeadLineAtEnabled(false);
      if (
        vendor_id === 3 ||
        vendor_id === 5 ||
        vendor_id === 6 ||
        vendor_id === 10 ||
        vendor_id === 11 ||
        vendor_id === 12 ||
        vendor_id === 13 ||
        vendor_id === 17 ||
        vendor_id === 18 ||
        vendor_id === 23 ||
        vendor_id === 30 ||
        vendor_id === 35 ||
        vendor_id === 39 ||
        vendor_id === 40 ||
        vendor_id === 48 ||
        vendor_id === 103 ||
        vendor_id === 140 ||
        vendor_id === 141 ||
        vendor_id === 152 ||
        vendor_id === 154 ||
        vendor_id === 155 ||
        vendor_id === 158 ||
        vendor_id === 163 ||
        vendor_id === 168 ||
        vendor_id === 175 ||
        vendor_id === 182 ||
        vendor_id === 202 ||
        vendor_id === 300 ||
        vendor_id === 393 ||
        vendor_id === 410 ||
        (network === "FIXA" &&
          (vendor_id === 49 ||
            vendor_id === 151 ||
            vendor_id === 314 ||
            vendor_id === 316 ||
            vendor_id === 322 ||
            vendor_id === 330 ||
            vendor_id === 334 ||
            vendor_id === 335 ||
            vendor_id === 347 ||
            vendor_id === 350 ||
            vendor_id === 365 ||
            vendor_id === 372 ||
            vendor_id === 374 ||
            vendor_id === 387 ||
            vendor_id === 390 ||
            vendor_id === 391 ||
            vendor_id === 392 ||
            vendor_id === 394 ||
            vendor_id === 395 )) ||
        (vendor_id === 25 && vendor.ip)
      ) {
        if (vendor_id === 13 && network === "FIXA") {
          setIsGroupEnabled(true);
          setIsOperatorEnabled(true);
        } else {
          // props.clearFields("ImportarFatura", false, false, ["regional"]);
          // props.clearFields("ImportarFatura", false, false, ["group"]);
          dispatch([
            change("ImportarFatura", "regional", null),
            change("ImportarFatura", "group", null)
          ])
          setIsGroupEnabled(false);
          setIsOperatorEnabled(false);
        }
      }
    } else {
      setIsInvoiceNumberEnabled(true);
      setIsInvoiceCostEnabled(true);
      setIsOrderAtEnabled(true);
      setIsDeadLineAtEnabled(true);
      setIsGroupEnabled(true);
      setIsOperatorEnabled(true);
      if (vendor_id != null && (vendor_id === 6 || vendor_id === 182)) {
        // props.clearFields("ImportarFatura", false, false, ["regional"]);
        // props.clearFields("ImportarFatura", false, false, ["group"]);
        // props.clearFields("ImportarFatura", false, false, ["invoice_number"]);
        // props.clearFields("ImportarFatura", false, false, ["invoice_cost"]);
        // props.clearFields("ImportarFatura", false, false, ["order_at"]);
        // props.clearFields("ImportarFatura", false, false, ["deadline_at"]);
        dispatch([
          change("ImportarFatura", "regional", null),
          change("ImportarFatura", "group", null),
          change("ImportarFatura", "invoice_number", null),
          change("ImportarFatura", "invoice_cost", null),
          change("ImportarFatura", "order_at", null),
          change("ImportarFatura", "deadline_at", null)
        ])
        setIsGroupEnabled(false);
        setIsInvoiceNumberEnabled(false);
        setIsUploadFileEnabled(false);
        setIsInvoiceCostEnabled(false);
        setIsOrderAtEnabled(false);
        setIsDeadLineAtEnabled(false);
        setIsOperatorEnabled(false);
      }
    }
    if (group != null) {
      console.log("entrou no aleatorio")
      visibleItems(group.name);
    }
  }

  const checkDdPrevio = () => {
    set_dd_previo(!dd_previo);
    dispatch([
      change("ImportarFatura", "invoice_cost", null),
      change("ImportarFatura", "invoice_number", null),
      change("ImportarFatura", "order_at", null),
      change("ImportarFatura", "deadline_at", null),
    ])
    // setIsOperatorEnabled(false);
    setForceReloadDateFields(false);
    setTimeout(() => {
      setForceReloadDateFields(true);
    }, 1);
  };

  const handleSubmit = () => {
    const { importarFaturaForm } = props;

    if (importarFaturaForm.values.mes_ref == undefined) {
      toastr.info(
        "Alerta",
        "Por favor, preencha o mês de referência"
      )
    }

    else {
      const params = {
        invoice: {
          dd_previo: importarFaturaForm.values.checked_dd_previo
            ? importarFaturaForm.values.checked_dd_previo
            : false,
          invoice_number: importarFaturaForm.values.invoice_number,
          group_id: importarFaturaForm.values.group
            ? importarFaturaForm.values.group.id
            : null,
          operator_id: importarFaturaForm.values.regional
            ? importarFaturaForm.values.regional.id
            : null,
          filename_df: null,
          filename_fr: null,
          typeNetwork: importarFaturaForm.values.network,
          deadline_at: importarFaturaForm.values.deadline_at
            ? importarFaturaForm.values.deadline_at
            : null,
          invoice_cost: importarFaturaForm.values.invoice_cost
            ? importarFaturaForm.values.invoice_cost
            : "NaN",
          reference_month: importarFaturaForm.values.mes_ref.substring(3),
          circuits_vendor:
            vendor.id === 15 ||
              vendor.id === 176 ||
              vendor.id === 157 ||
              vendor.id === 158 ||
              vendor.id === 159 ||
              vendor.id === 160 ||
              vendor.id === 161 ||
              vendor.id === 162 ||
              vendor.id === 163 ||
              vendor.id === 165 ||
              vendor.id === 167 ||
              vendor.id === 33 ||
              vendor.id === 32 ||
              vendor.id === 41 ||
              vendor.id === 27 ||
              vendor.id === 228 ||
              vendor.id === 42 ? circuits[0]?.map((circuit) => ({
                ...circuit,
                val_link_c_imp_a: parseFloat(circuit.val_link_c_imp_a)
              })) : {},
          filename_dd: fileName,
          order_at: importarFaturaForm.values.order_at
            ? importarFaturaForm.values.order_at
            : null,
          filename_nf: null,
          user_id: auth.user.id,
          vendor_id: importarFaturaForm.values.vendor.id,
          febrabran: importarFaturaForm.values.vendor.febrabran
            ? importarFaturaForm.values.vendor.febrabran
            : null,
          ip: importarFaturaForm.values.vendor.ip
            ? importarFaturaForm.values.vendor.ip
            : null,
          algar: importarFaturaForm.values.vendor.algar
            ? importarFaturaForm.values.vendor.algar
            : null
        }
      };
      Promise.all([import_files(params)]);
    }
  };

  const handleUpload = value => {
    setFileName(value);
  };

  const setAcceptedFileType = () => {
    const { vendor } = importarFaturaForm.values;
    const { network } = importarFaturaForm.values;

    if (vendor) {
      setForceReloadDropzone(false);
      setTimeout(() => {
        setForceReloadDropzone(true);
      }, 1);

      if (
        vendor.id === 3 ||
        vendor.id === 5 ||
        vendor.id === 7 ||
        vendor.id === 9 ||
        vendor.id === 10 ||
        vendor.id === 11 ||
        vendor.id === 13 ||
        vendor.id === 17 ||
        vendor.id === 18 ||
        vendor.id === 19 ||
        vendor.id === 20 ||
        vendor.id === 21 ||
        vendor.id === 22 ||
        vendor.id === 23 ||
        vendor.id === 24 ||
        (vendor.id === 25 && vendor.ip) ||
        vendor.id === 27 ||
        vendor.id === 30 ||
        vendor.id === 34 ||
        vendor.id === 35 ||
        vendor.id === 37 ||
        vendor.id === 39 ||
        vendor.id === 40 ||
        vendor.id === 48 ||
        vendor.id === 49 ||
        vendor.id === 103 ||
        vendor.id === 151 ||
        vendor.id === 152 ||
        vendor.id === 154 ||
        vendor.id === 155 ||
        vendor.id === 168 ||
        vendor.id === 175 ||
        vendor.id === 202 ||
        vendor.id === 210 ||
        vendor.id === 298 ||
        vendor.id === 300 ||
        vendor.id === 314 ||
        vendor.id === 316 ||
        vendor.id === 322 ||
        vendor.id === 330 ||
        vendor.id === 334 ||
        vendor.id === 335 ||
        vendor.id === 347 ||
        vendor.id === 350 ||
        vendor.id === 365 ||
        vendor.id === 372 ||
        vendor.id === 374 ||
        vendor.id === 387 ||
        vendor.id === 390 ||
        vendor.id === 391 ||
        vendor.id === 392 ||
        vendor.id === 393 ||
        vendor.id === 394 ||
        vendor.id === 395 ||
        vendor.id === 410 ||
        (network === "FIXA" &&
          (vendor.id === 12 || vendor.id === 40 || vendor.id === 140))
      ) {
        setDropzoneAccept(".csv");
      } else {
        setDropzoneAccept(".txt");
      }
    }
  };

  return (
    <div className="overlay-wrapper" width="device-width">
      <Overlay />
      <div>
        <ContentHeader title="Importar Fatura" small="" />
        <Content>
          <div className="box box-body">
            <form>
              <Grid>
                <Row>
                  <Field
                    label="Rede"
                    name="network"
                    cols="12 1"
                    component={DropdownListField}
                    data={network_list}
                    textField={item => item}
                    textValue={({ item }) => item}
                    onBlur={() => checkEnableGroup()}
                  />
                  <Field
                    label="Provedor"
                    name="vendor"
                    cols="12 2"
                    component={DropdownListField}
                    data={vendor_list}
                    textField={item => item.name}
                    textValue={({ item }) => item.id}
                    onBlur={() => {
                      checkEnableGroup();
                      setAcceptedFileType();
                    }}
                  />
                  <Field
                    label="Regional"
                    name="regional"
                    cols="12 2"
                    component={DropdownListField}
                    data={operators}
                    textField={item => item.regional}
                    textValue={({ item }) => item.id}
                    onBlur={() => checkEnableGroup()}
                    disabled={!isOperatorEnabled}
                  />
                  <Field
                    label="Agrupador"
                    name="group"
                    cols="12 2"
                    component={DropdownListField}
                    data={groups}
                    textField={item => item.name}
                    textValue={({ item }) => item.id}
                    disabled={!isGroupEnabled}
                    onChange={item => {
                      visibleItems(item.name);
                    }}
                  />
                  <Field
                    label="Mês de Referência"
                    name="mes_ref"
                    cols="12 2"
                    component={DateTimePickerField}
                    time={false}
                    formatacao="MM/YYYY"
                    visualizacao={["year"]}
                  />
                </Row>
                <Row>
                  <Field
                    label="Valor da Fatura"
                    name="invoice_cost"
                    cols="12 2"
                    component={LabelField}
                    disabled={!isInvoiceCostEnabled}
                  />
                  <Field
                    label="Nº da Fatura"
                    name="invoice_number"
                    cols="12 2"
                    component={LabelField}
                    disabled={!isInvoiceNumberEnabled}
                  />
                  {forceReloadDateFields && (
                    <>
                      <Field
                        label="Data de Emissão"
                        name="order_at"
                        cols="12 2"
                        component={DateTimePickerField}
                        time={false}
                        disabled={!isOrderAtEnabled}
                      />
                      <Field
                        label="Data de Vencimento"
                        name="deadline_at"
                        cols="12 2"
                        component={DateTimePickerField}
                        time={false}
                        disabled={!isDeadLineAtEnabled}
                      />
                    </>
                  )}
                  <Grid cols="12 1">
                    <Row>
                      <Grid>
                        <label html-for="checked_dd_previo">DD Prévio</label>
                      </Grid>
                      <Grid>
                        <Field
                          id="checked_dd_previo"
                          name="checked_dd_previo"
                          component="input"
                          type="checkbox"
                          disabled={vendor === null || isddPrevio}
                          onClick={() => {
                            checkDdPrevio();
                          }}
                        />
                      </Grid>
                    </Row>
                  </Grid>
                </Row>
                <Row>
                  {isUploadFileEnabled && (
                    <Grid cols="12 3">
                      {forceReloadDropzone && (
                        <UploadFatura
                          accept={dropzoneAccept}
                          handleUpload={handleUpload}
                        />
                      )}
                    </Grid>
                  )}
                  <Grid cols="12 2">
                    <label>DD</label>
                  </Grid>
                </Row>
                <Row>
                  <div style={{ margin: "0.3vw" }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleSubmit()}
                      disabled={submitDisabled}
                    >
                      Importar
                    </button>
                  </div>
                </Row>
                {/* <Row>
                  <Grid cols="12 1">
                      <Row>
                        <Grid>
                          <label>{" "}</label>
                        </Grid>
                        <Grid>
                          <button className="btn btn-link btn-block pull-right">
                            <i className="fa fa-chevron-left"></i>
                          </button>
                        </Grid>
                      </Row>
                    </Grid>
                    <Field
                      label="Regional"
                      name="show_operator"
                      cols="12 2"
                      component={LabelField}
                    />
                    <Field
                      label="Provedor"
                      name="show_vendor"
                      cols="12 2"
                      component={LabelField}
                    />
                    <Field
                      label="Agrupador"
                      name="show_group"
                      cols="12 2"
                      component={LabelField}
                    />
                    <Field
                      label="Mês Referência"
                      name="show_mes_ref"
                      cols="12 2"
                      component={LabelField}
                    />
                    <Grid cols="12 1">
                      <Row>
                        <Grid>
                          <label>{" "}</label>
                        </Grid>
                        <Grid>
                          <button className="btn btn-link btn-block pull-right">
                            <i className="fa fa-chevron-right"></i>
                          </button>
                        </Grid>
                      </Row>
                    </Grid>
                </Row> */}
                <Row>
                  <div style={{ height: "20vw", margin: "1vw" }}>
                    <Table row_content={list} column_content={columns} />
                  </div>
                </Row>
                <Row>
                  <div style={{ marginLeft: "0.3vw" }}>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => delete_bill_dds(list[0].id)}
                      disabled={list.length === 0}
                    >
                      Recusar
                    </button>
                  </div>
                </Row>
              </Grid>
            </form>
          </div>
        </Content>
      </div>
      <ModalForm
        LabelButtonSubmit="Enviar"
        handleClickBtnSubmit={() => { }}
        id="bills_circuit"
        title="Seleção de Circuitos para Faturamento"
        dimension="modal-lg"
        onClose={() => {
          setIsBillsImportOpen(false);
        }}
        actions={
          <button
            type="button"
            onClick={() => window.$("#new_circuit").modal("show")}
            className="btn btn-success"
          >
            Novo Circuito
          </button>
        }
      >
        <BillsImport
          vendor_name={vendor?.name}
          vendor_id={vendor?.id}
          network={importarFaturaForm?.values?.network}
          isBillsImportOpen={isBillsImportOpen}
        />
      </ModalForm>

      <ModalForm
        LabelButtonSubmit="Salvar"
        handleClickBtnSubmit={() => {
          Promise.all([
            save_circuits_by_vendor(newCircuit, vendor?.id)
          ]).then(() =>
            get_circuits_by_vendor(
              vendor?.id,
              importarFaturaForm?.values?.network
            )
          );
        }}
        id="new_circuit"
        title="Cadastro de Circuito para Faturamento"
        dimension="modal-lg"
      >
        <NewCircuit />
      </ModalForm>
    </div>
  );
};

const Form = reduxForm({ form: "ImportarFatura" })(ImportarFatura);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_operators_and_vendors,
      get_groups,
      import_files,
      delete_bill_dds,
      save_circuits_by_vendor,
      get_circuits_by_vendor
    },
    dispatch
  );

const mapStateToProps = state => {
  const order_at = "";
  const deadline_at = "";
  return {
    newCircuit: get(state.form.NewCircuit, "values", null),
    importarFaturaForm: state.form.ImportarFatura,
    importarFaturaReducer: state.importarFaturaReducer,
    auth: state.auth,
    initialValues: {
      order_at,
      deadline_at,
      network: "MÓVEL"
    },
    enableReinitialize: true
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
