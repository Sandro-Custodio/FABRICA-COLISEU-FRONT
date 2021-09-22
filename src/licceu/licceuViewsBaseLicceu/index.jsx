import React from "react";
import { connect } from "react-redux";

import PermissionCheck from "common/operator/permission";

import Routes from "./routes";

const submenus = [
  "DR_CON1I1A1",
  "DR_CON1I1B1",
  "DR_CON1I1C1",
  "DR_CON1I1D1",
  "DR_CON1I1E1",
  "DR_CON1I1F1",
  "DR_CON1I1G1",
  "DR_CON1I1H1",
  "DR_CON1I1I1",
  "DR_CON1I1J1"
];

const LicceuViewsBaseLicceu = ({
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

export default connect(mapStateToProps)(LicceuViewsBaseLicceu);
