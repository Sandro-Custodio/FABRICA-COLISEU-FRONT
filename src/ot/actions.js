export  function changeFilterOT(filter) {
  return dispatch => {
    dispatch([{ type: "CHANGE_FILTER", payload: filter }]);
  };
}

export function changeTempFilterOT(filter) {
  return dispatch => {
    dispatch([{ type: "CHANGE_TEMP_FILTER", payload: filter }]);
  };
}
