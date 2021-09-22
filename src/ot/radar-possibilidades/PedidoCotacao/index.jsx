import React from "react";
import { connect } from "react-redux";
import Content from "common/adminLTE/content";
import Grid from "common/layout/grid";
import { Tab } from "common";
import { PedidoProposta, Form, Descricao } from "./Components";

const PedidoCotacao = props => {
  const {
    sendRequest,
    selectedEmail,
    setSelectedEmail,
    loadingDescricao,
    setLoadingDescricao
  } = props;
  const list = [
    {
      title: "Pedido de Cotação",
      Comp: (
        <PedidoProposta {...props} setLoadingDescricao={setLoadingDescricao} />
      )
    }
  ];

  const emailList = [
    {
      title: "Envio de E-Mail",
      Comp: <Form {...props} selectedEmail={selectedEmail} />
    },
    {
      title: "Contatos",
      Comp: (
        <Descricao
          loadingDescricao={loadingDescricao}
          selectedEmail={selectedEmail}
          setSelectedEmail={setSelectedEmail}
        />
      )
    }
  ];

  return (
    <div className="fade-in fade-out">
      <Content>
        <Grid cols="12">
          {sendRequest ? (
            <Tab tabList={emailList} />
          ) : (
            <Tab key={1} tabList={list} />
          )}
        </Grid>
      </Content>
    </div>
  );
};

const mapStateToProps = ({ radarPossibilidades }) => ({
  sendRequest: radarPossibilidades.sendRequest
});

export default connect(mapStateToProps)(PedidoCotacao);
