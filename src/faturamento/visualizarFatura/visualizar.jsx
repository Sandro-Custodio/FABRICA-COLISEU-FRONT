import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Table } from "common";
import { Container, Panel } from "../comps";
import { columns } from "./columns.json";
import Header from "./visualizarHeader";
import { getFiltros, getFaturaList, getDetalhamentoFatura } from "./actions";
import get from "lodash/get";
import moment from "moment";
import { Modal } from "common";
import FaturaDetalhada from "./faturaDetalhada";

const CommandButton = ({ row }) => {
  const [open, setOpen] = React.useState(false);
  const [bill, setBill] = React.useState({});
  const [status, setStatus] = React.useState({});
  const [user, setUser] = React.useState({});
  const [vendor, setVendor] = React.useState({});
  const [operator, setOperator] = React.useState({});
  const [billGroup, setBillGroup] = React.useState({});
  const [billDdClassification, setBillDdClassification] = React.useState([]);
  const [invoicingGridDD, setInvoicingGridDD] = React.useState([]);

  const [loading, setLoading] = React.useState({});

  if (open) console.log("!!!!!!Open!!!!!!!!!!!");
  return (
    <>
      <button
        type="button"
        className="btn btn-link"
        title="Fatura detalhada com classificação"
        onClick={evt => {
          setOpen(true);
          evt.stopPropagation();
          getDetalhamentoFatura(row.bill_id, row.vendor_id, row.network)
            .then(res => {
              setBill(res[0][0]["bill"]);
              setStatus(res[0][0]["status"]);
              setUser(res[0][0]["user"]);
              setVendor(res[0][0]["vendor"]);
              setOperator(res[0][0]["operator"]);
              setBillGroup(res[0][0]["bill_group"]);
              setBillDdClassification(
                res[1][0].map(r => ({
                  grupo: r.class_group,
                  classificacao: r.bill_dd_classification_id,
                  condicao: r.logical_view
                }))
              );
              setInvoicingGridDD(
                res[0].map(r => ({
                  classificacao2: r.bill_dd_classification_list,
                  grupo2: r.class_group,
                  circuito: r.circuito_id_a,
                  descricao2: r.invoice_description,
                  servico: r.bill_dd_service_id,
                  sequencial: r.invoice_sequence,
                  valorComImpostos: r.value_taxes,
                  elementoA: r.bill_dd_element_id_a,
                  elementoB: r.bill_dd_element_id_b,
                  aliquota: r.aliquot,
                  valorIcms: r.value_icms
                }))
              );
            })
            .catch(error => {
              console.log(error);
            });
          // .finally(() => setLoading(false));
        }}
      >
        <span className="primary">
          <i className="glyphicon glyphicon-list" />
        </span>
      </button>
      {open && (
        <Modal
          open={open}
          title="Detalhamento da Fatura"
          dimension="lg"
          width="100vw"
          onClose={() => setOpen()}
        >
          <FaturaDetalhada
            {...bill}
            {...status}
            {...user}
            {...vendor}
            {...operator}
            {...billGroup}
            {...row}
            billDdClassification={billDdClassification}
            invoicingGridDD={invoicingGridDD}
          />
        </Modal>
      )}
    </>
  );
};

