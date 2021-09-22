import React from "react";
import Row from "common/layout/row";
import Grid from "common/layout/grid";

export default ({ children, col, row }) => (
  <Grid cols={col}>
    <div className="box box-primary">
      <div className="box-body">{row ? <Row>{children}</Row> : children}</div>
    </div>
  </Grid>
);
