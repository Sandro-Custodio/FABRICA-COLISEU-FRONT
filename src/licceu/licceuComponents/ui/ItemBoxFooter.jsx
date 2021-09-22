import React from "react";

const ItemBoxFooter = ({ color, value, header, text }) => (
  <div className="col-sm-3 col-xs-6">
    <div className="description-block border-right">
      <span className={`description-percentage text-${color}`}>
        <i className="fa fa-caret-up" />
        {value}
      </span>
      <h5 className="description-header">{header}</h5>
      <span className="description-text">{text}</span>
    </div>
  </div>
);

export default ItemBoxFooter;
