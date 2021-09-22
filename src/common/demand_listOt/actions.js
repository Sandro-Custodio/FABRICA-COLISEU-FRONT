import axios from "axios";
import { reset, change } from "redux-form";
import { toastr } from "react-redux-toastr";

export function saveNewDemand(values) {
    const params = {
        "description": values
    };

    return dispatch => {
        dispatch([{ type: "SHOW_OVERLAY" }]);
        axios
            .post(`${process.env.REACT_APP_API_URL}/demand_classifications/create_demand_classification`, params)
            .then(resp => {
                if (resp.status === 200) {
                    //dispatch([reset("radarPossibilidades.evt_list")]);
                    toastr.success("Demanda de classificação salva com sucesso!", {
                        timeOut: 0,
                        removeOnHover: false
                    });
                } else {
                    toastr.info("Erro", "FALHA AO TENTAR SALVAR OS DADOS");
                }
            })
            .catch(e => {
                toastr.info("Erro", "FALHA AO TENTAR SALVAR OS DADOS");
                toastr.info(e);
                if (e.response) {
                    if (e.response.data.errors) {
                        e.response.data.errors.forEach(error =>
                            toastr.error("Erro", error)
                        );
                    } else {
                        toastr.error(String(e.response.status), e.response.statusText);
                    }
                } else if (e.request) {
                    if (e.message === "Network Error") {
                        toastr.error("Erro", "Servidor OFFLINE");
                    }
                }
            })
            .finally(() => {
                dispatch([{ type: "HIDE_OVERLAY" }]);
            });
    };
}

export function get_ot_data_radar(ot_segmentation_id) {
    const params = {
        ot_segmentation_id
    };
    return dispatch => {
        dispatch([{ type: "SHOW_OVERLAY" }]);
        axios
            .post(`${process.env.REACT_APP_API_URL}/radar/get_ot_data`, params)
            .then(resp => {
                dispatch([{ type: "RADAR_INFO_FETCHED", payload: resp.data }]);
            })
            .catch(e => {
                toastr.warning("Atenção", "FALHA AO CARREGAR INFORMAÇÕES DO RADAR.");
                if (e.response) {
                    if (e.response.data.errors) {
                        e.response.data.errors.forEach(error =>
                            toastr.error("Erro", error)
                        );
                    } else {
                        toastr.error(String(e.response.status), e.response.statusText);
                    }
                } else if (e.request) {
                    if (e.message === "Network Error") {
                        toastr.error("Erro", "Servidor OFFLINE");
                    }
                }
            });
    };
}

export function get_all_by_ot_segmentation_id(ot_segmentation_id) {
    const params = {
        ot_segmentation_id
    };
    return dispatch => {
        dispatch([{ type: "SHOW_OVERLAY" }]);
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/evts/get_all_by_ot_segmentation_id`,
                params
            )
            .then(resp => {
                dispatch([{ type: "RADAR_EVTS_FETCHED", payload: resp.data }]);
            })
            .catch(e => {
                toastr.warning("Atenção", "FALHA AO CARREGAR INFORMAÇÕES DO RADAR.");
                if (e.response) {
                    if (e.response.data.errors) {
                        e.response.data.errors.forEach(error =>
                            toastr.error("Erro", error)
                        );
                    } else {
                        toastr.error(String(e.response.status), e.response.statusText);
                    }
                } else if (e.request) {
                    if (e.message === "Network Error") {
                        toastr.error("Erro", "Servidor OFFLINE");
                    }
                }
            })
            .finally(() => {
                dispatch([{ type: "HIDE_OVERLAY" }]);
            });
    };
}