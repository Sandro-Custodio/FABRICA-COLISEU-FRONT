/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import ModalFormOT from "../layout/modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { logUserMenuAccess } from '../../../auth/actions'
import { DebounceInput } from "react-debounce-input";
import { toastr } from "react-redux-toastr";
import "react-widgets/dist/css/react-widgets.css";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import Row from "../layout/row";
import Grid from "../layout/grid";
import { saveNewDemand } from "./actions";

Moment.locale("en");
momentLocalizer();


class DemandComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            descriptionLimit: 80
        };
    }

    submitForm = (values) => {
        const {
            saveNewDemand
        } = this.props;
        saveNewDemand(values);
    };

    handleSaveSubmit = () => {
        const { description, descriptionLimit } = this.state;

        if (description.length <= 0) {
            toastr.info("PREENCHA O CAMPO CORRETAMENTE.");
        } else if (description.length > descriptionLimit) {
            toastr.info("LIMITE DE CARACTERES ATINGINDO.");
        } else {
            //console.log("td okay!")
            const values = description.toUpperCase()
            this.submitForm(values);
            this.setState({
                description: ""
            })
        }
    };

    render() {
        const { description, descriptionLimit } = this.state
        return (
            <React.Fragment>
                <button
                    type="button"
                    data-toggle="modal"
                    data-target="#demanda-de-classificacaoListOt"
                    data-for="top_dark_float"
                    data-tip="Nova Classificação de Demanda"
                    className="btn-lg btn-link pull-left"
                    onClick={() => { }}
                >
                    <i
                        className="fa fa-plus"
                        data-toggle="tooltip"
                    //title="Incluir Demanda"
                    />
                </button>
                <ReactTooltip
                    id="top_dark_float"
                    place="top"
                    type="dark"
                    effect="float"
                />
                <ModalFormOT
                    LabelButtonSubmit="SALVAR"
                    //handleClickBtnSubmit={() => this.handleSaveSubmit()}
                    id="demanda-de-classificacaoListOt"
                    title="Classificação de Demanda"
                    dimension="modal-md"
                >
                    <div className="box-body">
                        <Row>
                            <Grid cols="12">
                                <div className="box box-danger">
                                    <div className="box-body">
                                        <form>
                                            <div className="form-group">
                                                <div style={{ marginTop: "20px", marginBottom: "5px" }}>
                                                    <label>Cadastrar</label>
                                                </div>
                                                <DebounceInput
                                                    element="textarea"
                                                    debounceTimeout={800}
                                                    className="form-control"
                                                    rows="5"
                                                    cols="40"
                                                    value={description.toUpperCase() || ""}
                                                    onChange={event => {
                                                        this.setState({
                                                            description: event.target.value
                                                        })
                                                    }}
                                                    placeholder="Adicionar uma Nova Classificação de Demanda."
                                                />
                                                <div style={{ float: "right" }}>
                                                    <text>{`(${description.length} - 80)`}</text>
                                                    <button
                                                        type="button"
                                                        data-dismiss="modal"
                                                        onClick={() => this.handleSaveSubmit()}
                                                        className="btn btn-success"
                                                        disabled={description.length <= 0 || description.length > descriptionLimit}
                                                    >
                                                        SALVAR
                                                </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Grid>
                        </Row>
                    </div>
                </ModalFormOT>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        saveNewDemand
    }, dispatch);
const mapStateToProps = state => ({
    list: state.ot.list,
    filters: state.ot.filters
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DemandComp);
