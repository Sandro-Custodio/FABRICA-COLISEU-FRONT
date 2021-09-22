import React from "react";

const Pagination = ({ currentPage, pageSize, total, changePage }) => {
  const page = currentPage || 1;
  return (
    <div className="pagination">
      <Navigate
        currentPage={page}
        total={total}
        changePage={changePage}
        pageSize={pageSize}
      />
      <CurrentPage currentPage={page} total={total} />
      <Guide currentPage={page} pageSize={pageSize} total={total} />
    </div>
  );
};

const Navigate = ({ currentPage, total, changePage, pageSize }) => (
  <div>
    <button
      type="button"
      className="btn-sm btn-link fade-in filtro-btn pull-left"
      onClick={() => changePage(1)}
      disabled={currentPage === 1}
      style={{ color: currentPage === 1 && "#777" }}
    >
      <i className="fa fa-angle-double-left" />
    </button>
    <button
      type="button"
      className="btn-sm btn-link fade-in filtro-btn pull-left"
      disabled={currentPage === 1}
      style={{ color: currentPage === 1 && "#777" }}
      onClick={() => changePage(currentPage - 1)}
    >
      <i className="fa fa-angle-left" />
    </button>
    <button
      type="button"
      className="btn-sm btn-link fade-in filtro-btn pull-left"
      disabled={currentPage * pageSize >= total}
      style={{ color: currentPage * pageSize >= total && "#777" }}
      onClick={() => changePage(currentPage + 1)}
    >
      <i className="fa fa-angle-right" />
    </button>
    <button
      className="btn-sm btn-link fade-in filtro-btn pull-left"
      type="button"
      disabled={currentPage * pageSize >= total}
      style={{ color: currentPage * pageSize >= total && "#777" }}
      onClick={() => {
        let nextPage = total / pageSize;
        nextPage += total % pageSize === 0 ? 0 : 1;
        changePage(Math.trunc(nextPage));
      }}
    >
      <i className="fa fa-angle-double-right" />
    </button>
  </div>
);

const CurrentPage = ({ currentPage, total }) => (
  <span className="describe">
    Página &nbsp; <b>{Math.trunc(total ? currentPage : total)}</b>
  </span>
);

const Guide = ({ currentPage, pageSize, total }) => (
  <div style={{ marginRight: 10 }}>
    <span>
      Mostrando <b>{!total ? total : (currentPage - 1) * pageSize + 1}</b> -{" "}
      <b>{currentPage * pageSize >= total ? total : currentPage * pageSize}</b>{" "}
      De <b>{total}</b> Registros
    </span>
  </div>
);

export default Pagination;
