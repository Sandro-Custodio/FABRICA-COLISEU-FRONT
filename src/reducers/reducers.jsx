import OtMultiple from "../ot/save-ot-multiple/reducer";
import agrupadoresReducer from "../faturamento/listar-agrupadores/reducer";
import assinarFormularioEVT from "../ot/assinar-formulario-evt/reducer";
import auth from "../auth/reducer";
import bdConfigReducer from "../bd-config/reducer";
import cadastroUsuariosReducer from "../acesso/administrar-usuarios/reducer";
import circuitosAtivadosCanceladosReducer from "../relatorios/circuitos_ativados_e_cancelados/reducer";
import circuitosContestadosReducer from "../relatorios/circuitos_contestados/reducer";
import circuitosFaturadosReducer from "../relatorios/circuitos_faturados/reducer";
import circuitosNaoFaturadosReducer from "../relatorios/circuitos_nao_faturados/reducer";
import circuitosPendentesDeAtivacaoReducer from "../relatorios/circuitos_pendentes_de_ativacao/reducer";
import comandoLpuReducer from "../lpu/reducer";
import { combineReducers } from "redux";
import contestacaoReducer from "../faturamento/contestacao/reducer";
import creditosRecebidosPrevistosReducer from "../relatorios/creditos_recebidos_previstos/reducer";
import dashboard from "../dashboard/reducer";
import encaminharOtSeg from "../ot/encaminhar-ot-seg/reducer";
import evt from "../evt/reducer";
import faturamentoConciliacaoReducer from "../faturamento/conciliacao/reducer";
import faturamentoReducer from "../relatorios/reducer";
import faturasInvalidasReducer from "../relatorios/faturas_invalidas/reducer";
import finalidadesReducer from "../ot/finalidades/reducer";
import form from "../ot/save-ot/reducerForm";
import gerarFormularioReducer from "ot/gerar-formulario/reducer";
import higienizarProjetos from "ot/higienizar-projeto/reducer";
import importarFaturaReducer from "../faturamento/importar-fatura/reducer";
import inconsistenciasReducer from "../relatorios/inconsistencias/reducer";
import inserirAnexoOt from "../ot/inserir-anexo-arquivo/reducer";
import licceuGerenciamento from "licceu/licceuGerenciamento/base-cadeia/reducer";
import licceuReducer from "./licceuReducer";
import listarLL from "../leasedline/list/reducer";
import listarODS from "ods/list/reducer";
import listarOtHigienizar from "../ot/higienizar-projeto-ot/reducer";
import listarSD from "../sd/list/reducer";
import lpuContratosReducer from "../contrato/listar-contratos/reducer";
import ot from "../ot/reducer";
import overlay from "../common/msg/overlay/reducer";
import previsaoDeFaturamentoReducer from "../relatorios/previsao_de_faturamento/reducer";
import primeiroFaturamentoReducer from "../relatorios/primeiro_faturamento/reducer";
import radarPossibilidades from "../ot/radar-possibilidades/reducer";
import regrasClassificacaoReducer from "../faturamento/regras-classificacao/reducer";
import saveOt from "../ot/save-ot/reducer";
import sdEfficiency from "../sd/relatorio-efficiency/reducer";
import sdFormReducer from "../sd/form/reducer";
import segmentarOtReducer from "../ot/segmentar-ot/reducer";
import sincronizarBdConfigReducer from "../leasedline/sincronizar-bdconfig/reducer";
import stopTimesReducer from "../leasedline/stop-times/reducer";
import tab from "../common/tabs/reducer";
import taxaDeInstalacaoFaturadaAposPrevisaoReducer from "../relatorios/taxa_de_instalacao_faturada_apos_previsao/reducer";
import taxaDeInstalacaoPrevistaNaoFaturadaReducer from "../relatorios/taxa_de_instalacao_prevista_nao_faturada/reducer";
import { reducer as toastr } from "react-redux-toastr";
import vendorsReducer from "../vendors/list/reducer";
import view from "../view/reducer";
import viewOdReducer from "../ods/view/reducer";
import visualizarFaturasReducer from "../faturamento/visualizar-faturas/reducer";
import visualizarHistoricoLl from "../leasedline/visualizar-historico-ll/reducer";
import visualizarLl from "../leasedline/visualizar-ll/reducer";
import visualizarOt from "../ot/visualizar-ot/reducer";
import visualizarOtSeg from "../ot/visualizar-ot-seg/reducer";

const rootReducer = combineReducers({
  OtMultiple,
  agrupadoresReducer,
  assinarFormularioEVT,
  auth,
  bdConfigReducer,
  cadastroUsuariosReducer,
  circuitosAtivadosCanceladosReducer,
  circuitosContestadosReducer,
  circuitosFaturadosReducer,
  circuitosNaoFaturadosReducer,
  circuitosPendentesDeAtivacaoReducer,
  comandoLpuReducer,
  contestacaoReducer,
  creditosRecebidosPrevistosReducer,
  dashboard,
  encaminharOtSeg,
  evt,
  faturamentoConciliacaoReducer,
  faturamentoReducer,
  faturasInvalidasReducer,
  finalidadesReducer,
  form,
  gerarFormularioReducer,
  higienizarProjetos,
  importarFaturaReducer,
  inconsistenciasReducer,
  inserirAnexoOt,
  licceuGerenciamento,
  listarLL,
  listarODS,
  listarOtHigienizar,
  listarSD,
  lpuContratosReducer,
  ot,
  overlay,
  previsaoDeFaturamentoReducer,
  primeiroFaturamentoReducer,
  radarPossibilidades,
  regrasClassificacaoReducer,
  saveOt,
  sdEfficiency,
  sdFormReducer,
  segmentarOtReducer,
  sincronizarBdConfigReducer,
  stopTimesReducer,
  tab,
  taxaDeInstalacaoFaturadaAposPrevisaoReducer,
  taxaDeInstalacaoPrevistaNaoFaturadaReducer,
  toastr,
  vendorsReducer,
  view,
  viewOdReducer,
  visualizarFaturasReducer,
  visualizarHistoricoLl,
  visualizarLl,
  visualizarOt,
  visualizarOtSeg,
  ...licceuReducer
});

export default rootReducer;
