import React from "react";
import { Table } from "common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Panel } from "../comps";
import Header from "./header";
import Paginator from "common/paginator";
import Overlay from "../../common/msg/overlay/overlay";
import ExportarResultado from "./ExportarResultado";
import Row from "../../common/layout/row";
import Cell from "./acoesAgrupadores";
import { getFilterList } from "../actions";

const ListarContratos = props => {
  const {
    lpuContratosReducer: {
      contrato_list,
      contract_hist_list,
      /* paginator, */
      columns,
      columnsWidth,
      provedorList,
      grupoList,
      detalheObjetoList,
      contratoTimList,
      contratoProvedorList,
      redeList,
      abrangenciaList
    },

    getFilterList
  } = props;
  const [loading, setLoading] = React.useState(false);
  const [selection, onSelectionChange] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    getFilterList(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Container title="Listar Contratos">
      <Panel
        header={
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Header
              redeList={redeList}
              abrangenciaList={abrangenciaList}
              contratoTimList={contratoTimList}
              contratoProvedorList={contratoProvedorList}
              detalheObjetoList={detalheObjetoList}
              provedorList={provedorList}
              grupoList={grupoList}
              setLoading={setLoading}
              selection={selection}
              contrato_list={contrato_list}
              contract_hist_list={contract_hist_list}
            />
            <ExportarResultado
              selection={selection}
              rows={contrato_list}
              columns={columns}
            />
          </div>
        }
      >
        <Table
          columns={columns}
          columnWidths={columnsWidth}
          rows={contrato_list}
          selectionProps={{ selection, onSelectionChange }}
          selectByRowClick={false}
          disablePagination={true}
          loading={loading}
        />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Paginator useCase="LISTA_CONTRATO" />
        </div>
      </Panel>
    </Container>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFilterList
    },
    dispatch
  );

const mapStateToProps = state => ({
  lpuContratosReducer: state.lpuContratosReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(ListarContratos);
