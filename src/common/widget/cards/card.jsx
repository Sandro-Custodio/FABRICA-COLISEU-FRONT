import React from "react";

import Grid from "../../layout/grid";
import "./card.css";

const colors = [
  "bg-red",
  "bg-blue",
  "bg-light-blue",
  "bg-green",
  "bg-navy",
  "bg-teal",
  "bg-olive",
  "bg-lime",
  "bg-orange",
  "bg-maroon",
  "bg-black",
  "bg-yellow"
];

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getRand = (min, max) => {
    return Math.round(min + Math.random() * (max - min));
  };

  randColor = (use_rand = true, color_index = 1) => {
    const min = 0;
    const max = colors.length - 1;
    const rand = this.getRand(min, max);
    const color = use_rand ? colors[rand] : colors[color_index]
    return color;
  };

  render() {
    const { cols, path, icon, header, title, use_rand, color_index } = this.props;
    return (
      <Grid cols={cols}>
        <a href={path}>
          <div style={{ height: 95, margin: "10px 0" }} className="card">
            <div className={`grow info-box ${this.randColor(use_rand, color_index)}`}>
              <span className="info-box-icon">
                <i style={{ fontSize: 45 }} className={`fa fa-${icon}`} />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">{header}</span>
                <span className="info-box-number">{title}</span>
              </div>
            </div>
          </div>
        </a>
      </Grid>
    );
  }
}

export default Card;
