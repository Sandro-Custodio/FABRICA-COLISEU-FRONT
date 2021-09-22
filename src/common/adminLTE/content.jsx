import React from "react";

export default props => {
  const { children } = props;
  return <section className="content">{children}</section>;
};
