import ODsSubMenu from "ods/SubMenu";
import ODSList from "ods/list/ODSList";
import HigienizarProjeto from "ot/higienizar-projeto";
import MultipleOt from "ot/save-ot-multiple";
import Dashboard from "../dashboard/dashboard";
import OTSubMenu from "../ot/sub-menu";
import LLSubmenu from "../leasedline/sub-menu";
import LLList from "../leasedline/list/leasedlines_list";
import OTList from "../ot/list/list";
import Insert from "../ot/save-ot/OTForm";
import Views from "../view/show-view";
import VisualizarOt from "../ot/visualizar-ot/form-visualizar-ot";
import Consult from "../ot/consult-ot/Consult";
import VisualizarOtSeg from "../ot/visualizar-ot-seg/form-visualizar-ot-seg";
import EncaminharSegmento from "../ot/encaminhar-ot-seg/form-encaminhar-ot-seg";
import ListUpload from "../ot/list/listComponents";
import SolicitarCancelamentoOtList from "../ot/solicitar-cancelamento-ot/solicitarCancelamentoOtList";
import EVTSubmenu from "../evt/sub-menu";
import EVTList from "../evt/list/list";
import SDSubMenu from "../sd/SubMenu";
import SDList from "../sd/list/sdList";
import SDEfficiency from "../sd/relatorio-efficiency";
import HigLlListSubmenu from "../leasedline/higienizacao-ll-lote/sub-menu2";
import HigLlListPrecosContratos from "../leasedline/higienizacao-ll-lote/precos-contratos/index";
import BaseDashboard from "../leasedline/higienizacao-ll-lote/base-dashboard/index";
import FallbackODS from "../leasedline/higienizacao-ll-lote/fallback-ods/FallbackODS";
import FallbackStatus from "../leasedline/higienizacao-ll-lote/fallback-status/FallbackStatus";
import HigienizarProjetoOt from "../ot/higienizar-projeto-ot/higienizar-projeto-ot";
import HigLlDesCircuitosLote from "../leasedline/higienizacao-ll-lote/designacao-circuitos-lote/index";
import CircuitoFatura from "../leasedline/circuito-fatura";
import HigLlAtualizacaoLPU from "../leasedline/higienizacao-ll-lote/atualizacao-lpu/index";
import OdsCreate from "../ods/create/OdsCreate";
import MultiplasEvts from "evt/multiplasEvts";
import FaturamentoSubMenu from "../faturamento/subMenu";
import FaturamentoVisualizar from "../faturamento/visualizar-faturas/visualizar-faturas";
import EmissaoMultiplasEvts from "evt/emissaoMultiplasEvts";
import VendorsSubMenu from "vendors/sub-menu";
import VendorList from "vendors/list/vendor-list";
import ListBdConfig from "bd-config/list/list-bd-config";
import PrevisaoDeFaturamento from "../relatorios/previsao_de_faturamento/previsao_de_faturamento";
import CircuitosFaturados from "../relatorios/circuitos_faturados/circuitos_faturados";
import FaturasInvalidas from "../relatorios/faturas_invalidas/faturas_invalidas";
import ImportarFatura from "faturamento/importar-fatura/importar-fatura";
import CircuitosContestados from "../relatorios/circuitos_contestados/circuitos_contestados";
import CircuitosPendentesDeAtivacao from "../relatorios/circuitos_pendentes_de_ativacao/circuitos_pendentes_de_ativacao";
import CreditosRecebidosPrevistos from "../relatorios/creditos_recebidos_previstos/creditos_recebidos_previstos";
import Conciliacao from "faturamento/conciliacao";
import CircuitosAtivadosCancelados from "../relatorios/circuitos_ativados_e_cancelados/circuitos_ativados_e_cancelados";
import TaxaDeInstalacaoPrevistaNaoFaturada from "../relatorios/taxa_de_instalacao_prevista_nao_faturada/taxa_de_instalacao_prevista_nao_faturada";
import TaxaDeInstalacaoFaturadaAposPrevisao from "../relatorios/taxa_de_instalacao_faturada_apos_previsao/taxa_de_instalacao_faturada_apos_previsao";
import PrimeiroFaturamento from "../relatorios/primeiro_faturamento/primeiro_faturamento";
import CircuitosNaoFaturados from "../relatorios/circuitos_nao_faturados/circuitos_nao_faturados";
import ListarAgrupadores from "../faturamento/listar-agrupadores";
import Inconsistencias from "../relatorios/inconsistencias/inconsistencias";
import ListarRegrasClassificacao from "faturamento/regras-classificacao/listar-regras/listar-regras";
import RelatoriosFaturamentoSubMenu from "../relatorios/submenu2";
import viewOd from "ods/view/viewOd";
import createSd from "sd/createSd";
import atualizarEnderecoElemento from "leasedline/higienizacao-ll-lote/atualizar-endereco-elemento";
import Contestacao from "../faturamento/contestacao";
import LotesGerados from "../faturamento/contestacao/lotesGerados";
import ListarFinalidades from "ot/finalidades/listar-finalidades";
import AcessoSubMenu from "../acesso/subMenu";
import AdministrarUsuarios from "../acesso/administrar-usuarios";
import LPUs from "lpu/sub-menu";
import ListarLPU from "lpu/listar/index";
import CreateLPU from "lpu/cadastrar/index";
import ContratoSubMenu from "../contrato/sub-menu";
import ListarContratos from "../contrato/listar-contratos";
import CadastrarContrato from "../contrato/cadastrar-contrato";
import SincronizarBdConfig from "../leasedline/sincronizar-bdconfig";

