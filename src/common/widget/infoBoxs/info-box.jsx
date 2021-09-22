import React from "react";

class InfoBox extends React.Component {
  render() {
    return (
      <Grid cols={this.props.cols}>
        <div className="info-box">
          <span className={`info-box-icon bg-red ${this.props.bg}`}>
            <i className={`fa fa-${this.props.icon}`}></i>
          </span>
          <div className="info-box-content">
            <span className="info-box-text">{this.props.text}</span>
            <span className="info-box-number">
              {this.props.number}
              <small>{this.props.small}</small>
            </span>
          </div>
        </div>
      </Grid>
    );
  }
}

export default InfoBox;
