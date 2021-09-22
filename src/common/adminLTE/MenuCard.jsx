import React from "react";
import { connect } from "react-redux";
import orderBy from "lodash/orderBy";
import Card from "../widget/cards/card";
import { actions, actions_licceu } from "../../constants";

const MenuCard = ({ application, listCards }) => {
  const actions_app = application === "coliseu" ? actions : actions_licceu;
  let list = listCards
    .filter(item => actions_app[item.code])
    .map(item => ({ ...item, ...actions_app[item.code] }));

  list = orderBy(list, "order");
  return list.map(item => (
    <Card
      key={item.code}
      icon={item.icon}
      path={item.path}
      cols="12 3 3 3"
      header={item.label}
      title={item.name.split(" ")[0]}
      description={item.description.substring(0, 40)}
      {...item.card_options}
    />
  ));
};

const mapStateToProps = state => ({
  application: state.auth.application
});
export default connect(mapStateToProps)(MenuCard);
