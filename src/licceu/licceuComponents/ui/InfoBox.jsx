import React from "react";

const InfoBox = ({ icon, text, number, color }) => (
  <div className="col-md-3 col-sm-6 col-xs-12">
    <div className="info-box">
      <span className={`info-box-icon bg-${color}`}>
        <i className={`fa fa-${icon}`} />
      </span>
      <div className="info-box-content">
        <span className="info-box-text">{text}</span>
        <span className="info-box-number">{number}</span>
      </div>
    </div>
  </div>
);

export default InfoBox;
