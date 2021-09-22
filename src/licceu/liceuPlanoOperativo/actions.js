import { toastr } from "react-redux-toastr";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL_JAVA;

export const requestListAcessos = ({ page, form, filter }) =>
  new Promise(resolve =>
    axios
      .post(`${baseUrl}/carga/search/grid`, {
        ano: form.year,
        tipo: form.po,
        page,
        filtro: filter || {}
      })
      .then(response => {
        const { data, meta } = response.data;
        resolve({ ...meta, rows: data });
      })
      .catch(() => {
        toastr.error("Oooops!!", "Houve erro ao buscar a página desejada");
        resolve({ total: 0, limit: 0, rows: [] });
      })
  );

export const downloadCarga = files => {
  if (
    files.length > 1 &&
    window.navigator.appVersion.toLowerCase().includes("chrome")
  )
    toastr.warning(
      "Atenção",
      "Certifique-se de que o seu navegador está habilitado para abrir múltiplos pop-ups.",
      { timeOut: 0 }
    );

  files.forEach(({ id }) => {
    console.log("url", `${baseUrl}/vendor/download/${id}`);
    window.open(`${baseUrl}/vendor/download/${id}`);
  });
};

export const requestListTransporte = ({ page, form, filter }) =>
  new Promise(resolve =>
    axios
      .post(`${baseUrl}/carga/search/transporte/grid`, {
        ano: form.year,
        tipo: form.po,
        page,
        filtro: filter || {}
      })
      .then(response => {
        const { data, meta } = response.data;
        resolve({ ...meta, rows: data });
      })
      .catch(() => {
        toastr.error("Oooops!!", "Houve erro ao buscar a página desejada");
        resolve({ total: 0, limit: 0, rows: [] });
      })
  );

export const requestListCargaVendor = ({
  row: { siteId, anoRolloutPrevisto, frequencia },
  form: { year }
}) =>
  new Promise(resolve =>
    axios
      .get(
        `${baseUrl}/carga/searchSiteId/${siteId}/${year}/${anoRolloutPrevisto}/${frequencia}`
      )
      .then(({ data }) => {
        resolve({ rows: Array.isArray(data) ? data : [] });
      })
      .catch(() => {
        toastr.error("Oooops!!", "Houve erro ao buscar a página desejada");
        resolve({ rows: [] });
      })
  );

export const requestListModalTransporte = ({
  row: { siteId },
  form: { year, po }
}) => {
  return new Promise(resolve =>
    axios
      .post(`${baseUrl}/carga/searchTransporte`, {
        siteId,
        ano: year,
        tipo: po
      })
      .then(({ data }) => {
        resolve({ rows: Array.isArray(data) ? data : [] });
      })
      .catch(() => {
        toastr.error("Oooops!!", "Houve erro ao buscar a página desejada");
        resolve({ rows: [] });
      })
  );
};
