import React from "react";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Content from "../../common/adminLTE/content";
import LicceuDashboardBar from "../licceuComponents/chart/licceuDashboardBar";
import Row from "../../common/layout/row";

const Dashboard = () => (
  <div className="fade-in fade-out">
    <ContentHeader title="Dashboard" small="Versão 2.0" />
    <Content>
      <Row>
        <LicceuDashboardBar cols="12 12" />
      </Row>
    </Content>
  </div>
);
export default Dashboard;
