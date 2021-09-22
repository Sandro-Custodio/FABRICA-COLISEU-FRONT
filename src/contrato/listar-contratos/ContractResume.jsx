import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import get from "lodash/get";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import { LabelField } from "../../common/form/components";
import { getContractResume } from "../actions";

const ContractResume = ({
  contract,
  lpuContratosReducer,
  getContractResume
}) => {
  React.useEffect(() => {
    if (contract?.id) {
      Promise.all([getContractResume(contract.id)]);
    }
  });

  return (
    <div className="overlay-wrapper">
      <form>
        <div className="box-body">
          <Grid>
            <Row>
              <Field
                label="Provedor"
                name="vendor"
                cols="4"
                component={LabelField}
                data={contract.provedor}
                type="text"
              />
              <Field
                label="Contratante"
                name="contractor"
                cols="4"
                component={LabelField}
                data={contract.area_contratante}
                type="text"
              />
              <Field
                label="Gestor"
                name="manager"
                cols="4"
                component={LabelField}
                data={contract.gestor}
                type="text"
              />

              <Field
                label="Início de Vigência"
                name="contract_start_at"
                cols="4"
                component={LabelField}
                data={contract.contract_start_at}
                type="text"
              />
              <Field
                label="Data de Assinatura"
                name="sign_at"
                cols="4"
                component={LabelField}
                data={contract.data_assinatura}
                type="text"
              />
              <Field
                label="Término de Vigência"
                name="contract_end_at"
                cols="4"
                component={LabelField}
                data={contract.contract_end_at}
                type="text"
              />

              <Field
                label="Tipo"
                name="object_classification"
                cols="4"
                component={LabelField}
                data={contract.classificacao_objeto}
                type="text"
              />
              <Field
                label="Abrangência"
                name="range"
                cols="4"
                component={LabelField}
                data={contract.abrangencia}
                type="text"
              />
              <Field
                label="Última Alteração"
                name="updated_at"
                cols="4"
                component={LabelField}
                data={contract.updated_at}
                type="text"
              />

              <Field
                label="Produto"
                name="product"
                cols="4"
                component={LabelField}
                // data={contract_resume.contract_dependencies?.product}
                type="text"
              />
              <Field
                label="Contrato Provedor"
                name="vendor_contract"
                cols="4"
                component={LabelField}
                data={contract.contrato}
                type="text"
              />
              <Field
                label="Contrato TIM"
                name="automatic_contract"
                cols="4"
                component={LabelField}
                data={contract.contrato_automatico}
                type="text"
              />

              <Field
                label="Aditivos"
                name="additives_amount"
                cols="4"
                component={LabelField}
                // data={contract_resume.contract_dependencies_count?.qtd_aditivos}
                type="text"
              />
              <Field
                label="Anexos"
                name="attachments_amount"
                cols="4"
                component={LabelField}
                // data={contract_resume.contract_dependencies_count?.qtd_anexos}
                type="text"
              />
              <Field
                label="Cláusulas"
                name="clauses_amount"
                cols="4"
                component={LabelField}
                // data={contract_resume.contract_dependencies_count?.qtd_clauses}
                type="text"
              />

              <Field
                label="Rede"
                name="network"
                cols="4"
                component={LabelField}
                data={contract.rede}
                type="text"
              />
              <Field
                label="Objeto"
                name="contract_object"
                cols="4"
                component={LabelField}
                data={contract.objeto_contrato}
                type="text"
              />
              <Field
                label="Descrição"
                name="contract_object_description"
                cols="4"
                component={LabelField}
                data={contract.objeto_descricao}
                type="text"
              />
            </Row>
          </Grid>
        </div>
      </form>
    </div>
  );
};

const ContractResumeForm = reduxForm({ form: "ContractResume" })(
  ContractResume
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getContractResume
    },
    dispatch
  );

const mapStateToProps = (state, props) => {
  const product = get(
    state,
    "lpuContratosReducer.contract_resume.contract_dependencies.product",
    "N/A"
  );
  const additives_amount = get(
    state,
    "lpuContratosReducer.contract_resume.contract_dependencies_count.qtd_aditivos",
    "N/A"
  );
  const attachments_amount = get(
    state,
    "lpuContratosReducer.contract_resume.contract_dependencies_count.qtd_anexos",
    "N/A"
  );
  const clauses_amount = get(
    state,
    "lpuContratosReducer.contract_resume.contract_dependencies_count.qtd_clauses",
    "N/A"
  );
  const vendor = get(props, "contract.provedor", "vendor");
  const contractor = get(props, "contract.area_contratante", "contractor");
  const manager = get(props, "contract.gestor", "manager");
  const contract_start_at = new Date(
    get(props, "contract.contract_start_at", "contract_start_at")
  ).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });

  const sign_at = new Date(
    get(props, "contract.data_assinatura", "sign_at")
  ).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
  const contract_end_at = new Date(
    get(props, "contract.contract_end_at", "contract_end_at")
  ).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
  const object_classification = get(
    props,
    "contract.classificacao_objeto",
    "object_classification"
  );
  const range = get(props, "contract.abrangencia", "range");
  const updated_at = new Date(
    get(props, "contract.updated_at", "updated_at")
  ).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
  const vendor_contract = get(props, "contract.contrato", "vendor_contract");
  const automatic_contract = get(
    props,
    "contract.contrato_automatico",
    "automatic_contract"
  );
  const network = get(props, "contract.rede", "network");
  const contract_object = get(
    props,
    "contract.objeto_contrato",
    "contract_object"
  );
  const contract_object_description = get(
    props,
    "contract.objeto_descricao",
    "contract_object_description"
  );

  return {
    lpuContratosReducer: state.lpuContratosReducer,
    initialValues: {
      vendor,
      contractor,
      manager,
      contract_start_at,
      sign_at,
      contract_end_at,
      object_classification,
      range,
      updated_at,
      vendor_contract,
      automatic_contract,
      network,
      contract_object,
      contract_object_description,
      product,
      additives_amount,
      attachments_amount,
      clauses_amount
    },
    enableReinitialize: true
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractResumeForm);
