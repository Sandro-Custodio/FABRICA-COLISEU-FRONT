import React from "react";
import Grid from "common/layout/grid";

export default ({ children }) => (
  <Grid>
    <div className="box box-primary">
      <div className="box-body">{children}</div>
    </div>
  </Grid>
);
