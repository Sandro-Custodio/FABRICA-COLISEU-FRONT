import React from "react";
import { connect } from "react-redux";

import PermissionCheck from "common/operator/permission";

import Routes from "./routes";

const submenus = [
  "DR_COX1G1",
  "DR_COX1H1",
  "DR_COX1M1",
  "DR_COX1A1",
  "DR_COX1B1",
  "DR_CON1O1",
  "DR_COX1F1",
  "DR_COX1E1"
];

const LicceuCircuitos = ({
  auth: {
    user: { permissions }
  }
}) => {
  const routes = permissions.filter(p => submenus.includes(p.code));

  return (
    <PermissionCheck check={!!routes.length}>
      <Routes list={routes} />
    </PermissionCheck>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(LicceuCircuitos);
