import React from "react";
import { Plugin, Template } from "@devexpress/dx-react-core";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";

import Grid from "../../../common/layout/grid";
import IconButton from "./iconButton";
import Download from "./Download";
import Demand_listOt from "common/demand_listOt";
import "./components.css";
import AssinarEVT from "../../assinar-formulario-evt/formulario-assinado-evt";
import { getSegmentarData } from "../../segmentar-ot/actions";
import { checkUserAccess } from "../../permission-ot";
import {
  isPermited,
  logCodeAndCallback,
  logUserMenuAccess
} from "../../../auth/actions";

import ConfirmCancel from "./ConfimCancel";

const Button = ({ title, description, icon, ...others }) => {
  return (
    <button
      data-for="top_dark_float"
      data-tip={title}
      type="button"
      className="btn-lg btn-link pull-left"
      data-toggle="modal"
      data-target={`#${description}`}
      {...others}
    >
      <i className={`fa fa-${icon}`} data-toggle="tooltip" />
    </button>
  );
};

const checkEvt = seg => {
  return (
    (seg.seg_status_id === 168 ||
      seg.seg_status_id === 50 ||
      seg.seg_status_id === 52 ||
      seg.seg_status_id === 73 ||
      seg.seg_status_id === 179) &&
    seg.solution === "LL"
  );
};

const checkStatusByRadar = seg => {
  if (
    seg.ot_status_id === 19 ||
    seg.ot_status_id === 23 ||
    seg.ot_status_id === 24
  ) {
    return false;
  }
  return true;
};

const checkStatusOt = ot_status_id => {
  return !(
    ot_status_id === 19 ||
    ot_status_id === 23 ||
    ot_status_id === 24 ||
    ot_status_id === 64
  );
};

const checkSegmentsCanGenerateForm = (list, selection) => {
  let result = [];
  if (selection.length !== 0) {
    result = selection.filter(item => {
      return (
        (list[item]?.seg_status_id === 50 || list[item]?.seg_status_id === 168) &&
        list[item]?.solution === 'LL'
      );
    });
  }
  return result.length === selection.length;
}

const checkCanForwardMultipleSegments = (list, selection, user_id) => {
  let result = [];
  if (selection.length !== 0) {
    result = selection.filter(item => {
      return (
        checkStatusOt(list[item]?.ot_status_id) &&
        (list[item]?.solution === null || list[item]?.solution === "") &&
        list[item]?.seg_area_owner_id === user_id &&
        list[item]?.seg_status_id === 31
      );
    });
  }
  return result.length === selection.length;
}

// const testOrderUserEqualLoggedUser = (user_id, seg_order_user_area_id) => {
//   if ( seg_order_created_at != null){
//     if (user_id === seg_order_user_area_id)
//       return false;
//     else
//       return true;
//   }
//   else return true;
// }

