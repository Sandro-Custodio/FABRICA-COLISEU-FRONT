import axios from "axios";

export const uploadFile = formData => {
  return axios({
    method: "post",
    baseURL: process.env.REACT_APP_API_URL,
    url: "/upload/attachment",
    data: formData,
    headers: { "content-type": "application/octet-stream" },
    json: true
  });
};

export const analisaCSV = (operacao, fileName, loggedUser, codigo) => {
  const params = {
    0: operacao,
    1: fileName,
    2: loggedUser,
    3: codigo
  };
  return axios({
    method: "post",
    baseURL: process.env.REACT_APP_API_URL,
    url: "/ot_leasedline_cleanner/read_csv_update_values_lpu",
    data: params,
    headers: { "content-type": "application/json" },
    json: true
  });
};

export const atualizaBase = (fileData, operacao, loggedUser) => {
  const params = {
    0: fileData,
    1: operacao,
    3: loggedUser
  };
  return axios({
    method: "post",
    baseURL: process.env.REACT_APP_API_URL,
    url: "/ot_leasedline_cleanner/update_values_lpu",
    data: params,
    headers: { "content-type": "application/json" },
    json: true
  });
};
