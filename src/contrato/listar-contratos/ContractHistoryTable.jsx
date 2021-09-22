import React from "react";
import { Table } from "common";
import { connect } from "react-redux";
import Overlay from "common/msg/overlay/overlay";

const ContractHistoryTable = props => {
  const {
    lpuContratosReducer: { contract_hist_list, contract_hist_columns }
  } = props;

  return (
    <div className="overlay-wrapper">
      <Overlay />
      <Table
        columns={contract_hist_columns}
        rows={contract_hist_list}
        selectByRowClick={false}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  lpuContratosReducer: state.lpuContratosReducer
});

export default connect(mapStateToProps)(ContractHistoryTable);
