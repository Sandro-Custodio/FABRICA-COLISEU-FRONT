import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import LicceuDashboardDoughnut from "./licceuDashboardDoughnut";
import Grid from "../../../common/layout/grid";
import LicceuDashboardLine from "./licceuDashboardLine";
import InfoBox from "../ui/InfoBox";
import LabelColor from "../ui/LabelColor";
import { Table, Body } from "../ui/Table";
import Progress from "../ui/Progress";
import ItemBoxFooter from "../ui/ItemBoxFooter";

const LicceuDashboardBar = ({ cols }) => (
  <Grid cols={cols}>
    <div className="row">
      <InfoBox color="aqua" text="EVTs" number="57.879" icon="table" />
      <InfoBox color="red" text="OTs" number="54.153" icon="globe" />
      <InfoBox color="green" text="ODs" number="1.841" icon="plug" />
      <InfoBox color="yellow" text="SDs" number="1.716" icon="power-off" />
    </div>
    <div className="box box-danger">
      <div className="box-body" style={{}}>
        <div className="row">
          <div className="col-md-8">
            <p className="text-center">
              <strong>
                Contagem agrupada por mês: 1 Mar, 2018 - 1 Mar, 2019
              </strong>
            </p>
            <LicceuDashboardLine />
          </div>
          <div className="col-md-4">
            <p className="text-center">
              <strong>Consolidado Anual</strong>
            </p>
            <Progress text="E.V.T" color="aqua" number="44" max="280" />
            <Progress
              text="Ordens de Transmissão"
              color="red"
              number="40"
              max="180"
            />
            <Progress
              text="Ordens de desligamento"
              color="green"
              number="32"
              max="150"
            />
            <Progress
              text="Solicitações de desligamento"
              color="yellow"
              number="90"
              max="358"
            />
          </div>
        </div>
      </div>
      <div className="box-footer" style={{}}>
        <div className="row">
          <ItemBoxFooter
            color="green"
            value="4.567%"
            header="44"
            text="E.V.T"
          />
          <ItemBoxFooter
            color="yellow"
            value="0.000%"
            header="40"
            text="ORDENS DE TRANSMISSÃO"
          />
          <ItemBoxFooter
            color="green"
            value="22.661%"
            header="32"
            text="ORDENS DE DESLIGAMENTO"
          />
          <ItemBoxFooter
            color="red"
            value="18.209%"
            header="90"
            text=" SOLICITAÇÕES DE DESLIGAMENTO"
          />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-8 col-sm-8 col-xs-12">
        <div className="box box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Ordens de Transmissão</h3>
          </div>
          <div className="box-body">
            <Table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Solução</th>
                  <th>Status</th>
                  <th>Data Criação</th>
                </tr>
              </thead>
              <Body>
                <tr>
                  <td>
                    <a href="#/">OT-PIMMW-2018-00040</a>
                  </td>
                  <td>MW</td>
                  <td>
                    <LabelColor label="success" text="Concluída" />
                  </td>
                  <td>20/01/2018</td>
                </tr>
                <tr>
                  <td>
                    <a href="#/">OT-LL-2018-00040</a>
                  </td>
                  <td>LL</td>
                  <td>
                    <LabelColor label="warning" text="Em Cancelamento" />
                  </td>
                  <td>20/01/2018</td>
                </tr>
                <tr>
                  <td>
                    <a href="#/">OT-FO-2018-00040</a>
                  </td>
                  <td>FO</td>
                  <td>
                    <LabelColor label="danger" text="Cancelada" />
                  </td>
                  <td>20/01/2018</td>
                </tr>
                <tr>
                  <td>
                    <a href="#/">OT-BBIP-2018-00040</a>
                  </td>
                  <td>BBIP</td>
                  <td>
                    <span className="label label-danger">Cancelada</span>
                  </td>
                  <td>20/01/2018</td>
                </tr>
                <tr>
                  <td>
                    <a href="#/">OT-MUX-2018-00040</a>
                  </td>
                  <td>MUX</td>
                  <td>
                    <span className="label label-info">Em Andamento</span>
                  </td>
                  <td>20/01/2018</td>
                </tr>
              </Body>
            </Table>
          </div>
          <div className="box-footer" />
        </div>
      </div>
      <div className="col-md-4 col-sm-4 col-xs-12">
        <div className="box box-default">
          <div className="box-header with-border">
            <h3 className="box-title">Gráfico</h3>
          </div>
          <div className="box-body">
            <div className="row">
              <div className="col-md-8">
                <LicceuDashboardDoughnut />
              </div>
              <div className="col-md-4">
                <ul className="chart-legend clearfix">
                  <li>
                    <i className="fa fa-circle-o text-red" />
                    OT
                  </li>
                  <li>
                    <i className="fa fa-circle-o text-aqua" />
                    EVT
                  </li>
                  <li>
                    <i className="fa fa-circle-o text-green" />
                    ODS
                  </li>
                  <li>
                    <i className="fa fa-circle-o text-yellow" />
                    SDS
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="box-footer" />
        </div>
      </div>
    </div>
  </Grid>
);

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
const mapStateToProps = state => ({
  ots: state.ots,
  evts: state.evts,
  ods: state.ods,
  sds: state.sds
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LicceuDashboardBar);
