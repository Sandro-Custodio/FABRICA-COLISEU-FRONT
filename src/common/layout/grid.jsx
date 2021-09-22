import React, { Component } from "react";

export default class Grid extends Component {
  toCssClassesCols(numbers) {
    const cols = numbers ? numbers.split(" ") : [];
    let classes = "";

    if (cols[0]) classes += `col-xs-${cols[0]}`;
    if (cols[1]) classes += ` col-sm-${cols[1]}`;
    if (cols[2]) classes += ` col-md-${cols[2]}`;
    if (cols[3]) classes += ` col-lg-${cols[3]}`;

    return classes;
  }

  toCssClassesOffset(numbers) {
    const offset = numbers ? numbers.split(" ") : [];
    let classes = "";

    if (offset[0] && offset[0] > 0) classes += `col-xs-offset-${offset[0]}`;
    if (offset[1] && offset[1] > 0) classes += ` col-sm-offset-${offset[1]}`;
    if (offset[2] && offset[2] > 0) classes += ` col-md-offset-${offset[2]}`;
    if (offset[3] && offset[3] > 0) classes += ` col-lg-offset-${offset[3]}`;

    return classes;
  }

  render() {
    const gridClassesCols = this.toCssClassesCols(this.props.cols || "12");
    const gridClassesOffset = this.toCssClassesOffset(this.props.offset || "0");
    return (
      <div className={`${gridClassesCols} ${gridClassesOffset}`}>
        {this.props.children}
      </div>
    );
  }
}
