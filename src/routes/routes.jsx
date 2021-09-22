import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import ROUTES from "./index";
import { isPermited, logUserMenuAccess } from "../auth/actions";
import { connect } from "react-redux";
import Dashboard from "../dashboard/dashboard";
import Rollout from "../dashboard/rollout/Rollout";
import Eficiencia from "../dashboard/eficiencia/Eficiencia";
import ProjectEfic from "../dashboard/eficiencia/ProjectEfic";
import ProjectRollout from "../dashboard/rollout/ProjectRollout";

const renderLog = ({ user, funcId, component: Component, props, ...rest }) => {
  var componente;
  if (isPermited(user.permissions, funcId)) {
    logUserMenuAccess(funcId);
    componente = <Component {...props} />;
  } else {
    componente = (
      <Redirect to={{ exact: true, path: "/", component: Dashboard }} />
    );
  }

  return <>{componente}</>;
};

const PrivateRoute = ({ user, funcId, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        renderLog({ user, funcId, component: Component, props, ...rest })
      }
    />
  );
};

const mapStateToProps = ({ auth }) => ({ user: auth.user });

const CompPrivateRoute = connect(mapStateToProps)(PrivateRoute);

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
      <Route path='/dashboard/rollout' component={Rollout} />
      <Route path='/dashboard/projectEfic' component={ProjectEfic} />
      <Route path='/dashboard/projectRollout' component={ProjectRollout} />
      <Route path='/dashboard/eficiencia' component={Eficiencia} />
        {ROUTES.map(todo => (
          <CompPrivateRoute {...todo} funcId={todo.key} />
        ))}
        <Redirect from="*" to="/" />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
