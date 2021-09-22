import React from "react";
import { Table } from "common";
import { connect } from "react-redux";
import get from "lodash/get";
import { columns } from "./mock.json";

const Descricao = ({ rows, selectedEmail, setSelectedEmail, loading }) => {
  return (
    <Table
      rows={rows}
      loading={loading}
      columns={columns}
      disablePagination
      selectionProps={{
        selected: selectedEmail,
        onSelectionChange: setSelectedEmail
      }}
    />
  );
};

const mapStateToProps = ({ radarPossibilidades }) => ({
  rows: get(radarPossibilidades, "vendorProviders.vendor_contacts", []),
  loading: radarPossibilidades.loading
});

export default connect(mapStateToProps)(Descricao);
