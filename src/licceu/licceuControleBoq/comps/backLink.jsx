import React from "react";
import { Link } from "react-router-dom";

export default () => {
  const [hover, useHover] = React.useState(false);
  return (
    <Link
      style={{ color: "inherit", textDecoration: hover ? "underline" : "none" }}
      to="/controle-boq"
      onMouseEnter={() => useHover(true)}
      onMouseLeave={() => useHover(false)}
    >
      Controle de Boq
    </Link>
  );
};
