import listarCircuito, {
  licceuOpenFilterReducer,
  licceuEditarCircuito
} from "licceu/licceuCircuitos/licceuListarCircuito/licceuReducer";
import listarMW from "licceu/licceuMw/listar/reducer";
import cargaMW from "licceu/licceuMw/carga/reducer";
import HubReducer, {
  licceuHubOpenFilterReducer
} from "licceu/licceuHub/licceuListarHub/reducer";
import CargaHubReducer from "licceu/licceuHub/licceuCargaHub/reducer";
import listarFO, {
  licceuOpenFilterFOReducer
} from "licceu/licceuFO/licceuListarFO/reducer";

import licceuGeracaoPLO from "licceu/liceuPlanoOperativo/geracao/reducer";
import licceuCargaPLO from "licceu/liceuPlanoOperativo/carga/reducer";
import licceuControleBoq from "licceu/licceuControleBoq/cargaAMBV/reducer";
import licceuProjetoExecutivoListar from "licceu/liceuPlanoOperativo/projetoExecutivo/reducer";
import licceuBaseGerencial from "licceu/licceuBaseGerencial/listar/reducer";

export default {
  listarCircuito,
  listarFO,
  listarMW,
  cargaMW,
  licceuCircuitoOpenFilter: licceuOpenFilterReducer,
  licceuHubOpenFilter: licceuHubOpenFilterReducer,
  listarHub: HubReducer,
  cargaHub: CargaHubReducer,
  licceuFoOpenFilter: licceuOpenFilterFOReducer,
  licceuEditarCircuito,
  licceuGeracaoPLO,
  licceuCargaPLO,
  licceuControleBoq,
  licceuProjetoExecutivoListar,
  licceuBaseGerencial
};
