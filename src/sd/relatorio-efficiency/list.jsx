import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, useDispatch } from 'react-redux'
import { get } from 'lodash';
import { Table, IconButton } from "common";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Content from "../../common/adminLTE/content";
import Overlay from "../../common/msg/overlay/overlay";
import { get_meta_efficiency_report, get_year_options } from "./actions";

import ListHeader from './listHeader';


const List = ({ rows, get_meta_efficiency_report, year, tableColumns, columnBands, get_year_options }) => {
  const searchHandler = (evt) => {
    evt.preventDefault();
    get_meta_efficiency_report(year);
  }

  React.useEffect(() => {
    get_year_options();
  }, [])

  return (
    <div className="overlay-wrapper">
      <Overlay />
      <div className="fade-in fade-out sd-list">
        <div className="header">
          <div className="header__left-items">
            <ContentHeader title="Efficiency" small="SDs" />
          </div>
        </div>
        <Content>
          <ListHeader handleSearch={searchHandler} tableColumns={tableColumns} rows={rows} year={year} />
          <Table
            columns={tableColumns}
            columnBands={columnBands}
            // columnWidths={columnWidths}
            rows={rows}
          // currentPage={page}
          // enableDefaultFilter
          // total={total}
          // pageSize="100"
          // loading={loading}
          />
        </Content>
      </div>
    </div>)
}

const mapDispatchToProps = dispatch => bindActionCreators({
  get_meta_efficiency_report,
  get_year_options
}, dispatch)

const mapStateToProps = state => ({
  rows: state.sdEfficiency.rows,
  year: get(state, "form.sdEfficiencyFastForm.values.filter", ""),
  tableColumns: state.sdEfficiency.tableColumns,
  columnBands: state.sdEfficiency.columnBands
});

export default connect(mapStateToProps, mapDispatchToProps)(List);