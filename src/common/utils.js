export default params => {
  const conditions = params / 1024;
  const MB = 1024;

  if (conditions < MB) {
    return `${parseFloat(conditions).toFixed(2)} KB`;
  }
  if (conditions >= MB) {
    return `${parseFloat(conditions / 1000).toFixed(2)}MB`;
  }
  return 0;
};

export const toMoney = params => {
  if (params !== null) {
    return `R$ ${parseFloat(params).toFixed(2)}`;
  }
  return null;
};

export const FORMAT_DATE_TO_PT_BR = date => {
  if (date) {
    var x = date.split('/');
    return `${x[1]}/${x[0]}/${x[2]}`
  }
  return null;
}

export const toDate = params => {
  if (params) {
    return new Date(params).toLocaleDateString();
  }
  return null;
};

export const toFloat = params => {
  if (typeof params === "number") {
    return parseFloat(params).toFixed(2);
  }
  return null;
};

export const isValidation = params => {
  const validation =
    params !== null && params > 0 && params !== "" && params !== "undefined";
  return validation;
};

export const formatPositiveMoneyValue = params => {
  if (params) {
    //Retira qualquer letra
    params = params.replace(/[^0-9.,]/g, "");
    return params;
  } else {
    return null;
  }
};

export const formatCnpj = params => {
  //Retira qualquer letra
  params = params.replace(/[a-zA-Z]/g, "");
  //Coloca ponto entre o segundo e o terceiro dígitos
  params = params.replace(/^(\d{2})(\d)/, "$1.$2");
  //Coloca ponto entre o quinto e o sexto dígitos
  params = params.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  //Coloca uma barra entre o oitavo e o nono dígitos
  params = params.replace(/\.(\d{3})(\d)/, ".$1/$2");
  //Coloca um hífen depois do bloco de quatro dígitos
  params = params.replace(/(\d{4})(\d)/, "$1-$2");
  return params;
};
