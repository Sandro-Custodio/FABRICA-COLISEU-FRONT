import React from "react";

import Content from "common/adminLTE/content";
import HeaderContent from "common/adminLTE/contentHeader";

export default ({ title, subtitle, children }) => (
  <div className="fade-in fade-out">
    <HeaderContent title={title} small={subtitle} />
    <Content>{children}</Content>
  </div>
);
