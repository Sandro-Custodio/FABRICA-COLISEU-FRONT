import React from "react";

export default props => {
  const { children, title, small } = props;
  return (
    <section className="content-header">
      <h1>
        {title} <small>{small}</small>
      </h1>
      <h1>{children}</h1>
    </section>
  );
};
