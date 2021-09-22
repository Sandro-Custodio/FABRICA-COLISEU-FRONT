import "./styles.css";
import React, { useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import Content from "common/adminLTE/content";
import Grid from "common/layout/grid";
import { Table } from "common";
import ContentHeader from "common/adminLTE/contentHeader";
import axios from "axios";
import ToolBarColumn from "./ToolBarColumn";
import { columns } from "./mock.json";
import { toastr } from "react-redux-toastr";

const FallbackODS = () => {
  const [odsStatus, setOdsStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState([]);
  
  const getOdsStatus = od_code => {
    if (!od_code) {
      toastr.warning("Atenção", "Informe o código da OD.");
    } else {
      setLoading(true);
      axios
        .get("/ot_ll/get_ods_by_ll_status", { params: { od_code } })
        .then(({ data }) => setOdsStatus(data))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="fade-in fade-out" id="fallback-od">
      <div className="header">
        <div className="header__left-items">
          <ContentHeader title="Fallback" small="ODS" />
        </div>
      </div>
      <Content>
        <Grid cols="12">
          <Table
            rows={odsStatus}
            loading={loading}
            columns={columns}
            disablePagination
            selectionProps={{
              selection,
              onSelectionChange: setSelection
            }}
            toolBarComp={
              <ToolBarColumn
              data={selection.map(n => odsStatus[n])}
              getOdsStatus={getOdsStatus}
              size={selection.length}
              setSelection={setSelection}
              />
            }
          />
        </Grid>
      </Content>
    </div>
  );
};

export default FallbackODS;
