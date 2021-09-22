/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
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
import Row from "../common/layout/row";
import Grid from "../common/layout/grid";
import { changeFilterOT, changeTempFilterOT } from "./actions";
import { objectOf } from "prop-types";

Moment.locale("en");
momentLocalizer();

const _ = require("lodash");

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      velocidade: "0",
      unit: "Kbps",
      localFilters: {},
      possuiEvt: false,
      filteredSubProjects: []
    };
  }

  componentDidUpdate(prevProps, nextProps) {
    const { sub_projects, filters } = this.props;
    const { filteredSubProjects } = this.state;

    // remove blank spaces
    if (filters.ot_list) {
      filters.ot_list = filters.ot_list.replace(/\s/g, "");
    }
    if (filters.circuit_id_list) {
      filters.circuit_id_list = filters.circuit_id_list.replace(/\s/g, "");
    }
    if (filters.element_list) {
      filters.element_list = filters.element_list.replace(/\s/g, "");
    }
    if (
      sub_projects &&
      filteredSubProjects.length === 0 &&
      nextProps.filteredSubProjects !== sub_projects
    ) {
      this.setState({
        filteredSubProjects: sub_projects
      });
    }

    if (filters.project_id !== prevProps.filters.project_id) {
      let localFilteredSubProjects = [];

      localFilteredSubProjects = sub_projects.filter(subProject => {
        return subProject.parent_id === filters.project_id;
      });

      this.setState({
        filteredSubProjects: localFilteredSubProjects
      });
    }
  }

  LLChecked = segSolucao => {
    if (segSolucao.toString() === "LL") {
      this.setState({
        possuiEvt: true
      });
    } else {
      this.setState({
        possuiEvt: false
      });
    }
  };

  format_speed = async () => {
    const { unit } = this.state;
    const { velocidade } = await this.state;
    const { changeFilterOT } = this.props;
    let speed = `${Number(velocidade)} ${unit}`;
    speed = speed.replace("NaN", "");
    if (speed.trim().split(" ").length === 2 && velocidade > 0) {
      changeFilterOT({ speed_name: speed });
    } else {
      changeFilterOT({ speed_name: null });
    }
  };

  changeValueAndFormatSpeed = async state => {
    await this.setState(state);
    this.format_speed();
  };

  getit = () => {
    var select =
      document.querySelector('input[name="evt"]:checked').value != null
        ? document.querySelector('input[name="evt"]:checked').value
        : " ";
    // console.log("!!!!!!!", select);
  };

  render() {
    const {
      ot_types,
      areas,
      projects,
      operators,
      sub_projects,
      projeto_one,
      response_areas,
      element_types,
      ot_status,
      ot_segment_status,
      reference,
      finality,
      filters,
      tempFilters,
      changeFilterOT,
      changeTempFilterOT
    } = this.props;
    const { localFilters, possuiEvt, filteredSubProjects } = this.state;

   /* if (
      Object.keys(filters).length === 0 &&
      Object.keys(localFilters).length > 0
    ) {
      this.setState({
        localFilters: {}
      });
    } */

    // console.log("!!!!!", document.getElementsByName("evt"));
    // document.getElementsByName("evt").forEach(radio => {
    //   console.log("!!!!!", radio);
    //   if (radio.checked) {
    //     console.log("!!!!!", radio.value);
    //   }
    // });

    // var rad = document.myForm.evt;
    // var prev = null;
    // for (var i = 0; i < rad.length; i++) {
    //   rad[i].addEventListener("change", function() {
    //     prev ? console.log(prev.value) : null;
    //     if (this !== prev) {
    //       prev = this;
    //     }
    //     console.log(this.value);
    //   });
    // }

    let years = sub_projects.map(item => {
      return { year: item.year };
    });
    years = years.filter((item, i) => {
      const tempArrYears = years.map(item => {
        return item.year;
      });
      return tempArrYears.indexOf(tempArrYears[i]) === i;
    });
    return (
      <div className="box-body">
        <Row>
          <Grid cols="12 4">
            <div className="box box-danger">
              <div className="box-header with-border">
                <h3 className="box-title">Ot Solicitada em:</h3>
              </div>
              <div className="box-body">
                <Grid cols="6">
                  <DateTimePicker
                    value={_.get(tempFilters, "created_at_start")}
                    time={false}
                    format="DD/MM/Y"
                    placeholder="INICIAL"
                    onChange={value => {
                     /* this.setState({
                        localFilters: {
                          ...localFilters,
                          created_at_start: value
                        }
                      }); */
                      changeTempFilterOT({
                        created_at_start: value
                        ? value
                        : null
                      })
                      changeFilterOT({
                        created_at_start: value
                          ? value.toLocaleDateString()
                          : null
                      });
                    }}
                  />
                </Grid>
                <Grid cols="6">
                  <DateTimePicker
                    value={_.get(tempFilters, "created_at_end")}
                    time={false}
                    format="DD/MM/Y"
                    placeholder="FINAL"
                    onChange={value => {
                      /*this.setState({
                        localFilters: {
                          ...localFilters,
                          created_at_end: value
                        }
                      });*/
                      changeTempFilterOT({
                        created_at_end: value
                        ? value
                        : null
                      })
                      changeFilterOT({
                        created_at_end: value
                          ? value.toLocaleDateString()
                          : null
                      });
                    }}
                  />
                </Grid>
              </div>
            </div>
          </Grid>

          <Grid cols="12 4">
            <div className="box box-danger">
              <div className="box-header with-border">
                <h3 className="box-title">Ativação desejada da Ot:</h3>
              </div>
              <div className="box-body">
                <Grid cols="6">
                  <DateTimePicker
                    value={_.get(tempFilters, "activated_at_start")}
                    time={false}
                    format="DD/MM/Y"
                    placeholder="INICIAL"
                    onChange={value => {
                      /*this.setState({
                        localFilters: {
                          ...localFilters,
                          activated_at_start: value
                        }
                      }); */
                      changeTempFilterOT({
                        activated_at_start: value
                          ? value
                          : null
                      });
                      changeFilterOT({
                        activated_at_start: value
                          ? value.toLocaleDateString()
                          : null
                      });
                    }}
                  />
                </Grid>
                <Grid cols="6">
                  <DateTimePicker
                    value={_.get(tempFilters, "activated_at_end")}
                    time={false}
                    format="DD/MM/Y"
                    placeholder="FINAL"
                    onChange={value => {
                     /* this.setState({
                        localFilters: {
                          ...localFilters,
                          activated_at_end: value
                        }
                      }); */
                      changeTempFilterOT({
                        activated_at_end: value
                          ? value
                          : null
                      });
                      changeFilterOT({
                        activated_at_end: value
                          ? value.toLocaleDateString()
                          : null
                      });
                    }}
                  />
                </Grid>
              </div>
            </div>
          </Grid>

          <Grid cols="12 4">
            <div className="box box-danger">
              <div className="box-header with-border">
                <h3 className="box-title">Segmento cadastrado:</h3>
              </div>
              <div className="box-body">
                <Grid cols="6">
                  <DateTimePicker
                    value={_.get(tempFilters, "segment_created_at_start")}
                    time={false}
                    format="DD/MM/Y"
                    placeholder="INICIAL"
                    onChange={value => {
                     /* this.setState({
                        localFilters: {
                          ...localFilters,
                          segment_created_at_start: value
                        }
                      }); */
                      changeTempFilterOT({
                        segment_created_at_start: value
                          ? value
                          : null
                      });
                      changeFilterOT({
                        segment_created_at_start: value
                          ? value.toLocaleDateString()
                          : null
                      });
                    }}
                  />
                </Grid>
                <Grid cols="6">
                  <DateTimePicker
                    value={_.get(tempFilters, "segment_created_at_end")}
                    time={false}
                    format="DD/MM/Y"
                    placeholder="FINAL"
                    onChange={value => {
                     /* this.setState({
                        localFilters: {
                          ...localFilters,
                          segment_created_at_end: value
                        }
                      }); */
                      changeTempFilterOT({
                        segment_created_at_end: value
                          ? value
                          : null
                      });
                      changeFilterOT({
                        segment_created_at_end: value
                          ? value.toLocaleDateString()
                          : null
                      });
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
                      rows="5"
                      cols="40"
                      value={filters.ot_list || ""}
                      onChange={event => {
                        changeFilterOT({
                          ot_list: event.target.value
                        });
                      }}
                      placeholder="Para filtrar múltiplos códigos, separe-os por ponto e vírgula( ; ) - Busca limitada à 100 OTs"
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
                    <label>Código OT</label>
                    <DebounceInput
                      debounceTimeout={800}
                      className="form-control"
                      placeholder="Código OT"
                      value={filters.codOt || ""}
                      onChange={event =>
                        changeFilterOT({ codOt: event.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Rede</label>
                    <DropdownList
                      data={[{ name: "MÓVEL" }, { name: "FIXA" }]}
                      textField="name"
                      itemComponent={({ item }) => <span>{item.name}</span>}
                      placeholder="Rede"
                      value={filters.network || ""}
                      onChange={item => {
                        changeFilterOT({ network: item.name });
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
                    <label>Referência</label>
                    <DropdownList
                      busy={reference.length === 0}
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={reference}
                      textField="referencia"
                      itemComponent={({ item }) => (
                        <span>{item.referencia}</span>
                      )}
                      placeholder="Referência"
                      value={filters.referencia || ""}
                      onChange={item => {
                        changeFilterOT({
                          referencia: item.referencia
                        });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Intercompany</label>
                    <DropdownList
                      data={[{ name: "TIM FIBER/INTELIG" }, { name: "TIM" }]}
                      textField="name"
                      itemComponent={({ item }) => <span>{item.name}</span>}
                      placeholder="Intercompany"
                      value={filters.intercompany || ""}
                      onChange={item => {
                        changeFilterOT({ intercompany: item.name });
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
                    <label>OT Status</label>
                    <DropdownList
                      busy={ot_status.length === 0}
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={ot_status}
                      textField="description"
                     /* valueComponent={({ item }) => (<span>{
                        filters.ot_status_id ?
                          item.description : <span style={{ color: "#8e8e8e", opacity: 1 }}>OT Status</span>
                      }</span>)} // substituir value por valueComponent */
                      itemComponent={({ item }) => (
                        <span>{item.description}</span>
                      )}
                      placeholder="OT Status"
                      value={tempFilters.ot_status_id || ""}
                      onChange={item => {
                       /* this.setState({
                          localFilters: {
                            ...localFilters,
                            ot_status_id: item.description
                          }
                        }); */
                        changeTempFilterOT({ ot_status_id: item.description });
                        changeFilterOT({ ot_status_id: item.id });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status do Projeto E2E</label>
                    <DropdownList
                      data={[
                        { name: "Pendente" },
                        { name: "Concluído" },
                        { name: "Aguardando Mux/Tellabs" }
                      ]}
                      textField="name"
                      itemComponent={({ item }) => <span>{item.name}</span>}
                      placeholder="Status do Projeto E2E"
                      value={filters.e2estatus || ""}
                      onChange={item => {
                        changeFilterOT({ e2estatus: item.name });
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
                    <label>Circuitos ID</label>
                    <DebounceInput
                      element="textarea"
                      debounceTimeout={800}
                      className="form-control"
                      rows="5"
                      cols="40"
                      value={filters.circuit_id_list || ""}
                      onChange={event => {
                        changeFilterOT({
                          circuit_id_list: event.target.value
                        });
                      }}
                      placeholder="Para filtrar múltiplos circuitos, separe-os por ponto e vírgula( ; )"
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
                    <label>Projetos</label>
                    <DropdownList
                      busy={projects.length === 0}
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={projects}
                      valueComponent={({ item }) => (
                        <span>
                          {filters.project_id
                            ? `${item.year ? "[" + item.year + "]" : ""} ${item.name
                            }`
                            : <span style={{ color: "#8e8e8e", opacity: 1 }}>Projetos</span>}
                        </span>
                      )}
                      itemComponent={({ item }) => (
                        <span>{`${item.year ? "[" + item.year + "]" : ""} ${item.name
                          }`}</span>
                      )}
                      placeholder="Projetos"
                      onChange={item => {
                       /* this.setState({
                          localFilters: {
                            ...localFilters,
                            project_name: item.name
                          }
                        }); */
                        delete filters.subproject_id;
                        changeFilterOT({ project_id: item.id });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Segmento Tipo</label>
                    <DropdownList
                      busy={ot_types.length === 0}
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={ot_types}
                      textField="name"
                      valueComponent={({ item }) => (<span>{
                        filters.segment_type_id ?
                          item.name : <span style={{ color: "#8e8e8e", opacity: 1 }}>Segmento Tipo</span>
                      }</span>)} // substituir value por valueComponent
                      itemComponent={({ item }) => <span>{item.name}</span>}
                      placeholder="Segmento Tipo"
                      //value={localFilters.segment_type_id || ""}
                      onChange={item => {
                       /* this.setState({
                          localFilters: {
                            ...localFilters,
                            segment_type_id: item.name
                          }
                        }); */
                        changeFilterOT({ segment_type_id: item.id });
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
                    <label>Subprojeto</label>
                    <DropdownList
                      busy={filteredSubProjects.length === 0}
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={filteredSubProjects}
                      valueComponent={({ item }) => (
                        <span>
                          {filters.subproject_id
                            ? `${item.year ? "[" + item.year + "]" : ""} ${item.name
                            }`
                            : <span style={{ color: "#8e8e8e", opacity: 1 }}>Subprojeto</span>}
                        </span>
                      )}
                      itemComponent={({ item }) => (
                        <span>{`${item.year ? "[" + item.year + "]" : ""} ${item.name
                          }`}</span>
                      )}
                      placeholder="Subprojeto"
                      onChange={item => {
                       /* this.setState({
                          localFilters: {
                            ...localFilters,
                            ot_name: item.name
                          }
                        }); */
                        changeFilterOT({ subproject_id: item.id });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Segmento Solução</label>
                    <DropdownList
                      data={[
                        { name: "Sem solução" },
                        { name: "FACILITY" },
                        { name: "LL" },
                        { name: "FO" },
                        { name: "BBIP" },
                        { name: "MUX" },
                        { name: "MW" },
                        { name: "SAT" }
                      ]}
                      textField="name"
                      itemComponent={({ item }) => <span>{item.name}</span>}
                      placeholder="Segmento Solução"
                      value={filters.segment_solution || ""}
                      onChange={item => {
                        changeFilterOT({
                          segment_solution: item.name
                        });
                        this.LLChecked(item.name);
                      }}
                    />
                    {filters.segment_solution === "LL" && (
                      <Row>
                        <div className="radio">
                          <label>
                            <input
                              type="radio"
                              value={this.possuiEvt}
                              name="evt"
                              onChange={() => {
                                changeFilterOT({
                                  evt: true
                                });
                              }}
                            />
                            Possuam EVT
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input
                              type="radio"
                              value={this.possuiEvt}
                              name="evt"
                              onChange={() => {
                                changeFilterOT({
                                  evt: false
                                });
                              }}
                            />
                            Não Possuam EVT
                          </label>
                        </div>
                      </Row>
                    )}
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
                    <label>Ano</label>
                    <DropdownList
                      busy={
                        years === null ||
                        years === undefined ||
                        (Array.isArray(years) && years.length === 0)
                      }
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={years}
                      textField="year"
                      itemComponent={({ item }) => <span>{item.year}</span>}
                      placeholder="Ano"
                      value={filters.ot_year || ""}
                      onChange={item => {
                        changeFilterOT({ ot_year: item.year });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Segmento Status</label>
                    <DropdownList
                      busy={ot_segment_status.length === 0}
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={ot_segment_status}
                      textField="description"
                      valueComponent={({ item }) => (<span>{
                        filters.segment_status_id ?
                          item.description : <span style={{ color: "#8e8e8e", opacity: 1 }}>Segmento Status</span>
                      }</span>)} // substituir value por valueComponent
                      itemComponent={({ item }) => (
                        <span>{item.description}</span>
                      )}
                      placeholder="Segmento Status"
                      //value={localFilters.segment_status_id || ""}
                      onChange={item => {
                       /* this.setState({
                          localFilters: {
                            ...localFilters,
                            segment_status_id: item.description
                          }
                        });*/
                        changeFilterOT({
                          segment_status_id: item.id
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
                    <label>Tipo LL</label>
                    <DropdownList
                      data={[
                        { name: "LL" },
                        { name: "LL ADSL" },
                        { name: "LL SATELITE" },
                        { name: "UPGRADE" }
                      ]}
                      value={filters.type_solution_ll || ""}
                      textField="name"
                      itemComponent={({ item }) => <span>{item.name}</span>}
                      placeholder="Tipo LL"
                      onChange={item => {
                        changeFilterOT({
                          type_solution_ll: item.name
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          {/* <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Projeto FNIM</label>
                    <DropdownList
                      data={[
                        { id: 1, label: "Projeto Encaminhado" },
                        { id: 2, label: "Construção de Rede" },
                        { id: 3, label: "Instalação de Equipamento" },
                        { id: 4, label: "Aprovação de Projeto" },
                        { id: 5, label: "Transferência de Material" },
                        { id: 6, label: "Configuração" },
                        { id: 7, label: "Aguardando Liberação de Acesso" },
                        { id: 8, label: "Teste" }
                      ]}
                      textField="label"
                      itemComponent={({ item }) => <span>{item.label}</span>}
                      placeholder="Projeto FNIM"
                      value={localFilters.projetoFnim || ""}
                      onChange={item => {
                        this.setState({
                          localFilters: {
                            ...localFilters,
                            projetoFnim: item.label
                          }
                        });
                        // changeFilterOT({ key: item.id });
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Grid> */}
          <Grid cols="12 3">
            <div className="box box-danger">
              <div className="box-body">
                <form>
                  <div className="form-group">
                    <label>Projeto TX</label>
                    <DropdownList
                      busy={projeto_one.length === 0}
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      filter
                      data={projeto_one}
                      textField="projeto_one"
                      itemComponent={({ item }) => (
                        <span>{item.projeto_one}</span>
                      )}
                      value={filters.proj_tx || ""}
                      placeholder="Projeto TX"
                      onChange={item => {
                        changeFilterOT({
                          proj_tx: item.projeto_one
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
                    <label>Área Solicitante</label>
                    <DropdownList
                      busy={areas.length === 0}
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={areas}
                      textField="code"
                      valueComponent={({ item }) => (<span>{
                        filters.requestor_area_code ?
                          item.code : <span style={{ color: "#8e8e8e", opacity: 1 }}>Área Solicitante</span>
                      }</span>)} // substituir value por valueComponent
                      itemComponent={({ item }) => (
                        <span>{`${item.code} - ${item.name}`}</span>
                      )}
                      placeholder="Área Solicitante"
                      //value={localFilters.requestor_area_code || ""}
                      onChange={item => {
                       /* this.setState({
                          localFilters: {
                            ...localFilters,
                            requestor_area_code: `${item.code} - ${item.name}`
                          }
                        });*/
                        changeFilterOT({
                          requestor_area_code: item.code
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
                    <label>Posto Responsável</label>
                    <DropdownList
                      busy={response_areas.length === 0}
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      filter
                      data={response_areas}
                      textField="code"
                      valueComponent={({ item }) => (<span>{
                        filters.pstRespId ?
                          item.code : <span style={{ color: "#8e8e8e", opacity: 1 }}>Posto Responsável</span>
                      }</span>)} // substituir value por valueComponent
                      itemComponent={({ item }) => <span>{item.code}</span>}
                      placeholder="Posto Responsável"
                      //value={localFilters.pstRespId || ""}
                      onChange={item => {
                        /* this.setState({
                          localFilters: {
                            ...localFilters,
                            pstRespId: item.code
                          }
                        });m */
                        changeFilterOT({
                          pstRespId: item.id
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
                    <label>Frequência</label>
                    <DebounceInput
                      debounceTimeout={800}
                      className="form-control"
                      placeholder="Frequência"
                      value={filters.frequencia || ""}
                      onChange={event =>
                        changeFilterOT({
                          frequencia: event.target.value
                        })
                      }
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
                    <label>Elementos Múltiplos</label>
                    <DebounceInput
                      element="textarea"
                      debounceTimeout={800}
                      className="form-control"
                      rows="5"
                      cols="40"
                      value={filters.element_list || ""}
                      onChange={event => {
                        changeFilterOT({
                          element_list: event.target.value
                        });
                      }}
                      placeholder="Para filtrar múltiplos elementos, separe-os por ponto e vírgula(;)"
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
                      busy={operators.length === 0}
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={operators}
                      textField="regional"
                      valueComponent={({ item }) => (<span>{
                        filters.regional_id ?
                          item.regional : <span style={{ color: "#8e8e8e", opacity: 1 }}>Regional</span>
                      }</span>)} // substituir value por valueComponent
                      itemComponent={({ item }) => <span>{item.regional}</span>}
                      placeholder="Regional"
                      //value={localFilters.regional_id || ""}
                      onChange={item => {
                        /* this.setState({
                          localFilters: {
                            ...localFilters,
                            regional_id: item.regional
                          }
                        }); */
                        changeFilterOT({ regional_id: item.id });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tipo Elemento A</label>
                    <DropdownList
                      busy={element_types.length === 0}
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={element_types}
                      textField="element_type"
                      itemComponent={({ item }) => (
                        <span>{item.element_type}</span>
                      )}
                      placeholder="Tipo Elemento A"
                      value={filters.element_type_a || ""}
                      onChange={item => {
                        changeFilterOT({ element_type_a: item.element_type });
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
                    <label>Finalidade</label>
                    <DropdownList
                      busy={finality.length === 0}
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={finality}
                      textField="name"
                      valueComponent={({ item }) => (<span>{
                        filters.finality_id ?
                          item.name : <span style={{ color: "#8e8e8e", opacity: 1 }}>Finalidade</span>
                      }</span>)} // substituir value por valueComponent
                      itemComponent={({ item }) => <span>{item.name}</span>}
                      placeholder="Finalidade"
                      //value={localFilters.finality_id || ""}
                      onChange={item => {
                       /* this.setState({
                          localFilters: {
                            ...localFilters,
                            finality_id: item.name
                          }
                        }); */
                        changeFilterOT({ finality_id: item.id });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tipo Elemento B</label>
                    <DropdownList
                      busy={element_types.length === 0}
                      busySpinner={<span className="fa fa-refresh fa-spin" />}
                      data={element_types}
                      textField="element_type"
                      itemComponent={({ item }) => (
                        <span>{item.element_type}</span>
                      )}
                      placeholder="Tipo Elemento B"
                      value={filters.element_type_b || ""}
                      onChange={item => {
                        changeFilterOT({ element_type_b: item.element_type });
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
                    <Grid cols="12">
                      <label>Velocidade</label>
                    </Grid>
                    <Grid cols="6">
                      <DebounceInput
                        type="number"
                        debounceTimeout={800}
                        className="form-control"
                        value={
                          (_.get(filters, "speed_name") &&
                            filters.speed_name.split(" ")[0].trim()) ||
                          "0"
                        }
                        onChange={event => {
                          this.changeValueAndFormatSpeed({
                            velocidade: event.target.value
                          });
                        }}
                        placeholder="Velocidade"
                      />
                    </Grid>
                    <Grid cols="6">
                      <DropdownList
                        data={["Kbps", "Mbps", "Gbps"]}
                        itemComponent={({ item }) => <span>{item}</span>}
                        value={
                          (_.get(filters, "speed_name") &&
                            filters.speed_name.split(" ")[1].trim()) ||
                          "Kbps"
                        }
                        onChange={value => {
                          this.changeValueAndFormatSpeed({ unit: value });
                        }}
                      />
                    </Grid>
                  </div>
                  <div className="form-group">
                    <Grid cols="12">
                      <label>Elemento A ou B</label>
                    </Grid>
                    <Grid cols="6">
                      <DebounceInput
                        debounceTimeout={800}
                        className="form-control"
                        value={filters.element_id_a || ""}
                        onChange={event => {
                          changeFilterOT({
                            element_id_a: event.target.value
                          });
                        }}
                        placeholder="Elemento A"
                      />
                    </Grid>
                    <Grid cols="6">
                      <DebounceInput
                        debounceTimeout={800}
                        className="form-control"
                        value={filters.element_id_b || ""}
                        onChange={event => {
                          changeFilterOT({
                            element_id_b: event.target.value
                          });
                        }}
                        placeholder="Elemento B"
                      />
                    </Grid>
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
                      <label>Endereço A ou B</label>
                    </Grid>
                    <Grid cols="6">
                      <DebounceInput
                        debounceTimeout={800}
                        className="form-control"
                        value={filters.address_id_a || ""}
                        onChange={event => {
                          changeFilterOT({
                            address_id_a: event.target.value
                          });
                        }}
                        placeholder="Endereço A"
                      />
                    </Grid>
                    <Grid cols="6">
                      <DebounceInput
                        debounceTimeout={800}
                        className="form-control"
                        value={filters.address_id_b || ""}
                        onChange={event => {
                          changeFilterOT({
                            address_id_b: event.target.value
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
                    <Grid cols="12">
                      <label>Rota Nome</label>
                    </Grid>
                    <Grid cols="12">
                      <DebounceInput
                        debounceTimeout={800}
                        className="form-control"
                        value={filters.route_name || ""}
                        onChange={event => {
                          changeFilterOT({
                            route_name: event.target.value
                          });
                        }}
                        placeholder="Rota Nome"
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
                      <label>Rota Número</label>
                    </Grid>
                    <Grid cols="12">
                      <DebounceInput
                        debounceTimeout={800}
                        className="form-control"
                        value={filters.route_number || ""}
                        onChange={event => {
                          changeFilterOT({
                            route_number: event.target.value
                          });
                        }}
                        placeholder="Rota Número"
                      />
                    </Grid>
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
  bindActionCreators({ changeFilterOT, changeTempFilterOT }, dispatch);
const mapStateToProps = state => ({
  areas: state.ot.areas,
  ot_types: state.ot.ot_types,
  filters: state.ot.filters,
  tempFilters: state.ot.tempFilters,
  element_types: state.ot.element_types,
  operators: state.ot.operators,
  response_areas: state.ot.response_areas,
  ot_status: state.ot.ot_status,
  ot_segment_status: state.ot.ot_segment_status,
  projects: state.ot.projects,
  sub_projects: state.ot.sub_projects,
  projeto_one: state.ot.projeto_one,
  finality: state.ot.finality,
  reference: state.ot.reference,
  speeds: state.ot.speeds,
  ot_redundancies: state.ot.ot_redundancies,
  frequencia: state.ot.ot_redundancies
});
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
