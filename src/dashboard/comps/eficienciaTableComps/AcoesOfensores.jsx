import React from 'react'
import { TextareaField } from "common/form/components";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { saveAuxiliarTables } from "../../actions";
import Row from "common/layout/row";
import get from "lodash/get";
import { toastr } from "react-redux-toastr";
import {isPermited,logCodeAndCallback} from "auth/actions";
import { IconButton } from "common";





function AcoesOfensores(props) {

  const { acoesOfensoresForm } = props;
  const user = useSelector(({ auth: { user } }) => user.permissions);
  const project = useSelector(state => state.dashboard.project);
  const area = useSelector(state => state.dashboard.titleCurrent);
  const year = useSelector(state => state.dashboard.yearChoosed);
  const [disabled, setDisabled] = React.useState(false);


  const handleSubmit = () => {
    setDisabled(true)
    saveAuxiliarTables(project, area, acoesOfensoresForm, year).then(res => {
      if (res.status === 200) {
        setTimeout(() => {
          toastr.success("Ação salva com sucesso");
        }, 1000)
      }
    })
      .catch(error => {
        toastr.error("Erro", error);
      }).finally(setDisabled(false))
  };

  return (
    <div>
      <div className="box box-default" style={{ padding: "15px" , fontSize: "medium"}}>
        <h3 className="box-title">Ações Ofensoras</h3>
        <Row>
          <Field
            label="Realizado"
            component={TextareaField}
            name="acoesDone"
            rows="5"
            cols="12"
            maxLength={500}
          />
        </Row>
        <Row>
          <Field
            label="Em Verificação"
            component={TextareaField}
            name="acoesEmverificacao"
            rows="5"
            cols="12"
            maxLength={500}
          />
        </Row>
        <Row>
          {isPermited(user, "DR_COZ2") && (
            <IconButton
              style={{ marginLeft: "180px" }}
              onClick={() => logCodeAndCallback("DR_COZ2", handleSubmit)}
              disabled={disabled}
              className="btn btn-success"
            >
              SALVAR
            </IconButton>
          )}
        </Row>
      </div>
    </div>
  )
}
const formWrapper = reduxForm({ form: "AcoesOfensores" })(AcoesOfensores);

const mapStateToProps = (state, props) => {
  const acoesDone = get(props, "acoesOfensoras.done");
  const acoesEmverificacao = get(props, "acoesOfensoras.em_verificacao");
  return {
    acoesOfensoresForm: state.form.AcoesOfensores,
    enableReinitialize: true,
    initialValues: {
      acoesDone,
      acoesEmverificacao
    }
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  saveAuxiliarTables
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(formWrapper);
