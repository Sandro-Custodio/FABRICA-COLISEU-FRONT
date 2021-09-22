import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toastr } from "react-redux-toastr";
import { Grid } from "react-bootstrap";
import get from "lodash/get";
import Overlay from "common/msg/overlay/overlay";
import ModalForm from "common/layout/modal";
import Row from "common/layout/row";
import EditCircuit from "./EditCircuit";
import Table from 'react-bootstrap/lib/Table'

import {
  get_circuits_by_vendor,
  delete_bill_circ,
  delete_circuit_from_state,
  setEditCircuit,
  add_circuit_from_state
} from "./actions";

const BillsImport = props => {
  const {
    vendor_name,
    vendor_id,
    network,
    save_circuits_by_vendor,
    get_circuits_by_vendor,
    delete_bill_circ,
    delete_circuit_from_state,
    setEditCircuit,
    isBillsImportOpen,
    importarFaturaReducer,
    add_circuit_from_state
  } = props;

  useEffect(() => {
    if (isBillsImportOpen) {
      get_circuits_by_vendor(vendor_id, network);
    }
  }, [isBillsImportOpen, vendor_id, network, get_circuits_by_vendor]);

  const columns = [
    "Circuito",
    "Agrupador A",
    "Agrupador B",
    "Mensalidade A",
    "Mensalidade B"
  ];

  const [addedCircuits, setAddedCircuits] = React.useState([]);

  const checkCircuit = (circuit) => {
    let addedCircuits_aux = [...addedCircuits];
    const circuitNames = importarFaturaReducer?.circuits[0]?.map(el => el.circuito_id_clean);
    if (!circuitNames.includes(circuit.circuito_id_clean)) {
      addedCircuits_aux.push(circuit.circuito_id_clean);
      setAddedCircuits(addedCircuits_aux);
      add_circuit_from_state(circuit)
    }
    else {
      toastr.warning("Atenção", "NÃO FOI POSSÍVEL ADICIONAR O CIRCUITO.");
    }
  }


  return (
    <div className="overlay-wrapper">
      <Overlay />
      <Row>
        <span>PROVEDOR: </span>
        <input type="text" disabled value={vendor_name} />
      </Row>
      <div style={{ display: "flex", marginTop: "10px", marginBottom: "20px" }}>
        <h4>Circuitos a Faturar</h4>
        <h4 style={{ marginLeft: "530px" }}>Circuitos Base Física</h4>
      </div>
      <div className="box-body" style={{ display: "flex" }}>
        <diV style={{ marginRight: "60px" }}>
          <Row>
            <Table className="table">
              <thead>
                <tr>
                  <th style={{ padding: "0px" }}></th>
                  {columns.map(colum => (
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
                              {colum}
                            </span>
                          </span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {importarFaturaReducer?.circuits[0]?.map(circuit => (
                  <tr>
                    <td
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      <button
                        type="button"
                        className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                        onClick={() => {
                          const options = {
                            okText: "Excluir do Faturamento",
                            cancelText: "Não Faturar no mês",
                            onOk: () =>
                              !addedCircuits.includes(circuit.circuito_id_clean) ?
                                Promise.all([
                                  delete_bill_circ(circuit),
                                  delete_circuit_from_state(circuit)
                                ]) : delete_circuit_from_state(circuit),

                            onCancel: () => delete_circuit_from_state(circuit)
                          };
                          toastr.confirm("Escolha a ação!", options);
                        }}
                      >
                        <i className="fa fa-minus-circle" />
                      </button>
                    </td>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "left"
                      }}
                    >
                      <a
                        onClick={() => {
                          Promise.all([
                            setEditCircuit(circuit)
                          ]).finally(() => window.$("#modal_edit_circuit").modal("show"))
                        }}
                      >
                        {circuit.circuito_id_clean}
                      </a>
                    </td>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "left"
                      }}
                    >
                      {circuit.group_id_a}
                    </td>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "left"
                      }}
                    >
                      {circuit.group_id_b}
                    </td>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "left"
                      }}
                    >
                      {circuit.val_link_c_imp_a}
                    </td>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "left"
                      }}
                    >
                      {circuit.val_link_c_imp_b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </diV>

        <Row>
          <Table className="table">
            <thead>
              <tr>
                <th style={{ padding: "0px" }}></th>
                {columns.map(colum => (
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
                            {colum}
                          </span>
                        </span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {importarFaturaReducer?.circuits[1]?.map(circuit => (
                <tr>
                  <td
                    style={{ verticalAlign: "middle", textAlign: "center" }}
                  >
                    <button
                      type="button"
                      className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                      onClick={() => {
                        toastr.confirm("Confirmar Operação?", {
                          onOk: () =>
                            Promise.all([
                              checkCircuit(circuit)
                            ])
                        });
                      }}
                    >
                      <i className="fa fa-plus-circle" />
                    </button>
                  </td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "left"
                    }}
                  >
                    {circuit.circuito_id_clean}
                  </td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "left"
                    }}
                  >
                    {circuit.group_id_a}
                  </td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "left"
                    }}
                  >
                    {circuit.group_id_b}
                  </td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "left"
                    }}
                  >
                    {circuit.val_link_c_imp_a}
                  </td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "left"
                    }}
                  >
                    {circuit.val_link_c_imp_b}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </div>
      <ModalForm
        LabelButtonSubmit="Salvar"
        // handleClickBtnSubmit={() => {
        //   Promise.all([
        //     save_circuits_by_vendor(newCircuit, vendor?.id)
        //   ]).then(() =>
        //     get_circuits_by_vendor(vendor_id, network);
        //   );
        // }}
        id="modal_edit_circuit"
        title="Cadastro de Circuito para Faturamento"
        dimension="modal-lg"
      >
        <EditCircuit vendor_id={vendor_id} network={network} />
      </ModalForm>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { get_circuits_by_vendor, delete_bill_circ, delete_circuit_from_state, setEditCircuit, add_circuit_from_state },
    dispatch
  );
};

const mapStateToProps = state => ({
  importarFaturaReducer: state.importarFaturaReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(BillsImport);
