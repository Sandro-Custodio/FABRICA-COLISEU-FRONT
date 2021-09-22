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

export const analisaCsv = (idOp, fileName, loggedUser) => {
  const params = {
    id_op: idOp,
    file_name: fileName,
    logged_user: loggedUser
  };
  return axios({
    method: "post",
    baseURL: process.env.REACT_APP_API_URL,
    url: "/ot_leasedline_cleanner/read_csv_base_dashboard",
    data: params,
    headers: { "content-type": "application/json" },
    json: true
  });
};

export const atualizaCsv = (rows, id_op) => {
  const params = {
    rows: rows,
    id_op: id_op
  };
  return axios({
    method: "post",
    baseURL: process.env.REACT_APP_API_URL,
    url: "/ot_leasedline_cleanner/update_values_base_dashboard",
    data: params,
    headers: { "content-type": "application/json" },
    json: true
  });
};
