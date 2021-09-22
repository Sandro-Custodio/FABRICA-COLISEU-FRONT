import React, { Component } from "react";
import PropTypes from "prop-types";

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

  render() {
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
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 className="modal-title" id={`${this.props.id}LongTitle`}>
                {this.props.title}
              </h5>
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
