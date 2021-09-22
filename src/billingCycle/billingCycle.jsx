import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ContentHeader from "../common/adminLTE/contentHeader";
import Content from "../common/adminLTE/content";
import Tabs from "../common/tabs/tabs";
import TabsHeader from "../common/tabs/tabsHeader";
import TabsContent from "../common/tabs/tabsContent";
import TabHeader from "../common/tabs/tabHeader";
import TabContent from "../common/tabs/tabContent";
import { insert, update, init } from "./actions";

import List from "../billingCycle/list";
import Form from "../billingCycle/insert";

class BillingCycles extends Component {
  componentWillMount() {
    this.props.init();
  }

  render() {
    return (
      <div className="fade-in fade-out">
        <ContentHeader title="Ciclos de Pagamentos" small="Cadastro" />
        <Content>
          <Tabs>
            <TabsHeader>
              <TabHeader
                href="/#/"
                label="Listar"
                icon="bars"
                target="tabList"
              />
              <TabHeader
                href="/#/"
                label="Incluir"
                icon="plus"
                target="tabCreate"
              />
              <TabHeader
                href="/#/"
                label="Alterar"
                icon="pencil"
                target="tabUpdate"
              />
              <TabHeader
                href="/#/"
                label="Excluir"
                icon="trash-o"
                target="tabDelete"
              />
            </TabsHeader>
            <TabsContent>
              <TabContent id="tabList">
                <List />
              </TabContent>
              <TabContent id="tabCreate">
                <Form
                  onSubmit={this.props.insert}
                  textPrimaryButton="Salvar"
                  submitClass="success"
                />
              </TabContent>
              <TabContent id="tabUpdate">
                <Form
                  onSubmit={this.props.update}
                  textPrimaryButton="Atualizar"
                  submitClass="success"
                />
              </TabContent>
            </TabsContent>
          </Tabs>
        </Content>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ insert, update, init }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(BillingCycles);
