/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import ReactExport from "react-data-export";
import { connect } from "react-redux";
import { colunasExcel, subColunasExcel } from "./api.json";

const {
  ExcelFile,
  ExcelFile: { ExcelSheet }
} = ReactExport;

class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloading: "file-excel-o",
      jsonFormatado: []
    };
  }

  downloadExec = () => {
    this.verificarJson();
    const { list } = this.props;
    this.setState({ downloading: "refresh fa-spin" });
    setTimeout(() => {
      this.setState({ downloading: "file-excel-o" });
    }, (3000 * list.length) / 35);
  };

  verificarJson() {
    const { list } = this.props;
    const { jsonFormatado } = this.state;

    // Esse bloco de for existe apenas para formatar o o arquivo json recebido e recolher apenas os atributos que irão ser exportados para excel
    const jsonAdaptadoPais = [];
    for (let index = 0; index < list.length; index++) {
      const jsonPais = {};

      jsonPais.id_licceu_anel = list[index].id_licceu_anel;
      jsonPais.chave = list[index].chave;
      jsonPais.cluster_fo = list[index].cluster_fo;
      jsonPais.anel_fo = list[index].anel_fo;
      jsonPais.tipo = list[index].tipo;
      jsonPais.status = list[index].status;
      jsonPais.capacidade_min = list[index].capacidade_min;
      jsonPais.capacidade_max = list[index].capacidade_max;
      jsonPais.cap_ativo = list[index].cap_ativo;
      jsonPais.cap_proj = list[index].cap_proj;
      jsonPais.cap_disp = list[index].cap_disp;
      jsonPais.ag_pop_1 = list[index].ag_pop_1;
      jsonPais.ag_pop_2 = list[index].ag_pop_2;

      const jsonAdaptadoFilhos = [];
      for (let i = 0; i < list[index].elementos.length; i++) {
        const jsonFilhos = {};

        jsonFilhos.fo_id = list[index].elementos[i].fo_id;
        jsonFilhos.sigla_2g_est1 = list[index].elementos[i].sigla_2g_est1;
        jsonFilhos.sigla_3g_est1 = list[index].elementos[i].sigla_3g_est1;
        jsonFilhos.sigla_2g_est2 = list[index].elementos[i].sigla_2g_est2;
        jsonFilhos.sigla_3g_est2 = list[index].elementos[i].sigla_3g_est2;
        jsonFilhos.sigla_lte_est1 = list[index].elementos[i].sigla_lte_est1;
        jsonFilhos.sigla_lte_est2 = list[index].elementos[i].sigla_lte_est2;
        jsonFilhos.vendor_est1 = list[index].elementos[i].vendor_est1;
        jsonFilhos.vendor_est2 = list[index].elementos[i].vendor_est2;
        jsonFilhos.modelo_est1 = list[index].elementos[i].modelo_est1;
        jsonFilhos.modelo_est2 = list[index].elementos[i].modelo_est2;
        jsonFilhos.uf_est1 = list[index].elementos[i].uf_est1;
        jsonFilhos.reg_est1 = list[index].elementos[i].reg_est1;
        jsonFilhos.slot_porta_est_1 = list[index].elementos[i].slot_porta_est_1;
        jsonFilhos.slot_porta_est_2 = list[index].elementos[i].slot_porta_est_2;

        jsonAdaptadoFilhos.push(jsonFilhos);
      }

      jsonPais.elementos = jsonAdaptadoFilhos;
      jsonAdaptadoPais.push(jsonPais);
    }

    let count = 0;
    jsonAdaptadoPais.forEach(elementData => {
      // INICIO DA ITERACAO DOS PAIS
      const node1 = {};
      const colunas = [];
      const data = [];

      colunasExcel.forEach(eleColumn => {
        colunas.push(eleColumn.label);
      });

      const arrayDataConstruido = [];
      for (const i in elementData) {
        arrayDataConstruido.push(elementData[i]);
      }
      data.push(arrayDataConstruido);

      if (count === 0) {
        node1.columns = colunas;
        count++;
      } else {
        node1.columns = [];
      }

      node1.data = data;
      jsonFormatado.push(node1);

      // INICIO ITERAÇÂO DOS FILHOS
      const node2 = {};
      const subColunas = [];
      const subData = [];

      subColunasExcel.forEach(eleSubColumn => {
        subColunas.push(eleSubColumn.label);
      });

      elementData.elementos.forEach(elementDataSub => {
        const arraySubDataConstruido = [];
        for (const i in elementDataSub) {
          arraySubDataConstruido.push(elementDataSub[i]);
        }
        subData.push(arraySubDataConstruido);
        node2.xSteps = 1;
      });

      node2.columns = subColunas;
      node2.data = subData;
      jsonFormatado.push(node2);
    });
  }

  render() {
    const { downloading } = this.state;
    return (
      <React.Fragment>
        <ExcelFile
          element={
            <button
              type="button"
              data-for="top_green_float"
              data-tip="Download"
              className="btn-lg btn-link fade-in filtro-btn pull-right"
              onClick={() => this.downloadExec()}
            >
              <i
                className={`fa fa-${downloading} text-success`}
                data-toggle="tooltip"
                title="Download"
              />
            </button>
          }
        >
          <ExcelSheet dataSet={this.state.jsonFormatado} name="Organization" />
        </ExcelFile>

        <ReactTooltip
          id="top_green_float"
          place="top"
          type="success"
          effect="float"
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  list: state.listarFO.list
});

export default connect(mapStateToProps)(Download);
