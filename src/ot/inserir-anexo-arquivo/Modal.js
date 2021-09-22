import React from "react";
import "./Modal.css";

const modal = props => {
  if (!props.show) return null;
  return (
    <div>
      <div
        className="modal-wrapper"
        style={{
          transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        <div className="modal-header">
          <h3>{props.title}</h3>
          <span className="close-modal-btn" onClick={props.close}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <p>{props.children}</p>
        </div>
        <div className="modal-footer">
          <button className="btn-continue" onClick={props.confirm}>
            {props.buttonConfirm}
          </button>
          <button className="btn-cancel" onClick={props.close}>
            {props.buttonCancel}
          </button>
        </div>
      </div>
    </div>
  );
};

modal.defaultProps = {
  show: false,
  title: "Confirmação",
  buttonConfirm: "SIM",
  buttonCancel: "NÃO"
};

export default modal;
