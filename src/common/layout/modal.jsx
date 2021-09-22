/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import PropTypes from "prop-types";
import If from "../operator/if";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    children: PropTypes.any.isRequired,
    LabelButtonSubmit: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  closeModal = modal_id => {
    window.$(`#${modal_id}`).modal("hide");
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const { height } = this.props;

    return (
      // Trigger modal
      // <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
      // Launch demo modal
      // </button>
      <div
        className="modal fade"
        id={`${this.props.id}`}
        role="dialog"
        aria-labelledby={`${this.props.id}Title`}
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-dialog-centered ${this.props.dimension}`}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                // data-dismiss="modal"
                onClick={() => this.closeModal(this.props.id)}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h5 className="modal-title" id={`${this.props.id}LongTitle`}>
                  {this.props.title}
                </h5>
                {this.props.tools && this.props.tools}
              </div>
            </div>
            <div className="modal-body" style={{ height: height || "auto" }}>
              <div className="container-fluid">{this.props.children}</div>
            </div>
            <div className="modal-footer">
              {this.props.footer && this.props.footer}
              <If test={this.props.handleClickBtnSubmit}>
                {this.props.actions && this.props.actions}
                <button
                  type="button"
                  data-dismiss="modal"
                  onClick={() => this.props.handleClickBtnSubmit()}
                  className="btn btn-success"
                >
                  {this.props.LabelButtonSubmit}
                </button>
              </If>
              {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">FECHAR</button> */}
              {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