export default [
  { key: "Dashboard", exact: true, path: "/", component: Dashboard },
  {
    key: "DR_COA1",
    exact: true,
    path: "/ordens-transmissao",
    component: OTSubMenu
  },
  { key: "DR_COC1", path: "/leasedlines", component: LLSubmenu },
  { key: "DR_COC1A1", path: "/ll/list", component: LLList },
  { key: "DR_COA1B1", path: "/ots/list", component: OTList },
  { key: "DR_COA1A1", path: "/ots/new-ot", component: Insert },
  { key: "DR_COM1", path: "/views", component: Views },
  { key: "DR_COA1A1A1", path: "/ot/visualizar-ot", component: VisualizarOt },
  { key: 9, path: "/ot/visualizar-ot-seg", component: VisualizarOtSeg },
  { key: 10, path: "/ot/encaminhar-segmento", component: EncaminharSegmento },
  { key: "DR_COA1G1", path: "/ots/ot-consult", component: Consult },
  { key: "DR_COA1C1", path: "/ots/ot-multiple", component: MultipleOt },
  {
    key: "DR_COA1S1",
    path: "/ots/higienizar-projetos-ot",
    component: HigienizarProjetoOt
  },
  {
    key: "DR_COA1I1",
    path: "/ots/ot-solicit-cancel",
    component: SolicitarCancelamentoOtList
  },
  {
    key: "DR_COA1O1",
    path: "/ordens-transmissao/higienizar-projetos",
    component: HigienizarProjeto
  },

  { key: 16, path: "/test", component: ListUpload },
  { key: "DR_COB1", path: "/evts", component: EVTSubmenu },
  { key: "DR_COB1B1", path: "/evt/list", component: EVTList },
  { key: "DR_COD1", path: "/ods", component: ODsSubMenu },
  { key: "DR_COD1B1", path: "/ods-list", component: ODSList },
  { key: "DR_COE1", path: "/sds", component: SDSubMenu },
  { key: "DR_COE1B1", path: "/sd/list", component: SDList },
  { key: "DR_COE1E1", path: "/sd/efficiency", component: SDEfficiency },
  { key: "DR_COC1F1", path: "/ll/hig-ll-lote", component: HigLlListSubmenu },
  {
    key: "DR_COC1F1B1",
    path: "/ll/precos-contratos",
    component: HigLlListPrecosContratos
  },
  {
    key: "DR_COC1F1A3",
    path: "/ll/base-dashboard",
    component: BaseDashboard
  },
  { key: "DR_COC1G1A1", path: "/ll/fallback-od", component: FallbackODS },
  {
    key: "DR_COC1F1A1",
    path: "/ll/fallback-status",
    component: FallbackStatus
  },
  {
    key: "DR_COC1F1E1",
    path: "/ll/designacao-circuitos-lote",
    component: HigLlDesCircuitosLote
  },
  { key: "DR_COC1D1", path: "/ll/circuito-fatura", component: CircuitoFatura },
  { key: "DR_COC1F1D1", path: "/ll/lpu", component: HigLlAtualizacaoLPU },
  { key: "DR_COD1A1", path: "/criar-ods", component: OdsCreate },
  { key: "DR_COB1C1", path: "/multiplas-evts", component: MultiplasEvts },
  {
    key: "DR_COF1",
    path: "/faturamento",
    component: FaturamentoSubMenu
  },

  { key: "DR_COF1B1", path: "/visualizar", component: FaturamentoVisualizar },
  { key: "DR_COB1E1", path: "/emissao-evt", component: EmissaoMultiplasEvts },
  { key: "DR_COJ1A1", path: "/vendors", component: VendorsSubMenu },
  { key: "DR_COJ1A1B1", path: "/vendor/list", component: VendorList },
  { key: "DR_COA2A1", path: "/bd-config/list", component: ListBdConfig },
  {
    key: "DR_COF1J1A1",
    path: "/relatorios/previsao-de-faturamento",
    component: PrevisaoDeFaturamento
  },
  {
    key: "DR_COF1J1B1",
    path: "/relatorios/circuitos-faturados",
    component: CircuitosFaturados
  },
  {
    key: "DR_COF1J1C1",
    path: "/relatorios/faturas-invalidas",
    component: FaturasInvalidas
  },
  { key: "DR_COF1A1", path: "/importar-fatura", component: ImportarFatura },
  {
    key: "DR_COF1J1G1",
    path: "/relatorios/circuitos-contestados",
    component: CircuitosContestados
  },
  {
    key: "DR_COF1J1H1",
    path: "/relatorios/circuitos-pendentes-de-ativacao",
    component: CircuitosPendentesDeAtivacao
  },
  {
    key: "DR_COF1J1I1",
    path: "/relatorios/creditos-recebidos-x-previstos",
    component: CreditosRecebidosPrevistos
  },
  {
    key: "DR_COF1J1F1",
    path: "/faturamentoConciliacao",
    component: Conciliacao
  },
  {
    key: "DR_COF1J1J1",
    path: "/relatorios/circuitos-ativados-e-cancelados",
    component: CircuitosAtivadosCancelados
  },
  {
    key: "DR_COF1J1K1",
    path: "/relatorios/taxa-de-instalacao-prevista-nao-faturada",
    component: TaxaDeInstalacaoPrevistaNaoFaturada
  },
  {
    key: "DR_COF1J1L1",
    path: "/relatorios/taxa-de-instalacao-faturada-apos-previsao",
    component: TaxaDeInstalacaoFaturadaAposPrevisao
  },
  {
    key: "DR_COF1J1M1",
    path: "/relatorios/primeiro-faturamento",
    component: PrimeiroFaturamento
  },
  {
    key: "DR_COF1D1",
    path: "/listarAgrupadores",
    component: ListarAgrupadores
  },
  {
    key: "DR_COF1J1E1",
    path: "/relatorios/circuitos-nao-faturados",
    component: CircuitosNaoFaturados
  },
  {
    key: "DR_COF1C1",
    path: "/regras-classificacao",
    component: ListarRegrasClassificacao
  },
  {
    key: "DR_COF1J1D1",
    path: "/relatorios/inconsistencias",
    component: Inconsistencias
  },
  {
    key: "DR_COF1J1",
    path: "/relatorios/submenu",
    component: RelatoriosFaturamentoSubMenu
  },
  {
    key: 55,
    path: "/view-od/:od",
    component: viewOd
  },
  {
    key: "DR_COE1A1",
    path: "/sd/create",
    component: createSd
  },
  {
    key: "DR_COC1F1A2",
    path: "/ll/atualizar-endereco-elemento",
    component: atualizarEnderecoElemento
  },
  {
    key: "DR_COF1H1",
    path: "/contestacao",
    component: Contestacao
  },
  {
    key: "DR_COM1Z3",
    path: "/lotes-gerados",
    component: LotesGerados
  },
  {
    key: "DR_COA1B3",
    path: "/listarFinalidades",
    component: ListarFinalidades
  },
  {
    key: "DR_COP1",
    path: "/acesso",
    component: AcessoSubMenu
  },
  {
    key: "DR_COP1A1",
    path: "/administrarUsuarios",
    component: AdministrarUsuarios
  },
  {
    key: "DR_COQ1",
    path: "/lpu",
    component: LPUs
  },
  {
    key: "DR_COQ1B1",
    path: "/lpu-list",
    component: ListarLPU
  },
  {
    key: "DR_COQ1A1",
    path: "/lpu-create",
    component: CreateLPU
  },
  {
    key: "DR_COJ1B1",
    path: "/contratos",
    component: ContratoSubMenu
  },
  {
    key: "DR_COJ1B1B1",
    path: "/listarContratos",
    component: ListarContratos
  },
  {
    key: "DR_COJ1B1A1",
    path: "/cadastrarContrato",
    component: CadastrarContrato
  },
  {
    key: "DR_COC1H1",
    path: "/ll/sincronizar-bdconfig",
    component: SincronizarBdConfig
  }
];
