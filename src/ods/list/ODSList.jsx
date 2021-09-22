import React, { useReducer } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Content from "common/adminLTE/content";
import Grid from "common/layout/grid";
import { Table } from "common";
import ContentHeader from "common/adminLTE/contentHeader";
import ToolBarColumn from "./ToolBarColumn";

import getOdsList from "./action";
import { columns, columnWidths } from "./mock.json";
import moment from "moment";
import get from "lodash/get";

const onSelectionChange = (state, index) =>
  index.length > 1 ? [index[index.length - 1]] : index;

const ODSList = ({
  listarODS: {
    odsList: { odsRows, size },
    currentPage,
    loading
  },
  getOdsList
}) => {
  const rows = odsRows;
  const [selection, setSelection] = useReducer(onSelectionChange, []);

  return (
    <div>
      <div className="fade-in fade-out">
        <div className="header">
          <div className="header__left-items">
            <ContentHeader title="Listar" small="ODS" />
          </div>
        </div>
        <Content>
          <Grid cols="12">
            <Table
              loading={loading}
              rows={odsRows.map(item => ({
                ...item,
                created_at: moment(item.created_at).format("DD/MM/YYYY")
              }))}
              // rows={odsRows}
              columns={columns}
              columnWidths={columnWidths}
              total={size}
              enableDefaultFilter
              toolBarComp={
                <ToolBarColumn
                  size={selection.length}
                  describe={rows[selection]}
                  rows={rows}
                />
              }
              selectionProps={{
                selection,
                onSelectionChange: setSelection
              }}
              currentPage={currentPage}
              changePage={getOdsList}
            />
          </Grid>
        </Content>
      </div>
    </div>
  );
};

const mapStateToProps = ({ listarODS }) => ({ listarODS });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOdsList
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ODSList);
