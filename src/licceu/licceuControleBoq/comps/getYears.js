// Método migrado do Angular src\main\resources\static\views\carga-listar-acesso\CargaAcessoListarController.js
export default () => {
  const anos = [];
  const data = new Date();

  const mes = data.getMonth();

  let ano = data.getFullYear();

  if (mes === 11) {
    ano += 1;
  }

  for (let i = ano; i >= 2010; i--) {
    anos.push(i);
  }
  return anos;
};
