import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getYears, Filter } from "licceu/liceuPlanoOperativo/comps";
import { tipos } from "../config.json";
import { listDownload } from "../actions";

const Filtro = ({ code, listDownload }) => {
  const tipoList = tipos[code];

  const filtersField = [
    {
      key: "year",
      field: {
        component: "select",
        required: true,
        children: (
          <>
            <option style={{ fontStyle: "italic" }} value="">
              Ano
            </option>
            {getYears().map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </>
        )
      }
    },
    {
      key: "po", // Plano Operativo
      field: {
        component: "select",
        required: true,
        children: (
          <>
            <option style={{ fontStyle: "italic" }} value="">
              Plano Operativo
            </option>
            {tipoList.map(({ id, text }) => (
              <option key={id} value={id}>
                {text}
              </option>
            ))}
          </>
        )
      }
    }
  ];

  return (
    <Filter
      list={filtersField}
      onSubmit={form => listDownload({ code, form })}
    />
  );
};

const mapActionGrid = dispatch =>
  bindActionCreators({ listDownload }, dispatch);

export default connect(
  null,
  mapActionGrid
)(Filtro);
