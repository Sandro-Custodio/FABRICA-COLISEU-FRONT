import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Label } from "common/form/components";
import get from "lodash/get";

const FieldComp = ({ col, ...others }) => (
  <div className={`col-sm-${col}`}>
    <Field
      className="form-control input-sm"
      type="text"
      component="input"
      {...others}
    />
  </div>
);

FieldComp.defaultProps = {
  col: 6
};

const LabelComp = ({ text }) => (
  <div className="col-sm-6">
    <Label text={text} />
  </div>
);

const Row = ({ children }) => <div className="row">{children}</div>;

function getUniqueArray(arr = [], compareProps = []) {
  let modifiedArray = [];
  let clearArray = [];
  if (compareProps.length === 0 && arr.length > 0)
    compareProps.push(...Object.keys(arr[0]));
  arr.map(item => {
    if (modifiedArray.length === 0) {
      modifiedArray.push(item);
    } else {
      if (!modifiedArray.some(item2 =>
        compareProps.every(eachProps => item2[eachProps] === item[eachProps])
      )) { 
        modifiedArray.push(item); 
      }
    }
  });

  clearArray = modifiedArray.filter( x => x.grupoAll !== null);

 // return modifiedArray;
  return clearArray;
}

const statusContrato = [
  { tipo: "Ativo" },
  { tipo: "Inativo" },
  { tipo: "Todos" }
];

const objetoContrato = [{ tipo: "INFRA" }, { tipo: "EILD" }];

const FormFilter = ({
  redeList,
  abrangenciaList,
  contratoTimList,
  contratoProvedorList,
  detalheObjetoList,
  provedorList,
  grupoList
}) => {
  return (
    <form className="form">
      <Row>
        <LabelComp text="Rede" />
        <FieldComp name="network" component="select">
          <option value="">Selecione</option>
          {redeList.map((data, i) => (
            <option key={i} value={data.rede}>
              {data.rede}
            </option>
          ))}
        </FieldComp>
        <LabelComp text="Provedor" />
        <FieldComp
          name="vendor_id"
          component="select"
          parse={value => parseInt(value, 10)}
        >
          <option value="">Selecione</option>
          {provedorList.map((data, i) => (
            <option key={i} value={data.provedorId}>
              {data.provedor}
            </option>
          ))}
        </FieldComp>
        <LabelComp text="Grupo" />
        <FieldComp
          name="grupo" component="select">
          <option value="">Selecione</option>
          {getUniqueArray(grupoList).map((data, i) => (
            <option key={i} value={data.grupoAll}>
              {data.grupoAll}
            </option>
          ))}
        </FieldComp>
        <LabelComp text="Contrato Tim" />
        <FieldComp name="contract_tim" component="select">
          <option value="">Selecione</option>
          {contratoTimList.map((data, i) => (
            <option key={i} value={data.contratoTim}>
              {data.contratoTim}
            </option>
          ))}
        </FieldComp>
        <LabelComp text="Contrato Provedor" />
        <FieldComp name="contract" component="select">
          <option value="">Selecione</option>
          {contratoProvedorList.map((data, i) => (
            <option key={i} value={data.contratoProvedor}>
              {data.contratoProvedor}
            </option>
          ))}
        </FieldComp>
        <LabelComp text="Status Contrato" />
        <FieldComp name="status_contrato" component="select">
          <option value="">Selecione</option>
          {statusContrato.map((data, i) => (
            <option key={i} value={data.tipo}>
              {data.tipo}
            </option>
          ))}
        </FieldComp>
        <LabelComp text="Objeto" />
        <FieldComp name="objeto" component="select">
          <option value="">Selecione</option>
          {objetoContrato.map((data, i) => (
            <option key={i} value={data.tipo}>
              {data.tipo}
            </option>
          ))}
        </FieldComp>

        <LabelComp text="Detalhe Objeto" />
        <FieldComp name="detalhe_objeto" component="select">
          <option value="">Selecione</option>
          {detalheObjetoList.map((data, i) => (
            <option key={i} value={data.detalheObjeto}>
              {data.detalheObjeto}
            </option>
          ))}
        </FieldComp>
        <LabelComp text="Abrangência" />
        <FieldComp name="abrangencia" component="select">
          <option value="">Selecione</option>
          {abrangenciaList.map((data, i) => (
            <option key={i} value={data.abrangencia}>
              {data.abrangencia}
            </option>
          ))}
        </FieldComp>
      </Row>
    </form>
  );
};

/*const mapStateToProps = state => {
  return {
    initialValues: {
      status_contrato: "Ativo"
    },
    enableReinitialize: true
  };
}; */

const formWrapper = reduxForm({
  form: "FiltroContratos"
})(FormFilter);

//export default connect(mapStateToProps)(formWrapper);
export default connect()(formWrapper);
