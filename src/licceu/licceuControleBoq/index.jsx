import React from "react";
import { connect } from "react-redux";

import PermissionCheck from "common/operator/permission";

import Routes from "./routes";

const submenus = ["DR_CON1P1A1", "DR_CON1P1B1"];

const licceuControleBoq = ({
  auth: {
    user: { permissions }
  }
}) => {
  const routes = permissions.filter(
    p => p.nivel === "SUBMENU_1" && submenus.includes(p.code)
  );

  return (
    <PermissionCheck check={!!routes.length}>
      <Routes list={routes} />
    </PermissionCheck>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(licceuControleBoq);
