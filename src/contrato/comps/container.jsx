import React from "react";

import Content from "common/adminLTE/content";
import HeaderContent from "common/adminLTE/contentHeader";
import Overlay from "common/msg/overlay/overlay";

export default ({ title, subtitle, children }) => (
  <div className="overlay-wrapper">
    <div className="fade-in fade-out">
      <HeaderContent title={title} small={subtitle} />
      <Content>{children}</Content>
    </div>
    <Overlay/>
  </div>
);
