import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SimpleTable from "common/layout/simple-table";
import { Tab } from "common";

const GridClassificacao = ({
  ...others
}) => {

  const { visualizarFaturasReducer: {
    classification_list,
    columns3
  } } = others;
  //////////////////filtra nas linhas os tipos distintos para criar as abas dinamicamente
  let uniqueTags = [];
  classification_list.map(item => {
    if (uniqueTags.indexOf(item.bill_dd_classification_list) === -1) {
      uniqueTags.push(item.bill_dd_classification_list);
    }
  });

  let rowsBillsDD = [];

  const list = [];
  ///////////////////// filtra as linhas pelos tipos e controi as tabelas

  for (const [index, value] of uniqueTags.entries()) {
    for (const [i, val] of classification_list.entries()) {
      if (String(classification_list[i].bill_dd_classification_list) === String(value)) {
        rowsBillsDD.push(val);
      }
    }
    list.push({
      title: String(value),
      Comp: <div style={{height: "20vw"}}><SimpleTable column_content={columns3} row_content={rowsBillsDD} /></div>
    });
    rowsBillsDD = [];
  }
  return (
    <Tab tabList={list} />
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = (state,props) => {
  return {
    visualizarFaturasReducer: state.visualizarFaturasReducer
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridClassificacao);
