import React from "react";
import PropTypes from "prop-types";

const LicceuModal = ({
  id,
  title,
  children,
  footer,
  clearFilter,
  dimension
}) => (
  <div
    className={`modal fade`}
    id={`${id}`}
    role="dialog"
    aria-labelledby={`${id}Title`}
    aria-hidden="true"
  >
    <div
      className={`modal-dialog modal-dialog-centered ${dimension}`}
      role="document"
    >
      <div className={`modal-content`}>
        <div className="modal-header">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 className="modal-title" id={`${id}LongTitle`}>
            {title}
          </h5>
        </div>
        <div className="modal-body">
          <div className="container-fluid">{children}</div>
        </div>
        <div className="modal-footer" />
        {footer && (
          <>
            <button type="submit" className="btn btn-primary filtar">
              <i className="fa fa-search" style={{ margin: "0 10px 0 0" }} />
              Filtar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={clearFilter}
            >
              <i className="fa fa-bitbucket" style={{ margin: "0 10px 0 0" }} />
              Limpar
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);

LicceuModal.propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default LicceuModal;
