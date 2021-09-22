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

export const analisaCsv = (idOp, fileName, loggedUser, codeAct, motivo) => {
  const params = {
    id_op: idOp,
    file_name: fileName,
    logged_user: loggedUser,
    code_act: codeAct,
    tipo_motivo: motivo
  };
  return axios({
    method: "post",
    baseURL: process.env.REACT_APP_API_URL,
    url: "/ot_leasedline_cleanner/read_csv_file_contract",
    data: params,
    headers: { "content-type": "application/json" },
    json: true
  });
};

export const atualizaCsv = (lista, index, label, user) => {
  const params = {
    0: lista,
    1: index,
    2: label,
    3: user
  };
  return axios({
    method: "post",
    baseURL: process.env.REACT_APP_API_URL,
    url: "/ot_leasedline_cleanner/update_values_contract",
    data: params,
    headers: { "content-type": "application/json" },
    json: true
  });
};
