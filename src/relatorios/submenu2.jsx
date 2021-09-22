import React from "react";
import { connect } from "react-redux";
import Content from "../common/adminLTE/content";
import HeaderContent from "../common/adminLTE/contentHeader";
import MenuCard from "../common/adminLTE/MenuCard";
import Acl from "../common/operator/permission";

const SubMenu = props => {
  const { auth } = props;

  const isSubMenu = action => {
    return (
      action.code.includes("DR_COF1J1" ) && action.nivel === "SUBMENU_2"
    );
  };

  const isDR_COF1J1 = action => {
    return action.code === "DR_COF1J1";
  };

  const permissionsFilteredSubMenu = auth.user.permissions.filter(isSubMenu);

  const allow = auth.user.permissions.filter(isDR_COF1J1).length === 1;

  React.useEffect(_ => console.log(permissionsFilteredSubMenu), [])

  return (
    <div className="fade-in fade-out">
      <Acl check={allow}>
        <HeaderContent title="Relatórios" small="Faturamento" />
        <Content>
          <MenuCard listCards={permissionsFilteredSubMenu.map(i => ({ ...i, card_options: { use_rand: false, color_index: 3 } }))} />
        </Content>
      </Acl>
    </div>
  );
};

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(SubMenu);
