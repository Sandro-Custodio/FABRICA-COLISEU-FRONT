// Test nova sintaxe de acordo com a documentação do React - Redux
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  firstPage,
  previousPage,
  nextPage,
  lastPage,
  getCircuitsFromBandaMedia
} from "../licceuActions";

import Downloads from "./Downloads";

import "./styles.css";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { firstPage } = this.props;
    firstPage();
  }

  render() {
    const {
      firstPage,
      previousPage,
      nextPage,
      lastPage,
      listarCircuito: { page, limit, total, last, newFilter }
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
            disabled={page === 1 && true}
          >
            <i className="fa fa-angle-double-left" />
          </button>
          <button
            type="button"
            className="btn-sm btn-link fade-in filtro-btn pull-left"
            onClick={() => {
              previousPage(page - 1, newFilter);
            }}
            disabled={page < 2 && true}
          >
            <i className="fa fa-angle-left" />
          </button>
          <button
            onClick={() => {
              nextPage(page + 1, newFilter);
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
            disabled={page >= last && true}
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
        <Downloads />
      </div>
    );
  }
}

const mapStateToProps = state => ({ listarCircuito: state.listarCircuito });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      firstPage,
      previousPage,
      nextPage,
      lastPage,
      getCircuitsFromBandaMedia
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
