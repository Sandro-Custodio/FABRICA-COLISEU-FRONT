import moment from "moment";

export default params => {
  return params === null ? "" : moment(params).format("DD/MM/YYYY");
};
