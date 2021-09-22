import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { Route, Switch, Redirect, Link } from "react-router-dom";

import { Container, MenuCard } from "common";
import Error403 from "403/403";
import { actions as actions_coliseu, actions_licceu } from "../../constants";

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

const BackLink = ({ title, path }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      style={{ color: "inherit", textDecoration: hover ? "underline" : "none" }}
      to={path}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {title}
    </Link>
  );
};

const View = ({ title, basePath, permissions, list, application }) => {
  const code_functions = { coliseu: actions_coliseu, licceu: actions_licceu };
  const codes = list.map(el => el.code);
  const routes = permissions.filter(p => codes.includes(p.code));
  if (!routes.length) return <Error403 />;
  return (
    <Switch>
      <Route
        exact
        path={basePath}
        render={() => (
          <Container title={title} subtitle={<MenuLink />}>
            <MenuCard listCards={routes} />
          </Container>
        )}
      />
      {list.map(item => {
        const path = get(
          code_functions,
          `${application}.${item.code}.path`,
          ""
        ).replace("#", "");
        const { Comp, ...others } = item;
        return (
          <Route
            key={item.code}
            code={item.code}
            path={path}
            render={props => {
              return (
                <Comp
                  BackLink={<BackLink title={title} path={basePath} />}
                  {...props}
                  {...others}
                />
              );
            }}
          />
        );
      })}
      <Redirect from="*" to={basePath} />
    </Switch>
  );
};

export default connect(state => ({
  permissions: get(state, "auth.user.permissions", []),
  application: get(state, "auth.application", "coliseu")
}))(View);
