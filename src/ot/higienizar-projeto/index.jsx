import React from "react";
import { Link } from "react-router-dom";

import Content from "common/adminLTE/content";
import HeaderContent from "common/adminLTE/contentHeader";
import Table from "./table";
import Toolbar from "./toolbar";

const ToBack = () => {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      style={{ color: "inherit", textDecoration: hover ? "underline" : "none" }}
      to="/ordens-transmissao"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Ordens de Transmissão
    </Link>
  );
};

const Projeto = () => {
  return (
    <div className="fade-in fade-out">
      <HeaderContent title="Higienizar Projeto" small={<ToBack />} />
      <Content>
        <div className="panel panel-default">
          <div className="panel-heading">
            <Toolbar />
          </div>
          <div className="panel-body">
            <Table />
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Projeto;
