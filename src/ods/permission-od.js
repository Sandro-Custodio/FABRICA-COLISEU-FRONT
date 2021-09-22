export const checkUserAccess = (user, functionCode, data) => {
  return ( checkUserRoles(user, functionCode) && checkRoleConditions(user, functionCode, data) );
};

const checkUserRoles = (user, functionCode) => {
  if(user.user.permissions && user.user.permissions.find( ({code}) => code === functionCode )){
    return true;
  }else{
    return false;
  }
};

const checkRoleConditions = (user, functionCode, o) => {
  switch(functionCode){
    //--------OD GRID-------\\
    case 'DR_COD1B1A1'://Editar Od
      return ((checkPosition(o) == 1) && ((o.children[0]['status_id'] != 59) || (o.children[0]['status_id'] != 57)));
    case 'DR_COD1A1':// Criar Sd
      return ((checkPosition(o) == 1));
    //--------OD GRID--------\\
  }
  return false;
}
