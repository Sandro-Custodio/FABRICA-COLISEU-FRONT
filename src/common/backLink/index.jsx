import React from "react";
import { Link } from "react-router-dom";

export default ({ title, url }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      style={{ color: "inherit", textDecoration: hover ? "underline" : "none" }}
      to={url}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {title}
    </Link>
  );
};