const ToolbarColumn = ({
  icons,
  selection,
  changeSelection,
  list,
  get_ot_data,
  update_object_ot_seg,
  get_ot_data_inserir_anexo,
  update_object_ot_seg_forward,
  handleReset,
  get_ot_data_radar,
  get_all_by_ot_segmentation_id,
  user_id,
  auth,
  getOtList,
  user,
  dispatchSegmentarData,
  setOverlay,
  filter_segments,
}) => {
  return (
    <Plugin name="ToolbarColumn">
      <Template name="toolbarContent">
        <Grid cols="12">
          {isPermited(user.permissions, "DR_COA1B1O2") &&
            selection.length === 1 &&
            list[selection].solution === "LL" &&
            (list[selection].seg_situation === "Aguardando TEF Contratação" ||
              list[selection].seg_situation === "Solicitado") && (
              <AssinarEVT lista={list[selection[0]]} />
            )}

          {selection.length > 0 && (
            <>
              <button
                data-for="top_dark_float"
                data-tip="Limpar Seleção"
                type="button"
                className="btn-lg btn-link pull-left"
                onClick={() => changeSelection([])}
              >
                <i className="fa fa-square-o" data-toggle="tooltip" />
              </button>
              {isPermited(user.permissions, "DR_COA1B1N2") &&
                checkSegmentsCanGenerateForm(list, selection) && (
                  <button
                    data-for="top_dark_float"
                    data-tip="Gerar Formulário"
                    data-toggle="modal"
                    data-target="#gerar_formulario"
                    type="button"
                    className="btn-lg btn-link pull-left"
                    onClick={() => filter_segments(selection, list)}
                  >
                    <i className="fa fa-file-text-o" data-toggle="tooltip" />
                  </button>
                )}
            </>
          )}

          {selection.length === 1 && (
            <>
              <Button
                title="Visualizar OT"
                description="visualizar"
                icon="eye"
                onClick={() => get_ot_data(list[selection[0]].code)}
              />
              {isPermited(user.permissions, "DR_COA1B1R1") && (
                <Button
                  title="Anexar Arquivo"
                  description="anexar"
                  onClick={() => {
                    logUserMenuAccess("DR_COA1B1R1");
                    get_ot_data_inserir_anexo(list[selection[0]]);
                  }}
                  icon="paperclip"
                />
              )}
              {isPermited(user.permissions, "DR_COA1B1G1") &&
                list[selection].solution === null &&
                list[selection].seg_situation === "Aguardando BNE - TSD" &&
                list[selection].seg_status_id === 31 && (
                  <Button
                    title="Segmentar"
                    description="segmentar_ot"
                    onClick={() => {
                      setOverlay(true);
                      logUserMenuAccess("DR_COA1B1G1");
                      const segmentos = getSegmentarData(
                        list[selection[0]].seg_id
                      );
                      segmentos
                        .then(({ data, optionsData, regionalData }) => {
                          dispatchSegmentarData({
                            data,
                            optionsData,
                            regionalData
                          });
                        })
                        .catch(() => {
                          console.log("Erro ao obter dados para segmentar");
                        })
                        .finally(() => {
                          setTimeout(() => {
                            setOverlay(false);
                          }, 10);
                        });
                    }}
                    icon="plus-circle"
                  />
                )}

              {isPermited(user.permissions, "DR_COA1B1I1") && (
                <Button
                  title="Visualizar Segmento"
                  description="view_seg"
                  icon="window-maximize"
                  onClick={() => {
                    update_object_ot_seg(list[selection[0]].seg_id);
                    logUserMenuAccess("DR_COA1B1I1");
                  }}
                />
              )}

              {isPermited(user.permissions, "DR_COA1B1J1") &&
                checkEvt(list[selection]) &&
                checkStatusByRadar(list[selection]) &&
                list[selection].seg_area_owner_id === 120 && (
                  <button
                    data-for="top_dark_float"
                    data-tip="Radar de Possibilidades"
                    type="button"
                    className="btn-lg btn-link pull-left"
                    data-toggle="modal"
                    data-target="#radar_possibilidades"
                    onClick={async () => {
                      await get_ot_data_radar(list[selection[0]].seg_id);
                      get_all_by_ot_segmentation_id(list[selection[0]].seg_id);
                      logUserMenuAccess("DR_COA1B1J1");
                    }}
                  >
                    <i
                      className="fa fa-rss"
                      data-toggle="tooltip"
                      title="Radar de Possibilidades"
                    />
                  </button>
                )}
              {isPermited(user.permissions, "DR_COA1B1H1") &&
                checkStatusOt(list[selection].ot_status_id) &&
                (list[selection].solution === null ||
                  list[selection].solution === "") &&
                list[selection].seg_area_owner_id === user.area?.id &&
                list[selection]?.seg_status_id === 31 && ( // "Aguardando BNE - TSD"
                  <Button
                    title="Encaminhar Segmento"
                    icon="forward"
                    description="encaminhar_seg"
                    onClick={() =>
                      Promise.all([update_object_ot_seg_forward(list[selection[0]].seg_id)])
                    }
                  />
                )}

              <ReactTooltip
                id="top_dark_float"
                place="top"
                type="dark"
                effect="float"
              />
            </>
          )}

          {selection.length > 1 && (
            <>
              {isPermited(user.permissions, "DR_COA1B1H1") &&
                checkCanForwardMultipleSegments(list, selection, user?.area?.id) && (
                  <Button
                    title="Encaminhar Múltiplos Segmentos"
                    icon="forward"
                    description="encaminhar_multiplos_seg"
                    onClick={() => {
                      Promise.all([update_object_ot_seg_forward(list[selection[0]].seg_id)]).finally($ => {
                        filter_segments(selection, list, "SET_MULTI_FORWARD_SEG_LIST")
                      })
                    }}
                  />
                )}
              <ReactTooltip
                id="top_dark_float"
                place="top"
                type="dark"
                effect="float"
              />
            </>
          )}

          {isPermited(user.permissions, "DR_COA1B1A1") &&
            selection.length >= 1 &&
            list[selection[0]].ot_status_id === 64 && (
              <ConfirmCancel
                row={list[selection[0]]}
                multi_rows={selection.map(n => list[n])}
                handleReset={handleReset}
              />
            )}
          {icons.length > 0 &&
            selection.length === 0 &&
            icons.map((todo, index) => <IconButton {...todo} key={index} />)}
          <ReactTooltip id="upload" place="top" type="info" effect="float" />
          {list.length > 0 && isPermited(user.permissions, "DR_COA1G1A1") && (
            <Download />
          )}
          {icons.length > 0 &&
            selection.length === 0 &&
            icons.map((todo, index) => <IconButton {...todo} key={index} />)}
          <ReactTooltip id="upload" place="top" type="info" effect="float" />
          {list.length > 0 && isPermited(user.permissions, "DR_COA1G1A1") && (
            <Demand_listOt />
          )}
        </Grid>
      </Template>
    </Plugin>
  );
};

const mapStateToProps = state => ({
  user_id: state.auth.user.id,
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStateToProps)(ToolbarColumn);
