// Test nova sintaxe de acordo com a documentação do React - Redux
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firstPage, previousPage, nextPage, lastPage } from "../actions";

import Download from "./Download";

import "./styles.css";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      firstPage,
      previousPage,
      nextPage,
      lastPage,
      listarFO: { page, limit, total, last, newFilter }
    } = this.props;
    return (
      <div className="pagination">
        <div className="pagination__filter">
          <button
            type="button"
            className="btn-sm btn-link fade-in filtro-btn pull-left"
            onClick={() => {
              firstPage(newFilter);
            }}
          >
            <i className="fa fa-angle-double-left" />
          </button>
          <button
            type="button"
            className="btn-sm btn-link fade-in filtro-btn pull-left"
            onClick={() => {
              previousPage(page, newFilter);
            }}
          >
            <i className="fa fa-angle-left" />
          </button>
          <button
            onClick={() => {
              nextPage(page, last, newFilter);
            }}
            type="button"
            className="btn-sm btn-link fade-in filtro-btn pull-left"
            disabled={page >= last && true}
          >
            <i className="fa fa-angle-right" />
          </button>
          <button
            onClick={() => {
              lastPage(last, newFilter);
            }}
            className="btn-sm btn-link fade-in filtro-btn pull-left"
            type="button"
          >
            <i className="fa fa-angle-double-right" />
          </button>
        </div>
        <span className="describe">
          Página
          <strong className="page">{page}</strong>
        </span>
        <div className="pagination__describe">
          <span>
            Mostrando
            <strong className="total">
              {limit * page - limit + 1} -{" "}
              {total > limit * page ? limit * page : total}
            </strong>
            De
            <strong className="total">{total}</strong>
            Registros
          </span>
        </div>
        <Download />
      </div>
    );
  }
}

const mapStateToProps = state => ({ listarFO: state.listarFO });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ firstPage, previousPage, nextPage, lastPage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
