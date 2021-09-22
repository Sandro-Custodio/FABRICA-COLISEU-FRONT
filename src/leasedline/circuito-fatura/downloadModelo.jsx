import React from "react";

import { IconButton } from "common";
import { downloadModelo } from "./actions";


export default () => (
  <IconButton
    icon="download"
    className="btn btn-primary"
    onClick={() => downloadModelo()}
  >
    Download Modelo
  </IconButton>
);
