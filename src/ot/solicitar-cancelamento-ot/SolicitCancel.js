/* eslint-disable no-prototype-builtins */
/* eslint-disable class-methods-use-this */
import { OTTRANSITIONS } from "./StateMachineOt";
import { SEGTRANSITIONS } from "./StateMachineOtSegment";

export default class SolicitCancelOt {
  checkSolicitCancelOt(o) {
    const { ot_status_id } = o;
    return (
      this.checkStateMachineOt(ot_status_id, "Solicitar Cancelamento") &&
      this.checkCanCancelChildren(o)
    );
  }

  checkStateMachineOt(status_id, acao) {
    let aux = OTTRANSITIONS;
    const de = status_id;
    const transicao = acao;

    aux = aux.filter(
      transition => transition.de === de && transition.transicao === transicao
    );

    return aux.length > 0;
  }

  checkCanCancelChildren(o) {
    let test = false;
    if (
      !(
        o.seg_status_id === 38 ||
        o.seg_status_id === 51 ||
        o.seg_status_id === 73
        // o.seg_status_id === 31
      )
    ) {
      test = this.checkStateMachineSegment(
        o.seg_status_id,
        "Solicitar Cancelamento"
      );
    }
    return test;
  }

  checkStateMachineSegment(status_id, acao) {
    let aux = SEGTRANSITIONS;
    const de = status_id;
    const transicao = acao;

    aux = aux.filter(
      transition => transition.de === de && transition.transicao === transicao
    );

    return aux.length > 0;
  }
}
