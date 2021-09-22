import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UploadAnexo from "./UploadAnexoMulti";
import { toastr } from "react-redux-toastr";
import axios from "axios";
import { Modal } from "common";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import { Label } from "common/form/components";
import get from "lodash/get";
import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";
import { Select } from "common/input";
import Overlay from "common/msg/overlay/overlay";
import {
  getVendorLpus,
  get_contracts_by_vendor_id,
  show_overlay,
  hide_overlay
} from "./actions";
import { columnsPedidoEvt } from "../mock.json";

const EscolhaVendor = ({
  auth,
  open,
  setOpen,
  setOpenModalEmail,
  email,
  linhasSegselecionadasParaBackend,
  setLinhasVendorsSelecionadas,
  show_overlay,
  hide_overlay
}) => {
  const [vendorLpu, setVendorLpu] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    show_overlay();
    getVendorLpus()
      .then(res => {
        setVendorLpu(res.data);
      })
      .catch(err => err)
      .finally(() => hide_overlay());
  }, []);

  const rows = vendorLpu.map(
    ({ id, name, short_name, descricao, tipo, vendor_lpu, created_at }) => ({
      id,
      name,
      provedor: short_name,
      fidelizacao: descricao,
      tipo,
      vendor_lpu,
      created_at
    })
  );

  const deleteStateVariable = param => {
    setSelected(prevState => {
      const state = { ...prevState };
      if (state.hasOwnProperty(param)) {
        delete state[param];
        return state;
      }
      return state;
    });
  };

  const handleChange = (vendor_id, key, value, checked) => {
    if (checked) {
      setSelected(prevState => ({
        ...prevState,
        [vendor_id]: { ...prevState[vendor_id], [key]: value, vendor_id }
      }));
    } else {
      deleteStateVariable(vendor_id);
    }
  };

  const postEvt = () => {
    const linhas = Object.keys(selected).map(key => {
      return selected[key];
    });

    setLinhasVendorsSelecionadas(linhas);
    let segmentos = "";

    for (let i = 0; i < linhasSegselecionadasParaBackend.length; i++) {
      if (linhasSegselecionadasParaBackend[i].id != null) {
        segmentos = segmentos.concat(
          `${linhasSegselecionadasParaBackend[i].id};`
        );
      }
    }

    const params = {
      evts: Object.keys(selected).map(key => ({
        vendor_id: selected[key].vendor_id,
        contract_time: selected[key].contract_time,
        requested_at: selected[key].selected_date,
        flag_receita: selected[key].flag_receita,
        contract_id: selected[key].contract_id,
        deadline_at: new Date().toLocaleDateString()
      })),
      segs: linhasSegselecionadasParaBackend,
      non_pms_seg_list: Object.keys(selected).map(key => ({
        vendor_id: selected[key].vendor_id,
        vendor_name: selected[key].vendor_name,
        segs: segmentos
      })),
      user: {
        id: get(auth, "user.id"),
        contact_number: null,
        address: null,
        fax_number: null,
        city: null,
        name: get(auth, "user.name"),
        email: get(auth, "user.email"),
        registry: get(auth, "user.registry")
      },
      vendors: {
        vendors: Object.keys(selected).map(key => ({
          vendor_name: selected[key].vendor_name,
          id: selected[key].vendor_id,
          contract_id: selected[key].contract_id,
          flag_receita: selected[key].flag_receita,
          contract_time: selected[key].contract_time,
          selected_date: selected[key].selected_date,
          attach: {
            ll_attachs: [selected[key].attach]
          }
        }))
      }
    };

    if (email.email === "emailnao") {
      axios
        .post("evts/save_evt_not_email", params)
        .then(resp => {
          return resp.status === 200
            ? toastr.success("", "Atualizado com sucesso!")
            : toastr.info(resp.status);
        })
        .catch(err => {
          toastr.warning("Erro ao Salvar EVTs", `${err}`);
        });
      setOpen(false);
    } else setOpenModalEmail(true);
  };

  return (
    <Modal
      open={open}
      title="Pedido EVT"
      dimension="md"
      width="90vw"
      onClose={() => setOpen(false)}
      footer={
        <form className="form">
          <div
            className="col-sm-3"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <LabelComp text="Enviar E-mail:" />
            <label htmlFor="email">Sim</label>
            <Field
              name="email"
              component="input"
              type="radio"
              value="emailSim"
            />
            <label htmlFor="noEmail">Não</label>
            <Field
              name="email"
              component="input"
              type="radio"
              value="emailnao"
            />
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary btn-footer"
              onClick={() => {
                postEvt();
              }}
            >
              Continuar
            </button>
          </div>
        </form>
      }
      disableBtnClose
    >
      <div className="overlay-wrapper">
        <Overlay />
        <div style={{ height: "70vh" }}>
          <form>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ padding: "0px" }}></th>
                  {columnsPedidoEvt.map(column => (
                    <th
                      colSpan="1"
                      style={{
                        position: "relative",
                        userSelect: "none",
                        whiteSpace: "nowrap",
                        cursor: "pointer"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            minWidth: "0px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-end",
                            justifyContent: "flex-start"
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              flexDirection: "row",
                              alignItems: "center",
                              maxWidth: "100%",
                              userSelect: "none",
                              cursor: "pointer"
                            }}
                          >
                            <span
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                              }}
                            >
                              {column.title}
                            </span>
                          </span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(row => {
                  let prazoFidelizacao;
                  return (
                    <tr>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <input
                          onChange={event => {
                            event.persist();
                            if (event.target.checked) {
                              show_overlay();
                              get_contracts_by_vendor_id(row.id)
                                .then(res => {
                                  setContracts([
                                    ...contracts,
                                    {
                                      id: row.id,
                                      contratos: res.data
                                    }
                                  ]);
                                })
                                .catch(err => {
                                  toastr.warning(
                                    "Erro ao carregar contratos:",
                                    `${err}`
                                  );
                                })
                                .finally(() => {
                                  hide_overlay();
                                });
                            }
                            handleChange(
                              row.id,
                              "vendor_name",
                              row.name,
                              event.target.checked
                            );
                          }}
                          type="checkbox"
                          style={{
                            display: "inline-block",
                            cursor: "pointer",
                            margin: "0px"
                          }}
                        />
                      </td>
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "left"
                        }}
                      >
                        {row.provedor}
                      </td>
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "left"
                        }}
                      >
                        <div className="contrato">
                          {uniqWith(contracts, isEqual).map(contract => {
                            if (
                              contract.id === row.id &&
                              selected.hasOwnProperty(row.id)
                            ) {
                              return (
                                <select
                                  name="contracts"
                                  id="contracts"
                                  onChange={event => {
                                    handleChange(
                                      row.id,
                                      "contract_id",
                                      parseInt(event.target.value, 10),
                                      selected.hasOwnProperty(row.id)
                                    );
                                    contract.contratos.map(contrato => {
                                      if (
                                        parseInt(contrato.id, 10) ===
                                        parseInt(event.target.value, 10)
                                      ) {
                                        handleChange(
                                          row.id,
                                          "flag_receita",
                                          contrato.has_receita,
                                          selected.hasOwnProperty(row.id)
                                        );
                                      }
                                      return null;
                                    });
                                  }}
                                >
                                  <option>Selecione</option>
                                  {selected.hasOwnProperty(row.id) ? (
                                    contract.contratos.map(contrato => (
                                      <option value={contrato.id}>
                                        {contrato.contrato}
                                      </option>
                                    ))
                                  ) : (
                                    <></>
                                  )}
                                </select>
                              );
                            }
                            return <></>;
                          })}
                        </div>
                      </td>
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "left"
                        }}
                      ></td>
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "left"
                        }}
                      >
                        <div className="form-group">
                          <Select
                            data={
                              row.vendor_lpu !== undefined &&
                                row.vendor_lpu.colecao_prazo !== undefined
                                ? row.vendor_lpu.colecao_prazo
                                : []
                            }
                            onChange={event => {
                              prazoFidelizacao = event.target.value;
                              handleChange(
                                row.id,
                                "contract_time",
                                event.target.value,
                                selected.hasOwnProperty(row.id)
                              );
                            }}
                            disabled={!selected.hasOwnProperty(row.id)}
                            value={prazoFidelizacao}
                            valueKey="num_meses"
                            textKey="descricao"
                          />
                        </div>
                      </td>
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "left"
                        }}
                      >
                        {row.tipo}
                      </td>
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          textAlign: "left"
                        }}
                      >
                        <DateTimePicker
                          min={row.created_at !== null ? new Date(row.created_at) : new Date(null, null, null)}
                          onInput={e => {
                            e.target.value = "";
                            return e.target.value;
                          }}
                          placeholder="Selecione uma data"
                          onChange={value =>
                            handleChange(
                              row.id,
                              "selected_date",
                              value ? value.toLocaleDateString() : "",
                              selected.hasOwnProperty(row.id)
                            )
                          }
                          format="DD/MM/YYYY"
                          time={false}
                          disabled={!selected.hasOwnProperty(row.id)}
                        />
                      </td>
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "left"
                        }}
                      >
                        {selected.hasOwnProperty(row.id) && (
                          <UploadAnexo
                            selected={selected}
                            handleChange={handleChange}
                            vendor_id={row.id}
                            checked={selected.hasOwnProperty(row.id)}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </Modal>
  );
};

const formWrapper = reduxForm({
  form: "MultEvtsEmail",
  destroyOnUnmount: false
})(EscolhaVendor);

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ show_overlay, hide_overlay }, dispatch);
};

const mapStateToProps = state => ({
  auth: state.auth,
  email: get(state.form.MultEvtsEmail, "values"),
  initialValues: {
    email: "emailSim"
  },
  enableReinitialize: true
});

const LabelComp = ({ text, col }) => (
  <div className={`col-sm-${col}`}>
    <Label text={text} />
  </div>
);

LabelComp.defaultProps = { col: 6 };

function PropsAreEqual(prevProps, nextProps) {
  return (
    prevProps.email === nextProps.email &&
    prevProps.linhasSegselecionadas === nextProps.linhasSegselecionadas &&
    prevProps.linhasSegselecionadasParaBackend ===
    nextProps.linhasSegselecionadasParaBackend &&
    prevProps.open === nextProps.open
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(formWrapper, PropsAreEqual));
