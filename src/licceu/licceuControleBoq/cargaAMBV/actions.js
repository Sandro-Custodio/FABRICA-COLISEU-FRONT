/* eslint-disable import/prefer-default-export */
import { toastr } from "react-redux-toastr";
import axios from "axios";
import get from "lodash/get";

export const getVendors = () => async dispatch => {
  try {
    dispatch({ type: "LOADING_FILTER", payload: true });
    const URL = `${process.env.REACT_APP_API_URL_JAVA}/grupo-vendor/listar-vendor`;
    const header = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get(URL, header);
    dispatch({ type: "SET_VENDORS_FILTER", payload: data.vendors });
  } catch (error) {
    toastr.error("Erro", "Erro ao buscar lista de filtros do vendor");
  } finally {
    dispatch({ type: "LOADING_FILTER", payload: false });
  }
};

export const getBoqsWithFilter = page => async (dispatch, gestate) => {
  // console.log("Page dentro do metodo gerBoqsWithFilter", page);
  try {
    dispatch({ type: "SET_LOADING_CARGA_AMBV_BOQ", payload: true });
    const URL = `${process.env.REACT_APP_API_URL_JAVA}/tipo-custo/buscar2?page=${page}&size=100`;
    const filtro = get(gestate(), "form.filterFormAMBV.values", {});
    const header = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(URL, filtro, header);
    dispatch({ type: "SET_NEXT_PAGE_LIST_BOQ", payload: page });
    dispatch({
      type: "SET_RESULT_BOQS_WITH_FILTER",
      payload: data.dados,
      total: data.total
    });
  } catch (error) {
    toastr.error("Erro", "Erro ao buscar os registros da tabela");
  } finally {
    dispatch({ type: "SET_LOADING_CARGA_AMBV_BOQ", payload: false });
  }
};

export const exportBoqExcel = row => async dispatch => {
  try {
    const gridAMBV = {
      name: "Export_Grid_Tipo_Custo.xlsx",
      tipoCustos: []
    };

    for (let i = 0; i < row.length; i++) {
      const tipoCusto = {
        nomeArquivoEvora: row[i].nomeArquivoEvora,
        descrLoteEvora: row[i].descrLoteEvora,
        orgC: row[i].orgC,
        contrato: row[i].contrato,
        itemContrato: row[i].itemContrato,
        sapCode: row[i].sapCode,
        vendor: row[i].vendor,
        descricao: row[i].descricao,
        statusBoq: row[i].statusBoq,
        siteId: row[i].siteId,
        qtd: row[i].qtd,
        validacao: row[i].validacao,
        classificacaoMaterial: row[i].classificacaoMaterial
      };

      gridAMBV.tipoCustos.push(tipoCusto);
    }
    dispatch({ type: "LOADING_FILTER", payload: true });
    const URL = `${process.env.REACT_APP_API_URL_JAVA}/tipo-custo/exportComplete`;
    const header = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(URL, gridAMBV, header);
    window.open(
      `${process.env.REACT_APP_API_URL_JAVA}/tipo-custo/getExcel/${data.fileName}`
    );
  } catch (error) {
    toastr.error("Erro", "Erro ao buscar os registros da tabela");
  } finally {
    dispatch({ type: "LOADING_FILTER", payload: false });
  }
};

export const cleanTableBoqs = () => dispatch => {
  dispatch({ type: "CLEAN_TABLE_BOQS" });
};

export const validationFile = form => async dispatch => {
  try {
    dispatch({ type: "SET_LOADING_CARGA_AMBV_BOQ", payload: true });
    const config = { headers: { "content-type": "multipart/form-data" } };
    const baseURL = `${process.env.REACT_APP_API_URL_JAVA}/tipo-custo`;
    const { data } = await axios.post(`${baseURL}/upload`, form, config);
    uploadFile(data)(dispatch);
  } catch (error) {
    toastr.error(
      "Erro",
      get(error, "response.data.message", "Erro ao realizaar upload do arquivo")
    );
  } finally {
    dispatch({ type: "SET_LOADING_CARGA_AMBV_BOQ", payload: false });
  }
};

export const uploadFile = data => async dispatch => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const baseURL = `${process.env.REACT_APP_API_URL_JAVA}/tipo-custo`;
    await axios.post(`${baseURL}/persistir-tipos`, data, config);
    toastr.success("Sucesso", "Upload realizado com sucesso");
  } catch (error) {
    toastr.error("Erro", "Erro ao realizar o upload do arquivo");
  } finally {
    dispatch({ type: "SET_LOADING_CARGA_AMBV_BOQ", payload: false });
  }
};
