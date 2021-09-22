import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import Content from "common/adminLTE/content";
import Grid from "common/layout/grid";
import { Tab, Modal } from "common";
import EnvioEmail from "./EnvioDeEmail";

const EnvioDeEmailTabs = props => {
  const {
    setOpenModalEmail,
    openModalEmail,
    linhasSegselecionadas,
    prazoResp,
    auth,
    setOpenModalUpload,
    linhasSegselecionadasParaBackend,
    linhasVendorsSelecionadas,
    setLinhasVendorsSelecionadas,
    setLinhasOpenModalUpload
  } = props;

  const emailList = linhasVendorsSelecionadas.map(linhaSelecionada => {
    return {
      title: linhaSelecionada.vendor_name,
      Comp: (
        <EnvioEmail
          linhaSelecionada={linhaSelecionada}
          setOpenModalEmail={setOpenModalEmail}
          openModalEmail={openModalEmail}
          linhasSegselecionadas={linhasSegselecionadas}
          prazoResp={prazoResp}
          auth={auth}
          setOpenModalUpload={setOpenModalUpload}
          linhasSegselecionadasParaBackend={linhasSegselecionadasParaBackend}
          setLinhasVendorsSelecionadas={setLinhasVendorsSelecionadas}
          linhasVendorsSelecionadas={linhasVendorsSelecionadas}
          setLinhasOpenModalUpload={setLinhasOpenModalUpload}
        />
      )
    };
  });

  return (
    <Modal
      open={openModalEmail}
      title="Envio de Email"
      dimension="md"
      width="90vw"
      onClose={() => setOpenModalEmail(false)}
      footer={
        <div className="fade-in fade-out">
          <Content>
            <Grid cols="12">
              <Tab tabList={emailList} />
            </Grid>
          </Content>
        </div>
      }
      // disableBtnClose
    ></Modal>
  );
};

const mapStateToProps = state => ({
  form: get(state, "form.emailForm.values", {}),
  auth: state.auth
});

function PropsAreEqual(prevProps, nextProps) {
  return (
    prevProps.linhasVendorsSelecionadas ===
      nextProps.linhasVendorsSelecionadas &&
    prevProps.openModalEmail === nextProps.openModalEmail
  );
}

export default connect(mapStateToProps)(
  React.memo(EnvioDeEmailTabs, PropsAreEqual)
);
