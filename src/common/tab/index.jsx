/* eslint-disable react/no-array-index-key */
import React from "react";
import { Tabs, Tab } from "react-bootstrap";

const TabComp = ({ defaultActive, tabList, ...others }) => {
  const [key, setKey] = React.useState(defaultActive);
  const id = `tabs-${Math.random()}-${Math.random()}`;

  return (
    <Tabs
      id={id}
      mountOnEnter
      unmountOnExit
      activeKey={key}
      onSelect={k => setKey(k)}
      {...others}
    >
      {tabList.map(({ key, Comp, ...others }, index) => (
        <Tab {...others} eventKey={index} key={index}>
          {typeof Comp === "function" ? <Comp /> : Comp}
        </Tab>
      ))}
    </Tabs>
  );
};

TabComp.defaultProps = {
  defaultActive: 0,
  tabList: []
};

export default TabComp;