const Visualizar = props => {
  const {
    dispatchRegionalList,
    dispatchFaturaStatusList,
    dispatchProvedorList,
    dispatchAgrupadorList,
    dispatchFiltros,
    regionalList,
    faturaStatusList,
    provedorList,
    agrupadorList
  } = props;
  const [selection, onSelectionChange] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [totalRows, setQuantidadeTotalRegistros] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, changePage] = React.useState(1);
  // const [faturaStatusList, setFaturaStatusList] = React.useState([]);
  // const [regionalList, setRegionalList] = React.useState([]);
  // const [provedorList, setProvedorList] = React.useState([]);
  // const [agrupadorList, setAgrupadorList] = React.useState([]);
  const [filters, onFiltersChange] = React.useState([]);

  const makeRequest = filter => {
    setLoading(true);
    getFaturaList(filter)
      .then(res => {
        setRows(
          res.data[0].map(r => ({
            // ...r,
            // id: r.id,
            rede: r.network,
            regional: regionalList.filter(el => el.value === r.operator_id)[0]
              .text,
            provedor: provedorList.filter(el => el.value === r.vendor_id)[0]
              .text,
            agrupador: agrupadorList.filter(
              el => el.value === r.bill_group_id
            )[0].text,
            dataReferencia: r.bill_month,
            numFatura: r.bill_number,
            valorFatura: `R$ ${get(r, "bill_cost_dd", 0)}`,
            totalNota: `R$ ${get(r, "bill_total", 0)}`,
            emissao:
              r.order_at !== null
                ? moment(r.order_at).format("DD/MM/YYYY")
                : " ",
            vencimento:
              r.deadline_at !== null
                ? moment(r.deadline_at).format("DD/MM/YYYY")
                : " ",
            status: faturaStatusList.filter(el => el.value === r.status_id)[0]
              .text,
            ddPrevio: r.dd_previo ? "SIM" : "NÃO",
            vendor_id: r.vendor_id,
            network: r.network,
            bill_id: r.id
          }))
        );
        setQuantidadeTotalRegistros(res.data[2]);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    setLoading(true);
    getFiltros(1000000000, 1000000000, "")
      .then(([{ regional, provedor, fatura }, grupo]) => {
        // dispatchRegionalList(regional);
        // dispatchFaturaStatusList(fatura);
        // dispatchProvedorList(provedor);
        // dispatchAgrupadorList(grupo);
        dispatchFiltros(regional, fatura, provedor, grupo)
        // setRegionalList(regional);
        // setFaturaStatusList(fatura);
        // setProvedorList(provedor);
        // setAgrupadorList(grupo);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  return (
    <Container title="Lista de Faturas">
      <Panel
        header={
          <Header
            selection={selection}
            columns={columns}
            makeRequest={makeRequest}
            rows={rows}
            // rowsView={rowsView}
            regionalList={regionalList}
            provedorList={provedorList}
            faturaStatusList={faturaStatusList}
            agrupadorList={agrupadorList}
            loading={loading}
          />
        }
      >
        <Table
          changePage={changePage}
          currentPage={currentPage}
          pageSize={rows.length}
          total={totalRows}
          columns={columns}
          rows={rows}
          filterProps={{ filters, onFiltersChange }}
          selectionProps={{ selection, onSelectionChange }}
          loading={loading}
          actions={[]}
        />
      </Panel>
    </Container>
  );
};

const Form = reduxForm({ form: "VisualizarFatura" })(Visualizar);

const mapDispatchToProps = dispatch => bindActionCreators({
  // dispatchRegionalList: (regional) => {dispatch({ type: "SET_REGIONAL_LIST", payload: regional })},
  // dispatchFaturaStatusList: (fatura) => {dispatch({ type: "SET_FATURA_STATUS_LIS", payload: fatura })},
  // dispatchProvedorList: (provedor) => {dispatch({ type: "SET_PROVEDOR_LIST", payload: provedor })},
  // dispatchAgrupadorList: (grupo) => {dispatch({ type: "SET_AGRUPADOR_LIST", payload: grupo })}
  dispatchFiltros: (regional, fatura, provedor, grupo) => {
    dispatch([
      { type: "SET_REGIONAL_LIST", payload: regional },
      { type: "SET_FATURA_STATUS_LIST", payload: fatura },
      { type: "SET_PROVEDOR_LIST", payload: provedor },
      { type: "SET_AGRUPADOR_LIST", payload: grupo }
    ])
  }
}, dispatch);

const mapStateToProps = state => {
  return {
    visualizarFaturaForm: state.form.VisualizarFatura,
    visualizarFaturaReducer: state.visualizarFaturaReducer,
    auth: state.auth
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
