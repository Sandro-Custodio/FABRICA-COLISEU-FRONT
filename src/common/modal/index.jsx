/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

const controlModal = ({ open, id }) => {
  if (open) window.$(`#${id}`).modal("show");
  else window.$(`#${id}`).modal("hide");
};

const Modal = ({
  open,
  dimension,
  title,
  disableBtnClose,
  labelBtnClose,
  footer,
  children,
  onClose,
  height,
  loading,
  width,
  maxHeight
}) => {
  const [id] = React.useState(
    `MyModalComp-${Math.floor(Math.random() * 100000)}`
  );

  // Toda vez que o componente for desmontado
  React.useEffect(() => () => controlModal({ open: false, id, onClose }), []);

  // Toda vez que a propriedade "open" mudar
  React.useEffect(() => controlModal({ open, id }), [open]);

  return (
    <div
      data-keyboard="false"
      data-backdrop="static"
      className="modal fade"
      tabIndex="-1"
      id={id}
      onClick={onClose}
    >
      <div
        className={`modal-dialog modal-${dimension}`}
        style={{ width }}
        onClick={evt => evt.stopPropagation()}
      >
        <div className="modal-content  ">
          <div className="modal-header">
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true" style={{ fontSize: 24 }}>
                &times;
              </span>
            </button>
            <h3 className="modal-title" style={{ wordBreak: "break-word" }}>
              {title}
            </h3>
          </div>
          <div
            style={{ height: height || "auto", maxHeight }}
            className="modal-body overlay-wrapper"
          >
            {loading && (
              <div className="overlay fade-in fade-out-in">
                <i className="fa fa-refresh fa-spin"></i>
              </div>
            )}
            {children}
          </div>
          <div className="modal-footer">
            {footer}
            {!disableBtnClose && (
              <button
                type="button"
                className="btn btn-default"
                onClick={onClose}
              >
                {labelBtnClose}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  open: false,
  title: "",
  footer: <div />,
  dimension: "small",
  disableBtnClose: false,
  loading: false,
  labelBtnClose: "Fechar",
  onClose: () => {}
};

export default Modal;
