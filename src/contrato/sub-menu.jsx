import React from "react";
import { connect } from "react-redux";
import Content from "../common/adminLTE/content";
import HeaderContent from "../common/adminLTE/contentHeader";
import MenuCard from "../common/adminLTE/MenuCard";
import Acl from "../common/operator/permission";

const SubMenu = props => {
  const { auth } = props;

  const isSubMenu = action => {
    return action.code.includes("DR_COJ1B1") && action.nivel === "SUBMENU_1";
    // return action.code.includes("DR_COQ1") && action.nivel === "SUBMENU_1";
  };

  const isDR_COJ1B1 = action => {
    return action.code === "DR_COJ1B1";
    // return action.code === "DR_COQ1";
  };

  const permissionsFilteredSubMenu = auth.user.permissions.filter(isSubMenu);

  const allow = auth.user.permissions.filter(isDR_COJ1B1).length === 1;

  return (
    <div className="fade-in fade-out">
      <Acl check={allow}>
        <HeaderContent title="Contrato" small="Menu" />
        <Content>
          <MenuCard listCards={permissionsFilteredSubMenu} />
        </Content>
      </Acl>
    </div>
  );
};

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(SubMenu);
