import React from "react";

const Progress = ({ text, number, max, color }) => (
  <div className="progress-group">
    <span className="progress-text">{text}</span>
    <span className="progress-number">
      <b>{number}</b>/{max}
    </span>
    <div className="progress sm">
      <div
        className={`progress-bar progress-bar-${color}`}
        style={{ width: `${(44 / 280) * 100}%` }}
      />
    </div>
  </div>
);

export default Progress;
