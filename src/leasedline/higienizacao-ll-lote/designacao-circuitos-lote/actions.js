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

export const analisaXls = (fileName, loggedUser) => {
  const params = {
    repository_name: fileName,
    user: loggedUser
  };
  return axios({
    method: "post",
    baseURL: process.env.REACT_APP_API_URL,
    url: "/designacao_circuito/read_file",
    data: params,
    headers: { "content-type": "application/json" },
    json: true
  });
};

export const atualizaBase = loggedUser => {
  const params = {
    0: loggedUser
  };
  return axios({
    method: "post",
    baseURL: process.env.REACT_APP_API_URL,
    url: "/designacao_circuito/insert_valid_circuits",
    data: params,
    headers: { "content-type": "application/json" },
    json: true
  });
};
