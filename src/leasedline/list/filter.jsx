/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DebounceInput } from "react-debounce-input";
import DropdownList from "react-widgets/lib/DropdownList";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import Row from "../../common/layout/row";
import Grid from "../../common/layout/grid";
import { changeFilterLL, changeTempFilterLL } from "./actions";

Moment.locale("en");
momentLocalizer();

const _ = require("lodash");

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localFilters: {}
    };
  }

  validateDataCriacao(data_ini, data_end) {
    const {
      ll_filters,
      ll_tempFilters,
      changeFilterLL,
      changeTempFilterLL
    } = this.props
    
    if (data_ini) {
      const d1 = _.get(ll_tempFilters, "created_at_end") ? _.get(ll_tempFilters, "created_at_end") : new Date();

      if (data_ini && _.get(ll_tempFilters, "created_at_end") == null || _.get(ll_tempFilters, "created_at_end") == undefined || (data_ini.getTime() > d1.getTime())) {
        return (
          changeTempFilterLL(
            { created_at_ini: data_ini, created_at_end: data_ini },
          ),
          changeFilterLL(
            { created_at_ini: data_ini.toLocaleDateString(), created_at_end: data_ini.toLocaleDateString() },
          )
        )
      } else {
        return (
          changeTempFilterLL(
            { created_at_ini: data_ini },
          ),
          changeFilterLL(
            { created_at_ini: data_ini.toLocaleDateString() },
          )
        )
      }
    }
    if (data_end) {
      const d2 = _.get(ll_tempFilters, "created_at_ini") ? _.get(ll_tempFilters, "created_at_ini") : new Date();

      if (data_end && _.get(ll_tempFilters, "created_at_ini") == null || _.get(ll_tempFilters, "created_at_ini") == undefined || (data_end.getTime() < d2.getTime())) {
        return (
          changeTempFilterLL(
            { created_at_ini: data_end, created_at_end: data_end },
          ),
          changeFilterLL(
            { created_at_ini: data_end.toLocaleDateString(), created_at_end: data_end.toLocaleDateString() },
          )
        )
      } else {
        return (
          changeTempFilterLL(
            { created_at_end: data_end },
          ),
          changeFilterLL(
            { created_at_end: data_end.toLocaleDateString() },
          )
        )
      }
    }
  }
  validateDataAtivacao(ativacao_ini, ativacao_end) {
    const {
      ll_filters,
      ll_tempFilters,
      changeFilterLL,
      changeTempFilterLL
    } = this.props
    
    if (ativacao_ini) {
      const t1 = _.get(ll_tempFilters, "ll_active_at_end") ? _.get(ll_tempFilters, "ll_active_at_end") : new Date();

      if (ativacao_ini && _.get(ll_tempFilters, "ll_active_at_end") == null || _.get(ll_tempFilters, "ll_active_at_end") == undefined || (ativacao_ini.getTime() > t1.getTime())) {
        return (
          changeTempFilterLL(
            { ll_active_at_ini: ativacao_ini, ll_active_at_end: ativacao_ini },
          ),
          changeFilterLL(
            { ll_active_at_ini: ativacao_ini.toLocaleDateString(), ll_active_at_end: ativacao_ini.toLocaleDateString() },
          )
        )
      } else {
        return (
          changeTempFilterLL(
            { ll_active_at_ini: ativacao_ini },
          ),
          changeFilterLL(
            { ll_active_at_ini: ativacao_ini.toLocaleDateString() },
          )
        )
      }
    }
    if (ativacao_end) {
      const t2 = _.get(ll_tempFilters, "ll_active_at_ini") ? _.get(ll_tempFilters, "ll_active_at_ini") : new Date();

      if (ativacao_end && _.get(ll_tempFilters, "ll_active_at_ini") == null || _.get(ll_tempFilters, "ll_active_at_ini") == undefined || (ativacao_end.getTime() < t2.getTime())) {
        return (
          changeTempFilterLL(
            { ll_active_at_ini: ativacao_end, ll_active_at_end: ativacao_end },
          ),
          changeFilterLL(
            { ll_active_at_ini: ativacao_end.toLocaleDateString(), ll_active_at_end: ativacao_end.toLocaleDateString() },
          )
        )
      } else {
        return (
          changeTempFilterLL(
            { ll_active_at_end: ativacao_end },
          ),
          changeFilterLL(
            { ll_active_at_end: ativacao_end.toLocaleDateString() },
          )
        )
      }
    }

  }

  render() {
    const {
      snoa_statuses,
      segment_statuses,
      evt_statuses,
      vendor,
      status_tracking,
      regional,
      ot_statuses,
      status,
      ll_filters,
      ll_tempFilters,
      changeFilterLL,
      changeTempFilterLL
    } = this.props;
    //const { localFilters } = this.state;

    /* if (
       Object.keys(ll_filters).length === 0 &&
       Object.keys(localFilters).length > 0
     ) {
       this.setState({
         localFilters: {}
       });
     } */

    console.log("ll_filters --->", ll_filters);
    console.log("ll_tempFilters --->", ll_tempFilters);

    return (
      <div className="box-body">
        <Row>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Status Snoa</label>
                    <DropdownList
                      // busy={reference.length === 0}
                      // busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={_.orderBy(snoa_statuses, ["description"], ["asc"])}
                      textField="snoa_statuses"
                      itemComponent={({ item }) => (
                        <span>{item.description}</span>
                      )}
                      placeholder="Selecione"
                      value={ll_filters.status_snoa || ""}
                      onChange={item => {
                        changeFilterLL({
                          status_snoa: item.description
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Segmento Status</label>
                    <DropdownList
                      // busy={reference.length === 0}
                      // busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={_.orderBy(
                        segment_statuses,
                        ["description"],
                        ["asc"]
                      )}
                      textField="segment_statuses"
                      /* valueComponent={({ item }) => (<span>{
                         ll_filters.status_id ?
                           item.description : <span style={{ color: "#8e8e8e", opacity: 1 }}>Selecione</span>
                       }</span>)} // substituir value por valueComponent */
                      itemComponent={({ item }) => (
                        <span>{item.description}</span>
                      )}
                      placeholder="Selecione"
                      value={_.get(ll_tempFilters, "status_id")}
                      onChange={item => {
                        /* this.setState({
                           localFilters: {
                             ...localFilters,
                             status_id: item.description
                           }
                         }); */
                        changeTempFilterLL({ status_id: item.description })
                        changeFilterLL({
                          status_id: [item.id]
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>EVT Status</label>
                    <DropdownList
                      // busy={reference.length === 0}
                      // busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={_.orderBy(evt_statuses, ["description"], ["asc"])}
                      textField="evt_statuses"
                      /* valueComponent={({ item }) => (<span>{
                         ll_filters.evt_status_id ?
                           item.description : <span style={{ color: "#8e8e8e", opacity: 1 }}>Selecione</span>
                       }</span>)} // substituir value por valueComponent */
                      itemComponent={({ item }) => (
                        <span>{item.description}</span>
                      )}
                      placeholder="Selecione"
                      value={_.get(ll_tempFilters, "evt_status_id")}
                      onChange={item => {
                        /* this.setState({
                           localFilters: {
                             ...localFilters,
                             evt_status_id: item.description
                           }
                         }); */
                        changeTempFilterLL({
                          evt_status_id: item.description
                        });
                        changeFilterLL({
                          evt_status_id: [item.id]
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Provedor</label>
                    <DropdownList
                      // busy={reference.length === 0}
                      // busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={_.orderBy(vendor, ["name"], ["asc"])}
                      textField="vendor"
                      /* valueComponent={({ item }) => (<span>{
                         ll_filters.vendor_id ?
                           item.name : <span style={{ color: "#8e8e8e", opacity: 1 }}>Selecione</span>
                       }</span>)} // substituir value por valueComponent */
                      itemComponent={({ item }) => <span>{item.name}</span>}
                      placeholder="Selecione"
                      value={_.get(ll_tempFilters, "vendor_id")}
                      onChange={item => {
                        /*this.setState({
                          localFilters: {
                            ...localFilters,
                            vendor_id: item.name
                          }
                        }); */
                        changeTempFilterLL({
                          vendor_id: item.name
                        });
                        changeFilterLL({
                          vendor_id: item.id
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
        </Row>
        <Row>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Status Tracking</label>
                    <DropdownList
                      // busy={reference.length === 0}
                      // busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={_.orderBy(
                        status_tracking,
                        ["description"],
                        ["asc"]
                      )}
                      textField="status_tracking"
                      /* valueComponent={({ item }) => (<span>{
                         ll_filters.status_tracking ?
                           item.description : <span style={{ color: "#8e8e8e", opacity: 1 }}>Selecione</span>
                       }</span>)} // substituir value por valueComponent */
                      itemComponent={({ item }) => (
                        <span>{item.description}</span>
                      )}
                      placeholder="Selecione"
                      value={_.get(ll_tempFilters, "status_tracking")}
                      onChange={item => {
                        /* this.setState({
                           localFilters: {
                             ...localFilters,
                             status_tracking: item.description
                           }
                         }); */
                        changeTempFilterLL({
                          status_tracking: item.description
                        });
                        changeFilterLL({
                          status_tracking: item.id
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Regional</label>
                    <DropdownList
                      // busy={reference.length === 0}
                      // busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={_.orderBy(regional, ["regional"], ["asc"])}
                      textField="regional"
                      /* valueComponent={({ item }) => (<span>{
                         ll_filters.operator_id ?
                           item.regional : <span style={{ color: "#8e8e8e", opacity: 1 }}>Selecione</span>
                       }</span>)} // substituir value por valueComponent */
                      itemComponent={({ item }) => (<span>{item.regional}</span>)}
                      placeholder="Selecione"
                      value={_.get(ll_tempFilters, "operator_id")}
                      onChange={item => {
                        /*this.setState({
                          localFilters: {
                            ...localFilters,
                            operator_id: item.description
                          }
                        }); */
                        changeTempFilterLL({
                          operator_id: item.regional
                        });
                        changeFilterLL({
                          operator_id: [item.id]
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Status OT</label>
                    <DropdownList
                      // busy={reference.length === 0}
                      // busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={_.orderBy(ot_statuses, ["description"], ["asc"])}
                      textField="ot_statuses"
                      /* valueComponent={({ item }) => (<span>{
                         ll_filters.ot_status ?
                           item.description : <span style={{ color: "#8e8e8e", opacity: 1 }}>Selecione</span>
                       }</span>)} // substituir value por valueComponent */
                      itemComponent={({ item }) => (
                        <span>{item.description}</span>
                      )}
                      placeholder="Selecione"
                      value={_.get(ll_tempFilters, "ot_status")}
                      onChange={item => {
                        /* this.setState({
                           localFilters: {
                             ...localFilters,
                             ot_status: item.description
                           }
                         }); */
                        changeTempFilterLL({
                          ot_status: item.description
                        });
                        changeFilterLL({
                          ot_status: [item.id]
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Status LL</label>
                    <DropdownList
                      // busy={reference.length === 0}
                      // busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={_.orderBy(status, ["description"], ["asc"])}
                      textField="status"
                      /* valueComponent={({ item }) => (<span>{
                         ll_filters.ll_status ?
                           item.description : <span style={{ color: "#8e8e8e", opacity: 1 }}>Selecione</span>
                       }</span>)} // substituir value por valueComponent */
                      itemComponent={({ item }) => (
                        <span>{item.description}</span>
                      )}
                      placeholder="Selecione"
                      value={_.get(ll_tempFilters, "ll_status")}
                      onChange={item => {
                        /*this.setState({
                          localFilters: {
                            ...localFilters,
                            ll_status: item.description
                          }
                        }); */
                        changeTempFilterLL({
                          ll_status: item.description
                        });
                        changeFilterLL({
                          ll_status: [item.id]
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
        </Row>
        <Row>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Rede</label>
                    <DropdownList
                      // busy={reference.length === 0}
                      // busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={[
                        { name: "MÓVEL" },
                        { name: "FIXA" },
                        { name: "FIBER" }
                      ]}
                      textField="name"
                      itemComponent={({ item }) => <span>{item.name}</span>}
                      placeholder="Selecione"
                      value={ll_filters.rede || ""}
                      onChange={item => {
                        changeFilterLL({
                          rede: item.name
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Bilhete SNOA</label>
                    <DropdownList
                      // busy={reference.length === 0}
                      // busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={[{ name: "Com Bilhete" }, { name: "Sem Bilhete" }]}
                      textField="name"
                      itemComponent={({ item }) => <span>{item.name}</span>}
                      placeholder="Selecione"
                      value={ll_filters.snoa_ticket_verification || ""}
                      onChange={item => {
                        changeFilterLL({
                          snoa_ticket_verification: item.name
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <Grid cols="12">
                  <label>LL Criada em:</label>
                </Grid>
                <Grid cols="6">
                  <DateTimePicker
                    value={_.get(ll_tempFilters, "created_at_ini")}
                    time={false}
                    format="DD/MM/Y"
                    placeholder="De:"
                    onChange={data_ini => {
                      this.validateDataCriacao(data_ini, null)
                    }}
                  />
                </Grid>
                <Grid cols="6">
                  <DateTimePicker
                    value={_.get(ll_tempFilters, "created_at_end")}
                    time={false}
                    format="DD/MM/Y"
                    placeholder="Até:"
                    onChange={data_end => {
                      this.validateDataCriacao(null, data_end)
                    }}
                  />
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <Grid cols="12">
                  <label>Ativada em:</label>
                </Grid>
                <Grid cols="6">
                  <DateTimePicker
                    value={_.get(ll_tempFilters, "ll_active_at_ini")}
                    time={false}
                    format="DD/MM/Y"
                    placeholder="De:"
                    onChange={ativacao_ini => {
                      this.validateDataAtivacao(ativacao_ini, null)
                    }}
                  />
                </Grid>
                <Grid cols="6">
                  <DateTimePicker
                    value={_.get(ll_tempFilters, "ll_active_at_end")}
                    time={false}
                    format="DD/MM/Y"
                    placeholder="Até:"
                    onChange={ativacao_end => {
                      this.validateDataAtivacao(null, ativacao_end)
                    }}
                  />
                </Grid>
              </div>
            </div>
          </Grid>
        </Row>
        <Row>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Múltiplos Códigos OT</label>
                    <DebounceInput
                      element="textarea"
                      debounceTimeout={800}
                      className="form-control"
                      rows="4"
                      cols="40"
                      value={ll_filters.ot_code?.replace(/\s/g, "") || ""}
                      onChange={event => {
                        changeFilterLL({
                          ot_code: event.target.value
                        });
                      }}
                      placeholder="Para filtrar múltiplos códigos, separe-os por ponto e vírgula(;) - Busca limitada à 100 OTs"
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Circuito ID</label>
                    <DebounceInput
                      element="textarea"
                      debounceTimeout={800}
                      className="form-control"
                      rows="4"
                      cols="40"
                      value={
                        ll_filters.circuit_id_multiple?.replace(/\s/g, "") || ""
                      }
                      onChange={event => {
                        changeFilterLL({
                          circuit_id_multiple: event.target.value
                        });
                      }}
                      placeholder="Para filtrar múltiplos, separe-os por ponto e vírgula(;)"
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Circuito ID Fatura</label>
                    <DebounceInput
                      element="textarea"
                      debounceTimeout={800}
                      className="form-control"
                      rows="4"
                      cols="40"
                      value={
                        ll_filters.id_circuit_bill?.replace(/\s/g, "") || ""
                      }
                      onChange={event => {
                        changeFilterLL({
                          id_circuit_bill: event.target.value
                        });
                      }}
                      placeholder="Para filtrar múltiplos, separe-os por ponto e vírgula(;)"
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>LL Guid</label>
                    <DebounceInput
                      element="textarea"
                      debounceTimeout={800}
                      className="form-control"
                      rows="4"
                      cols="40"
                      value={
                        ll_filters.ll_grid_multiple?.replace(/\s/g, "") || ""
                      }
                      onChange={event => {
                        changeFilterLL({
                          ll_grid_multiple: event.target.value
                        });
                      }}
                      placeholder="Para filtrar múltiplos, separe-os por ponto e vírgula(;)"
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
        </Row>
        <Row>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Leasedlines ID</label>
                    <DebounceInput
                      element="textarea"
                      debounceTimeout={800}
                      className="form-control"
                      rows="4"
                      cols="40"
                      value={ll_filters.ll_guids?.replace(/\s/g, "") || ""}
                      onChange={event => {
                        changeFilterLL({
                          ll_guids: event.target.value
                        });
                      }}
                      placeholder="Para filtrar múltiplos, separe-os por ponto e vírgula(;)"
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Bilhete SNOA</label>
                    <DebounceInput
                      element="textarea"
                      debounceTimeout={800}
                      className="form-control"
                      rows="4"
                      cols="40"
                      value={
                        ll_filters.snoa_ticket_multiple?.replace(/\s/g, "") ||
                        ""
                      }
                      onChange={event => {
                        changeFilterLL({
                          snoa_ticket_multiple: event.target.value
                        });
                      }}
                      placeholder="Para filtrar múltiplos, separe-os por ponto e vírgula(;)"
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Work Order</label>
                    <DebounceInput
                      element="textarea"
                      debounceTimeout={800}
                      className="form-control"
                      rows="4"
                      cols="40"
                      value={ll_filters.work_order?.replace(/\s/g, "") || ""}
                      onChange={event => {
                        changeFilterLL({
                          work_order: event.target.value
                        });
                      }}
                      placeholder="Para filtrar múltiplos, separe-os por ponto e vírgula(;)"
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>OS ID</label>
                    <DebounceInput
                      element="textarea"
                      debounceTimeout={800}
                      className="form-control"
                      rows="4"
                      cols="40"
                      value={ll_filters.os_id?.replace(/\s/g, "") || ""}
                      onChange={event => {
                        changeFilterLL({
                          os_id: event.target.value
                        });
                      }}
                      placeholder="Para filtrar múltiplos, separe-os por ponto e vírgula(;)"
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
        </Row>
        <Row>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <Grid cols="12">
                      <label>Ponta A / B</label>
                    </Grid>
                    <Grid cols="6">
                      <DebounceInput
                        debounceTimeout={800}
                        className="form-control"
                        value={ll_filters.element_a_id || ""}
                        onChange={event => {
                          changeFilterLL({
                            element_a_id: event.target.value
                          });
                        }}
                        placeholder="Ponta A"
                      />
                    </Grid>
                    <Grid cols="6">
                      <DebounceInput
                        debounceTimeout={800}
                        className="form-control"
                        value={ll_filters.element_b_id || ""}
                        onChange={event => {
                          changeFilterLL({
                            element_b_id: event.target.value
                          });
                        }}
                        placeholder="Ponta B"
                      />
                    </Grid>
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <Grid cols="12">
                      <label>Endereço A / B</label>
                    </Grid>
                    <Grid cols="6">
                      <DebounceInput
                        debounceTimeout={800}
                        className="form-control"
                        value={ll_filters.element_a_endereco || ""}
                        onChange={event => {
                          changeFilterLL({
                            element_a_endereco: event.target.value
                          });
                        }}
                        placeholder="Endereço A"
                      />
                    </Grid>
                    <Grid cols="6">
                      <DebounceInput
                        debounceTimeout={800}
                        className="form-control"
                        value={ll_filters.element_b_endereco || ""}
                        onChange={event => {
                          changeFilterLL({
                            element_b_endereco: event.target.value
                          });
                        }}
                        placeholder="Endereço B"
                      />
                    </Grid>
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Rota Nome</label>
                    <DebounceInput
                      element="textarea"
                      debounceTimeout={800}
                      className="form-control"
                      rows="1"
                      cols="40"
                      value={ll_filters.rota_nome || ""}
                      onChange={event => {
                        changeFilterLL({
                          rota_nome: event.target.value
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Rota Número</label>
                    <DebounceInput
                      element="textarea"
                      debounceTimeout={800}
                      className="form-control"
                      rows="1"
                      cols="40"
                      value={ll_filters.rota_numero || ""}
                      onChange={event => {
                        changeFilterLL({
                          rota_numero: event.target.value
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
        </Row>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeFilterLL, changeTempFilterLL }, dispatch);
const mapStateToProps = state => ({
  snoa_statuses: state.listarLL.snoa_statuses,
  segment_statuses: state.listarLL.segment_statuses,
  evt_statuses: state.listarLL.evt_statuses,
  vendor: state.listarLL.vendor,
  status_tracking: state.listarLL.status_tracking,
  regional: state.listarLL.regional,
  ot_statuses: state.listarLL.ot_statuses,
  status: state.listarLL.status,
  ll_filters: state.listarLL.ll_filters,
  ll_tempFilters: state.listarLL.ll_tempFilters
});
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
