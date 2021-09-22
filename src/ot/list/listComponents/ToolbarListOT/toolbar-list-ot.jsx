import React from "react";
import ReactTooltip from "react-tooltip";
import { ViewOt, ViewSeg, EncaminharSeg , Download } from "./items";

const ToolbarListOT = () => {
  return (
    <React.Fragment>
      <ViewOt />
      <ViewSeg />
      <EncaminharSeg />
      <Download />
      <ReactTooltip
        id="top_dark_float"
        place="top"
        type="dark"
        effect="float"
      />
      <ReactTooltip
        id="top_green_float"
        place="top"
        type="success"
        effect="float"
      />
    </React.Fragment>
  );
};

export default ToolbarListOT;
