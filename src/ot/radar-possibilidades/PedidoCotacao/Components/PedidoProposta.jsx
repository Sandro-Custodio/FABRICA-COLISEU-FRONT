import React, { useEffect, useState } from "react";
import axios from "axios";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import Grid from "common/layout/grid";
import { connect } from "react-redux";
import { DateTimePickerField } from "common/form/components";
import get from "lodash/get";
import { IconButton, Modal, Table } from "common";
import { Select, Input } from "common/input";
import { contratacao, columns } from "./mock.json";
import { getProvedor } from "./actions";
import { setSendRequest } from "../../actions";
import Upload from "./Upload";
import Descricao from "./Descricao";
import "./styles.css";

const uploadFile = files => {
  return Promise.all(
    files.map(file => {
      const form = new FormData();
      form.append("Filedata", file);
      form.append("new_file_name", file.name);
      form.append("folder_name", "pedido_cotacao");
      return axios
        .post(`${process.env.REACT_APP_API_URL}/flex_upload/attachment`, form)
        .then(res => {
          if (res.status === 200) {
            toastr.success("Anexo", "Upload realizado com sucesso!");
            console.log(res.data[0]);
          }
        })
        .catch(() => {
          toastr.error("Erro", "Erro ao realizar upload");
        });
    })
  );
};

const PedidoProposta = ({
  dispatch,
  selection,
  list,
  evtList,
  getProvedor,
  vendor,
  validatePms,
  vendorContracts,
  setSendRequest,
  evtForm
  // checkContractedQuantity
}) => {
  const [provedor, setProvedor] = useState([]);
  const [value, setValue] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, onSelectionChange] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/vendors/get_all_vendors_by_area`,
        {
          area: "LL"
        }
      )
      .then(res => {
        setProvedor(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const otCode =
    get(
      selection.map(item => list[item]),
      "[0].code"
    ) || "[N/A]";
  const otId =
    get(
      selection.map(item => list[item]),
      "[0].id"
    ) || null;
  const segId =
    get(
      selection.map(item => list[item]),
      "[0].seg_id"
    ) || null;
  const evtCode = otCode.replace("OT", "EVT");

  const getAllDataProviders = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}evts/validate_pms`, {
        vendor_id: parseInt(vendor, 10)
      })
      .then(res => setEmailList(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleProvedorChange = e => {
    setLoading(true);
    Promise.all([getProvedor(e.target.value, otId, segId, 1)]).finally($ => {
      setLoading(false);
    });
    dispatch({
      type: "SET_VENDOR",
      payload: get(
        provedor.find(el => el.id === parseInt(e.target.value, 10)),
        "provedor",
        "[N/A]"
      )
    });
  };

  // console.log(
  //   "contratos_selecionados",
  //   get(validatePms, "contratos_selecionados", []).length
  // );
  // console.log("vendorContracts", vendorContracts);
  // console.log("checkContractedQuantity", checkContractedQuantity);

  return (
    <div className="box-body">
      <div style={pedidoCotacao}>
        <form>
          <div>
            <Grid>
              <Field
                contentProps="col-md-4"
                cols="12 4"
                label="Data do pedido"
                name="requested_at"
                type="text"
                formatacao="DD/MM/YYYY"
                time={false}
                component={DateTimePickerField}
                onInput={ e => e.target.value = ""}
                placeholder="Selecione uma Data"
              />
              <Field
                contentProps="col-md-4"
                name="vendor_id"
                label="Provedor"
                component={Select}
                data={provedor.sort()}
                valueKey="id"
                textKey="name"
                onChange={e => handleProvedorChange(e)}
              />
              <Field
                contentProps="col-md-4"
                label="Contratos"
                name="contract_id"
                component={Select}
                data={vendorContracts}
                textKey="contrato"
                valueKey="id"
                loading={loading}
              />
            </Grid>
          </div>
          <div>
            <Grid>
              <Field
                contentProps="col-md-4"
                text="Código EVT"
                name="request_protocol"
                component={Input}
                readOnly
                placeholder={`${evtCode}-${evtList.length + 1}`}
              />
              <Field
                contentProps="col-md-4"
                cols="12 4"
                label="Limite recebimento"
                time={false}
                formatacao="DD/MM/YYYY"
                component={DateTimePickerField}
                name="deadline_at"
                onInput={ e => e.target.value = ""}
                placeholder="Selecione uma Data" 
              />
              <Field
                contentProps="col-md-4"
                label="Pz. Contratação"
                name="contract_time"
                component={Select}
                data={contratacao}
                textKey="value"
                valueKey="id"
              />
            </Grid>
          </div>
          {get(validatePms, "contratos_selecionados", []).length > 0 && (
            <div>
              <Grid>
                <div
                  className="form-group col-md-4"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    style={{ margin: 0 }}
                    id="scales"
                    name="scales"
                    type="checkbox"
                    onChange={e => setValue(e.target.checked)}
                  />
                  <label style={{ margin: "0 15px" }} htmlFor="scales">
                    Gerar Notificação
                  </label>
                </div>

                {!value ? (
                  <div
                    className="form-group col-md-4"
                    id="pedido-cotacao"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Upload multiple onDrop={uploadFile} />
                    <label htmlFor="anexar arquivo">Upload de Evidência</label>
                  </div>
                ) : (
                  <>
                    <div
                      className="form-group col-md-4"
                      id="pedido-cotacao"
                      style={{ display: "flex" }}
                    >
                      <Upload
                        multiple
                        onDrop={uploadFile}
                        style={{ maxWidth: 50 }}
                      />
                      <IconButton
                        title="Email"
                        icon="envelope"
                        color="#3c8dbc"
                        style={{ maxWidth: 50 }}
                        onClick={() => {
                          getAllDataProviders();
                          setOpen(true);
                          setSendRequest(
                            evtForm,
                            { vendor_id: evtForm.vendor_id },
                            false
                          );
                        }}
                      />
                    </div>
                  </>
                )}
              </Grid>
              {open && (
                <Modal
                  open={open}
                  title="Contratos"
                  onClose={() => {
                    setOpen(false);
                  }}
                >
                  <Descricao />
                </Modal>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const pedidoCotacao = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column"
};

const formWrapper = reduxForm({
  form: "PedidoProposta"
})(PedidoProposta);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProvedor,
      setSendRequest
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    vendor: get(state.form, "PedidoProposta.values.vendor_id", ""),
    evtList: get(state, "radarPossibilidades.evt_list", []),
    evtForm: get(state.form, "PedidoProposta.values", {}),
    list: get(state.ot, "list", []),
    validatePms: get(
      state,
      "radarPossibilidades.provSelected.validatePms.data",
      []
    ),
    vendorContracts: get(
      state,
      "radarPossibilidades.provSelected.getVendorContracts.data",
      []
    ),
    checkContractedQuantity: get(
      state,
      "radarPossibilidades.provSelected.checkContractedQuantity.data",
      []
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formWrapper);
