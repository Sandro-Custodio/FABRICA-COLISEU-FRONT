import React from "react";
import { connect } from "react-redux";
import Content from "../../common/adminLTE/content";
import HeaderContent from "../../common/adminLTE/contentHeader";
import MenuCard from "../../common/adminLTE/MenuCard";
import Acl from "../../common/operator/permission";

const LicceuHub = props => {
  const { auth } = props;

  const isSubMenu = action => {
    return (
      (action.code.includes("DR_COY1A2") ||
        action.code.includes("DR_COY1A1")) &&
      action.nivel === "SUBMENU_1"
    );
  };

  const isSubMenuHub = action => {
    return action.code === "DR_COY1A2" || action.code === "DR_COY1A2";
  };

  const permissionsFilteredSubMenu = auth.user.permissions.filter(isSubMenu);

  const allow = auth.user.permissions.filter(isSubMenuHub).length === 1;

  return (
    <div className="fade-in fade-out">
      <Acl check={allow}>
        <HeaderContent title="Hub" small="Menu" />
        <Content>
          <MenuCard listCards={permissionsFilteredSubMenu} />
        </Content>
      </Acl>
    </div>
  );
};

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(LicceuHub);
