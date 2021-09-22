import React from "react";

import { ExportExcel, IconButton } from "common";
import { Filter, getYears } from "../comps";

// Migrado do Angular 1 main\resources\static\js\factory\plano-operativo-transporte.factory.js
const poList = [
  {
    value: "Qualidade/Descongestionamento",
    label: "Qualidade/Descongestionamento"
  },
  { value: "Interconexão", label: "Interconexão" },
  { value: "Acesso Geral de Sites", label: "Geral de Sites" },
  { value: "Special Projects", label: "Especial Projects" },
  { value: "Remanejamento", label: "Remanejamentos" },
  { value: "Eficiencia e migrações", label: "Eficiencia e migrações" },
  { value: "TI_Parceiros_Lojas_Wi-Fi", label: "TI_Parceiros_Lojas_Wi" }
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
          {poList.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </>
      )
    }
  }
];

const Header = ({ selection, onFilter, columns, rows }) => {
  const rowsExport = rows.filter(
    (_, idx) => !selection.length || selection.includes(idx)
  );
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Filter list={filtersField} onSubmit={onFilter} />
      <div>
        <ExportExcel
          name="Plano Operativo Acesso"
          rows={rows.filter(
            (_, idx) => !selection.length || selection.includes(idx)
          )}
          columns={columns}
        >
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

export default Header;
