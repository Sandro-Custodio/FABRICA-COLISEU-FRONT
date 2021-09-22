import React from "react";
import { Link } from "react-router-dom";

export default () => {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      style={{ color: "inherit", textDecoration: hover ? "underline" : "none" }}
      to="/plano-operativo"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Plano Operativo
    </Link>
  );
};
