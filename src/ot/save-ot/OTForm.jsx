import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Content from "../../common/adminLTE/content";
import Tabs from "../../common/tabs/tabs";
import TabsHeader from "../../common/tabs/tabsHeader";
import TabsContent from "../../common/tabs/tabsContent";
import TabHeader from "../../common/tabs/tabHeader";
import TabContent from "../../common/tabs/tabContent";
import FormPadrao from "./form-padrao";
import { init } from "./actions";

class Insert extends Component {
  componentWillMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { save_ot_padrao } = this.props;
    return (
      <div className="fade-in fade-out">
        <ContentHeader title="Criar" small="Ordens de Transmissão" />
        <Content>
          <Tabs>
            <TabsHeader>
              <TabHeader
                href="/#/"
                label="FORMULÁRIO"
                icon="plus"
                target="tabOtPadrao"
              />
            </TabsHeader>
            <TabsContent>
              <TabContent id="tabOtPadrao">
                <FormPadrao
                  textPrimaryButton="SALVAR"
                  submitClass="success"
                  handleSubmit={save_ot_padrao}
                />
              </TabContent>
            </TabsContent>
          </Tabs>
        </Content>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);
export default connect(null, mapDispatchToProps)(Insert);
