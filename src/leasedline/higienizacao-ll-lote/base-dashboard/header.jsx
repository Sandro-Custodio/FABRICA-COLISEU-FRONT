import React from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import get from "lodash/get";
import { toastr } from "react-redux-toastr";
import { IconButton } from "../../comps";
import { Label } from "../../../common/form/components";
import { uploadFile, analisaCsv, atualizaCsv } from "./actions";
import { Modal } from "common";
import ModeloDashboard from "./modeloDashboard";
import axios from "axios";

const Header = ({ setRows, rows, user_id, setLoading }) => {
  const [operacao, setOperacao] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [classifications, setClassifications] = React.useState([]);

  const onDrop = files => {
    setLoading(true);
    const dataDia = new Date();
    const nomeFormat = files[0].name.split(".");
    const nomeArquivoFormat = `ANEXO${nomeFormat[0]}${dataDia.getTime()}.${nomeFormat[1]}`;
    const formData = new FormData();
    formData.append("Filedata", files[0]);
    formData.append("Newname", nomeArquivoFormat);
    uploadFile(formData)
      .then(({ data }) => {
        toastr.info(data[0]);
        return analisaCsv(operacao, nomeArquivoFormat, user_id);
      })
      .then(res => {
        setDisabled(res.data[0].some(data => data.status));
        setRows(
          res.data[0].map(r => ({
            message: r.message,
            ll_guid: r.ll_guid,
            plano_rollout: r.plano_rollout,
            rollout_planejado: r.rollout_planejado,
            rollout_replanejado: r.rollout_replanejado,
            rollout_realizado: r.rollout_realizado,
            plano_efic: r.plano_efic,
            efic_planejado: r.efic_planejado,
            efic_replanejada: r.efic_replanejada,
            efic_realizada: r.efic_realizada,
            grupo_provedor: r.grupo_provedor,
            seg_velocidade_mbps: r.seg_velocidade_mbps,
            tecnologia_normalizada: r.tecnologia_normalizada,
            status_normalizado_pmo: r.status_normalizado_pmo,
            classificacao_demanda: r.classificacao_demanda,
            controle_ll_guid: r.controle_ll_guid,
            rede_normalizada: r.rede_normalizada
          }))
        );
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    axios
      .get("demand_classifications/get_all_demand_classifications")
      .then(res => {
        setClassifications(res.data.map((el) => el.description));
      })
      .catch(e => {
        console.log("erro", e)
      })
  }, []);

  const OPH = [
    { value: 1, name: "Rollout" },
    { value: 2, name: "Eficiência" },
  ];
  return (
    <div>
      <form className="form">
        <div className="row">
          <div className="col-md-2">
            <Label text="Operação" />{" "}
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
                title="Classificações de Demandas Cadastradas"
                dimension="sm"
                width="60vw"
                onClose={() => setOpen(false)}
              >
                <ModeloDashboard classifications={classifications} />
              </Modal>
            )}
            <IconButton
              icon="download"
              onClick={() =>
                window.open(
                  `${process.env.REACT_APP_API_URL}/modelo/template_atualizar_base_dashboard.csv`
                )
              }
              title="Modelo de Importação"
            />
          </div>
          <div className="row">
            <div className="col-md-3">
              {operacao > 0 ? <>
                <Dropzone accept=".csv" onDrop={onDrop}>
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
                </Dropzone>{" "}
              </>
                : " "}
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

                          atualizaCsv(rows, op.value).then(
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
  user_id: get(state, "auth.user.id")
}))(Header);
