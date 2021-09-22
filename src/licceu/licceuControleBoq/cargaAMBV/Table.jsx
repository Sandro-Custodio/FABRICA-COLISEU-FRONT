import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table } from "common";
import { cleanTableBoqs, getBoqsWithFilter } from "./actions";

const columns = [
  { name: "nomeArquivoEvora", title: "Nome Boq" },
  { name: "descrLoteEvora", title: "Lote" },
  { name: "orgC", title: "Chave" },
  { name: "vendor", title: "Vendor" },
  { name: "contrato", title: "Contrato" },
  { name: "itemContrato", title: "Item Contrato" },
  { name: "sapCode", title: "SAP Code" },
  { name: "descricao", title: "Descrição" },
  { name: "statusBoq", title: "Status Boq" }
];

const MyTable = ({
  rows,
  cleanTableBoqs,
  loading_ambv_boq,
  total,
  getBoqsWithFilter,
  page
}) => {
  React.useEffect(() => {
    return () => {
      cleanTableBoqs();
    };
  }, []);

  // const mudarPagina = () => {};

  // const [page, setPage] = useState(1);

  return (
    <Table
      // disablePagination
      enableDefaultFilter
      loading={loading_ambv_boq}
      columns={columns}
      rows={rows}
      disablePagination={false}
      // pageSize="100"
      currentPage={page}
      total={total}
      tableSelectionProps={{ showSelectAll: true }}
      changePage={nextPage => {
        getBoqsWithFilter(nextPage);
      }}
    />
  );
};

const mapStateTable = state => ({
  rows: state.licceuControleBoq.rows,
  loading_ambv_boq: state.licceuControleBoq.loading_ambv_boq,
  total: state.licceuControleBoq.total,
  page: state.licceuControleBoq.page
});
const mapActionsTable = dispatch =>
  bindActionCreators({ cleanTableBoqs, getBoqsWithFilter, dispatch }, dispatch);

export default connect(
  mapStateTable,
  mapActionsTable
)(MyTable);
