import React from "react";
import { connect } from "react-redux";
import MenuItem from "./menu-item";
import { actions, actions_licceu } from "../../constants";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionsFilteredMenuColiseu: [],
      permissionsFilteredMenuLicceu: []
    };
  }

  componentDidMount() {
    const { auth } = this.props;
    this.setState({
      permissionsFilteredMenuColiseu: auth.user.permissions.filter(
        this.isMenuColiseu
      ),
      permissionsFilteredMenuLicceu: auth.user.permissions.filter(
        this.isMenuLicceu
      )
    });
  }

  isMenuColiseu = action => {
    return (
      action.nivel === "MENU" &&
      ![7, 8, 15, 19, 22, 23, 14].includes(action.screen_id)
    );
  };

  isMenuLicceu = action => {
    return action.nivel === "MENU" && [1, 14, 13].includes(action.screen_id);
  };

  reordenaMenu = listAutorizations => {
    let orderAux = 9;
    listAutorizations.forEach(function(linhaAuth, _index) {
      switch (linhaAuth.code) {
        case "DR_COX1":
          linhaAuth.order = 0;
          break;
        case "DR_CON1C1":
          linhaAuth.order = 1;
          break;
        case "DR_COY1":
          linhaAuth.order = 2;
          break;
        case "DR_CON1B1":
          linhaAuth.order = 3;
          break;
        case "DR_CON1A1":
          linhaAuth.order = 4;
          break;
        case "DR_CON1I1":
          linhaAuth.order = 5;
          break;
        case "DR_COM1":
          linhaAuth.order = 6;
          break;
        case "DR_COA1":
          linhaAuth.order = 7;
          break;
        case "DR_CON1E1":
          linhaAuth.order = 8;
          break;
        case "DR_COF1":
          linhaAuth.order = 9;
          break;
        case "DR_COA2":
          linhaAuth.order = 10;
          break;
        case "DR_COJ1B1":
          linhaAuth.order = 11;
          break;
        default:
          linhaAuth.order = orderAux;
          orderAux += 1;
          break;
      }
    });

    listAutorizations.sort(function(a, b) {
      return a.order - b.order;
    });
  };

  orderedMenu = items => {
    let orderAux = 10;
    items.forEach(function(linhaAuth, _index) {
      switch (linhaAuth.code) {
        case "DR_COA1":
          linhaAuth.order = 0;
          break;
        case "DR_COB1":
          linhaAuth.order = 1;
          break;
        case "DR_COC1":
          linhaAuth.order = 2;
          break;
        case "DR_COF1":
          linhaAuth.order = 3;
          break;
        case "DR_COD1":
          linhaAuth.order = 4;
          break;
        case "DR_COE1":
          linhaAuth.order = 5;
          break;
        case "DR_COJ1B1":
          linhaAuth.order = 6;
          break;
        case "DR_COJ1A1":
          linhaAuth.order = 7;
          break;
        case "DR_COQ1":
          linhaAuth.order = 8;
          break;
        case "DR_COP1":
          linhaAuth.order = 9;
          break;
        case "DR_COT1":
          linhaAuth.order = 10;
          break;
        default:
          linhaAuth.order = orderAux;
          orderAux += 1;
          break;
      }
    });

    items.sort(function(a, b) {
      return a.order - b.order;
    });
  };

  render() {
    const {
      permissionsFilteredMenuColiseu,
      permissionsFilteredMenuLicceu
    } = this.state;
    const {
      auth: { application }
    } = this.props;
    const MenuList = props => {
      const { items, application_actions } = props;
      return (
        <React.Fragment>
          <MenuItem path="#/" label="Dashboard" icon="dashboard" />
          {application !== "coliseu" && this.reordenaMenu(items)}
          {this.orderedMenu(items)}
          {items.map(
            item =>
              application_actions[item.code] && (
                <MenuItem
                  key={item.code}
                  icon={application_actions[item.code].icon}
                  path={application_actions[item.code].path}
                  label={application_actions[item.code].label}
                />
              )
          )}
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a data-for="main-menu">
              <i className="fa fa-copyright" />
              <span>{`Copyright © ${new Date().getFullYear()} TIM Brasil.`}</span>
              <br />
              <span>{"  Todos os direitos reservados."}</span>
            </a>
          </li>
        </React.Fragment>
      );
    };
    return (
      <ul className="sidebar-menu">
        <MenuList
          items={
            application === "coliseu"
              ? permissionsFilteredMenuColiseu
              : permissionsFilteredMenuLicceu
          }
          application_actions={
            application === "coliseu" ? actions : actions_licceu
          }
        />
      </ul>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(Menu);
