import React from "react";

import { ExportExcel, IconButton } from "common";
import { Filter, getYears } from "../comps";
import TransporteTable from "./modalTransporte";

// Migrado do Angular: main\resources\static\js\factory\plano-operativo.factory.js
const poList = [
  "Special Projects",
  "Acesso Geral de Sites",
  "Acesso Ampliações",
  "Ampliações de Iub",
  "Zero Leased Line"
];

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
          {poList.map(po => (
            <option key={po} value={po}>
              {po}
            </option>
          ))}
        </>
      )
    }
  }
];

const Header = ({
  selection,
  onSearch,
  rows,
  columns,
  exportTitle,
  form,
  isAcesso
}) => {
  const rowsExport = rows.filter(
    (_, idx) => !selection.length || selection.includes(idx)
  );
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <Filter list={filtersField} onSubmit={onSearch} />
        {!isAcesso && selection.length === 1 && (
          <TransporteTable row={rows[selection]} form={form} />
        )}
      </div>
      <div>
        <ExportExcel name={exportTitle} rows={rowsExport} columns={columns}>
          <IconButton
            icon="file-excel-o"
            typeTooltip="success"
            className="btn btn-success"
            iconProps={{ style: { fontSize: "16px", marginRight: "5px" } }}
            disabled={!rowsExport.length}
          >
            Exportar
          </IconButton>
        </ExportExcel>
      </div>
    </div>
  );
};

Header.defaultProps = {
  rows: [],
  columns: []
};

export default Header;
