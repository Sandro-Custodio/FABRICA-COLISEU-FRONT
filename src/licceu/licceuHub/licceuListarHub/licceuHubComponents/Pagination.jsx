// Test nova sintaxe de acordo com a documentação do React - Redux
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getHub, previousPage, nextPage, lastPage } from "../actions";

import Downloads from "./Downloads";

import "./styles.css";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   const { getHub } = this.props;
  //   getHub({});
  // }

  render() {
    const {
      getHub,
      previousPage,
      nextPage,
      lastPage,
      listarHub: { page, limit, total, last, filter }
    } = this.props;
    const fixedPage = page + 1;
    return (
      <div className="pagination">
        <div className="pagination__filter">
          <button
            type="button"
            className="btn-sm btn-link fade-in filtro-btn pull-left"
            onClick={() => {
              getHub(filter);
            }}
          >
            <i className="fa fa-angle-double-left" />
          </button>
          <button
            type="button"
            className="btn-sm btn-link fade-in filtro-btn pull-left"
            onClick={() => {
              previousPage(page, filter);
            }}
          >
            <i className="fa fa-angle-left" />
          </button>
          <button
            onClick={() => {
              nextPage(page, last, filter);
            }}
            type="button"
            className="btn-sm btn-link fade-in filtro-btn pull-left"
          >
            <i className="fa fa-angle-right" />
          </button>
          <button
            onClick={() => {
              lastPage(last, filter);
            }}
            className="btn-sm btn-link fade-in filtro-btn pull-left"
            type="button"
          >
            <i className="fa fa-angle-double-right" />
          </button>
        </div>
        <span className="describe">
          Página
          <strong className="page">{fixedPage}</strong>
        </span>
        <div className="pagination__describe">
          <span>
            Mostrando
            <strong className="total">
              {limit * fixedPage - limit + 1} -{" "}
              {total > limit * fixedPage ? limit * fixedPage : total}
            </strong>
            De
            <strong className="total">{total}</strong>
            Registros
          </span>
        </div>
        <Downloads />
      </div>
    );
  }
}

const mapStateToProps = state => ({ listarHub: state.listarHub });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getHub, previousPage, nextPage, lastPage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
