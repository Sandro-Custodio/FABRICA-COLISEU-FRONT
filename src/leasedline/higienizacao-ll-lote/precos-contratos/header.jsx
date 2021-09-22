import React from "react";
import { connect } from "react-redux";
import { Modal } from "common";
import Dropzone from "react-dropzone";
import get from "lodash/get";
import { toastr } from "react-redux-toastr";
import { IconButton } from "../../comps";
import ModeloFaturamento from "./modeloInfoFaturamento";
import { Label } from "../../../common/form/components";
import { uploadFile, analisaCsv, atualizaCsv } from "./actions";
import moment from "moment";
import "./styles.css";

const Header = ({ setRows, rows, user_id, setLoading }) => {
  const [open, setOpen] = React.useState(false);
  const [operacao, setOperacao] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const [enablebledDropzone, setEnablebledDropzone] = React.useState(true);
  const [showMotivo, setShowMotivo] = React.useState(false);
  const [motivo, setMotivo] = React.useState("");

  React.useEffect(() => {
    if (operacao == 3) {
      setShowMotivo(true)
    } else {
      setShowMotivo(false)
      setMotivo("")
    }
  }, [operacao])

  React.useEffect(() => {
    var now = new Date();
    const validation = rows.some((row) => {
      let str = row.date_last_att_value;
      const myArr = str.split("/");
      var then = new Date(myArr[2], myArr[1], myArr[0]);
      var diffInDays = Math.round((now - then) / (1000 * 60 * 60 * 24));
      return diffInDays <= 365
    })
    if (validation) {
      setTimeout(() => {
        toastr.warning("Há atualizações de valores realizadas há menos de 365 dias");
      }, 1000);
    }
    const lpuValidation = rows.some((row) => (row.message == "LPU Guid presente na base"))
    if (lpuValidation) {
      setTimeout(() => {
        toastr.error("Existem Circuitos com LPU vinculado que não podem ser higienizados");
      }, 3000);
    }
  }, [rows])

  React.useEffect(() => {
    if ((operacao == 3) && ((motivo == "") || (motivo == null) || (motivo == undefined))) {
      setEnablebledDropzone(false)
    } else {
      setEnablebledDropzone(true)
    }
  }, [operacao, motivo])


  const onDrop = files => {
    setLoading(true);
    const formData = new FormData();
    formData.append("Filedata", files[0]);
    formData.append("Newname", files[0].name);
    uploadFile(formData)
      .then(({ data }) => {
        return analisaCsv(operacao, files[0].name, user_id, "DR_COC1F1B1", motivo);
      })
      .then(res => {
        if (res.status == 200) {
          toastr.info("Importação feita com sucesso!")
        }
        setDisabled(res.data[0].some(data => data.status));
        setRows(
          res.data[0].map(r => ({
            message: r.message_lpu_existente != "" ? r.message_lpu_existente : r.message,
            ll_guid: r.ll_guid,
            circuito_id: r.circuito_id,
            provedor: r.provedor,
            contrato: r.contrato,
            nova_fidelizacao: r.nova_fidelizacao,
            inicio_fidelizacao: r.inicio_fidelizacao,
            tx_inst_s_imp: r.tx_inst_s_imp,
            tx_inst_c_imp_a: r.tx_inst_c_imp_a,
            tx_inst_c_imp_b: r.tx_inst_c_imp_b,
            valor_s_imp: r.valor_s_imp,
            valor_c_imp_a: r.valor_c_imp_a,
            valor_c_imp_b: r.valor_c_imp_b,
            degrau: r.degrau,
            agrupador_a: r.agrupador_a,
            agrupador_b: r.agrupador_b,
            Observacao: r.Observacao,
            valor_modem_s_imp: r.valor_modem_s_imp,
            valor_modem_c_imp: r.valor_modem_c_imp,
            classificacao_demanda: r.classificacao_demanda,
            controle_ll_guid: r.controle_ll_guid,
            divulgacao: r.divulgacao,
            rede_normalizada: r.rede_normalizada,
            motivo: operacao == 3 ? motivo : " ",
            date_last_att_value: operacao == 3 ? moment(r.date_last_att_value).format("DD/MM/YYYY") : " ",
            last_month_without_fee: operacao == 3 ? r.last_month_without_fee : " ",
            last_month_with_fee: operacao == 3 ? r.last_month_with_fee : " ",
            indice_reajuste: operacao == 3 ? r.indice_reajuste : " ",
            percentual_reajuste: operacao == 3 ? r.percentual_reajuste : " ",
          }))
        );
      })
      .catch(error => {
        toastr.error(error);
        console.log(error);
      })
      .finally(() => {
        setLoading(false)
      });
  };
  const OPH = [
    { value: 1, name: "Contrato" },
    { value: 2, name: "Fidelização" },
    { value: 3, name: "Faturamento(Correção de Valores)" },
    { value: 4, name: "Agrupadores" },
    { value: 5, name: "Degrau" },
    { value: 6, name: "Classificação da Demanda" },
  ];
  const motivoData = [
    { value: "Ajuste de valores", name: "Ajuste de valores" },
    { value: "Reajuste de mensalidades", name: "Reajuste de mensalidades" }
  ];
  return (
    <div>
      <form className="form">
        <div className="row">
          <div className="col-md-2">
            <Label text="Operação de Higienização" />{" "}
          </div>{" "}
          <div className="col-md-3">
            <select
              className="form-control input-sm"
              label="Operação de Higienização"
              value={operacao}
              onChange={evt => {
                setOperacao(evt.target.value);
                setRows([]);
              }}
            >
              <option value={0}>Selecione</option>
              {OPH.map(({ value, name }) => (
                <option key={name} value={value}>
                  {name}
                </option>
              ))}
            </select>{" "}
          </div>
          <div className="col-md-2">
            <IconButton icon="info" onClick={() => setOpen(true)} />
            {open && (
              <Modal
                open={open}
                title="Modelo"
                dimension="sm"
                width="60vw"
                onClose={() => setOpen(false)}
              >
                <ModeloFaturamento />
              </Modal>
            )}
            <IconButton
              icon="download"
              onClick={() =>
                window.open(
                  `${process.env.REACT_APP_API_URL}/modelo/ModeloEntradaPrecosContratos.csv`
                )
              }
              title="Modelo de Importação"
            />
          </div>
          <div className="row">
            <div className="col-md-3">
              {enablebledDropzone ? (<Dropzone accept=".csv" onDrop={onDrop}>
                {({
                  getRootProps,
                  getInputProps,
                  isDragActive,
                  isDragReject
                }) => (
                  <div
                    className="dropzone"
                    data-for="top_dark_float"
                    data-tip="SOLTE O ARQUIVO AQUI."
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <i className="fa fa-upload" />
                    {!isDragActive && " Clique aqui ou solte um arquivo!"}
                    {isDragActive && !isDragReject && " Solte o arquivo aqui."}
                    {isDragReject && "Arquivo inválido!"}
                  </div>
                )}
              </Dropzone>
              ) : <div>
                  {showMotivo && (<p style={{ color: "white", backgroundColor: "#bf9000", marginLeft: "15px", borderRadius: "50px", height: '40px', width: '310px', padding: '10px' }}><b>Escolha um motivo para anexar o arquivo!</b></p>)}
                </div>}
            </div>{" "}
            <div className="col-md-1">
              <button
                type="button"
                disabled={disabled}
                onClick={() => {
                  const op = OPH.find(item => item.value === parseInt(operacao));
                  if (!op)
                    toastr.warning("Atenção", "Selecione uma Operação");
                  else
                    toastr.confirm(
                      "Deseja atualizar a base com os dados importados?",
                      {
                        onOk: () => {
                          setLoading(true);

                          atualizaCsv(rows, op.value, op.name, user_id).then(
                            resp => {
                              if (resp.status === 200) {
                                toastr.info(
                                  "Atualização realizada com sucesso!"
                                );
                                setRows([]);
                                setLoading(false);
                                setDisabled(true);
                              }
                            }
                          ).finally(() => setLoading(false));
                        }
                      }
                    );
                }}
                className="btn btn-primary"
              >
                Atualizar Base
              </button>
            </div>
          </div>
          {showMotivo && (<> <div className="col-md-2">
            <Label text="Motivo" />{" "}
          </div>{" "}
            <div className="col-md-3">
              <select
                className="form-control input-sm"
                label="Motivo"
                value={motivo}
                onChange={mot => {
                  setMotivo(mot.target.value);
                  setRows([]);
                }}
              >
                <option value={0}>Selecione</option>
                {motivoData.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <p style={{ color: "green" }}>* Última atualização de valores realizada há menos de 365 dias </p>
            </div>
          </>)}
        </div>
      </form>
    </div>
  );
};

Header.defaultProps = {
  rows: [],
  columns: []
};

export default connect(state => ({
  filter: get(state, "form.higiForm.values", {}),
  user_id: get(state, "auth.user.id")
}))(Header);
