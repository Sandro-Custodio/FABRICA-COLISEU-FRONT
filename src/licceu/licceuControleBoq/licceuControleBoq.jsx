import React from "react";

import MenuCard from "common/adminLTE/MenuCard";
import Container from "common/Container";

const MenuLink = props => {
  const [hover, setHover] = React.useState(false);
  return (
    <span
      style={{
        cursor: "pointer",
        color: "inherit",
        textDecoration: hover ? "underline" : "none"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-toggle="push-menu"
      {...props}
    >
      Menu
    </span>
  );
};

export default ({ list }) => {
  return (
    <Container title="Controle de Boq" subtitle={<MenuLink />}>
      <MenuCard listCards={list} />
    </Container>
  );
};
