export const checkUserAccess = (user, functionCode, data) => {
  console.log("checkUserAccess functionCode",functionCode);
  console.log("checkUserAccess User",user);
  console.log("checkUserAccess Data",data);

  return ( checkUserRoles(user, functionCode) && checkRoleConditions(user, functionCode, data) );
};

const checkUserRoles = (user, functionCode) => {
  // console.log("User ",user.user.login);
  // console.log("FunctionCode ",functionCode);
  // console.log("Permissions ",user.user.permissions);
  if(user.user.permissions && user.user.permissions.find( ({code}) => code === functionCode )){
    // console.log("Permission Granted");
    return true;
  }else{
    // console.log("Permission Denied");
    return false;
  }
};

const checkRoleConditions = (user, functionCode, o) => {
  switch(functionCode){
    case 'DR_COA1B1O2'://FORMULÁRIO ASSINADO EVT
      return true;
    case 'DR_COA1B1H1'://ENCAMINHAR
      return (testOrderUserEqualLoggedUser(o, user) &&
        checkStatusOt(o.ot_status_id) &&
        user.area.id == o.seg_area_owner_id &&
        lockSegForAssociatedProv(o, user));
    case 'DR_COA1B1J1'://RADAR DE POSSIBILIDADES
      return (checkEvt(o) && checkStatusByRadar(o) && o.seg_area_owner_id==120);
    case 'DR_COA1B1G1'://SEGMENTAR
      return (testOrderUserEqualLoggedUser(o, user) &&
        checkStatusOt(o.ot_status_id) &&
        (user.area.id == o.seg_area_owner_id) &&
        o.solution != 'FACILITY');
    case 'DR_COA1B1B1'://SOLICITAR CANCELAMENTO DE OT
      return true;//return checkSolicitCancelOt(o);
  }
  return false;
};

const testOrderUserEqualLoggedUser = (o, user) => {
  if ( o.seg_order_created_at != null){
    if (user.user.area_id == o.order_user_area_id){
      console.log("testOrderUserEqualLoggedUser FALSE");
      return false;
    }else{
      console.log("testOrderUserEqualLoggedUser TRUE");
      return true;
    }
  }
  else return true;
};

const checkEvt = (o) => {
  return (
    ((o.seg_status_id == 168) || (o.seg_status_id == 50) || (o.seg_status_id == 52) || (o.seg_status_id == 73) || (o.seg_status_id == 179)) && o.solution == "LL" );
};

const checkStatusOt = (ot_status_id) => {
  console.log("checkStatusOt TRUE", ot_status_id);
  return !(ot_status_id == 19 || ot_status_id == 23 || ot_status_id == 24 || ot_status_id == 64);
};

const checkStatusByRadar = (o) => {
  if (o.ot_status_id == 19 || o.ot_status_id == 23 || o.ot_status_id == 24 ){
      return false;
  }else{
      return true;
  }
};

/** Seta a visibilidade dos botões para que apenas o usuário associado ao segmento possa alterá-lo. */
const lockSegForAssociatedProv = (seg, user) => {
  console.log("lockSegForAssociatedProv", seg['seg_prov_user']);
  if (seg['seg_area_owner_id'] == 124 && seg['seg_prov_user'] && seg['seg_prov_user'] != user.user.id)
    return false;
  return true;
}

// Identifica se uma Ot pode receber uma solicitar de cancelamento para os seguintes status: 'Criada', 'Em Andamento'
// ou 'Atendida Parcialmente'. Também checa se o código de área do usuário é o mesmo do solicitante
// const checkSolicitCancelOt = (o) => {
//   if (checkPosition(o) == 1){
//     var ot_status_id = o.children[0].children[0].ot_status_id;
//     return (checkStateMachineOt(ot_status_id,'Solicitar Cancelamento') && checkCanCancelChildren(o) ); //&& (loggedUser.area.id == o.children[0].children[0].area_solicitant_id)
//   }else{
//     return false;
//   }
// };

// const checkStateMachineOt = (status_id, acao) => {
//   var aux:ArrayCollection = new ArrayCollection(ObjectUtil.copy(stateMachineOt).source);
//   aux.filterFunction = filterFunction;
//   de = status_id;
//   transicao = acao;
//   aux.refresh();
//   return aux.length> 0;
// }

// const checkStateMachineSegmentSolution = (status_id, acao, pSolution) => {
//   var aux:ArrayCollection = new ArrayCollection(ObjectUtil.copy(stateMachineSegmentation).source);
//   if ( (pSolution == '' || pSolution == null ) && acao =='Encaminhar' ){
//     aux.filterFunction = filterFunction;
//   }
//   else
//   {
//     aux.filterFunction = filterFunctionSolution;
//   }
//   de = status_id;
//   transicao = acao;
//   solucao= pSolution;
//   aux.refresh();
//   return aux.length> 0;
// };

// const checkCancelPermission = (solution ,status ,seg , transition = 'Confirma Cancelamento') => {
//   return checkTransitionConfirmarCancelamento(seg, transition) &&
//     (seg.solution == solution) &&
//     (seg.seg_status_id == status);
// };

// const checkTransitionConfirmarCancelamento = (o ,transicao='Confirma Cancelamento') => {
//   return checkStateMachineSegmentConfirmCancel(o.seg_status_id ,transicao ,o.solution ,o.seg_area_owner_id);
// };

// const checkStateMachineSegmentConfirmCancel = (status_id, acao, pSolution, area_owner) => {
//   var aux = new ArrayCollection(ObjectUtil.copy(stateMachineSegmentation).source);
//   if ( area_owner == 5 ){
//     aux.filterFunction = filterFunction;
//   }
//   else
//   {
//     aux.filterFunction = filterFunctionConfirmCancel;
//   }
//   de = status_id;
//   transicao = acao;
//   solucao= pSolution;
//   area_owner_id = area_owner;
//   aux.refresh();
//   return aux.length> 0;
// }
