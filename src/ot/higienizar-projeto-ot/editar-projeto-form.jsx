import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Overlay from "../../common/msg/overlay/overlay";
import { reduxForm, Field, formValueSelector } from "redux-form";
import Row from "../../common/layout/row";
import Grid from "../../common/layout/grid";
import { DropdownListField } from "../../common/form/components";
import { loadFieldsOtForm, set_ot_project_multi, get_ots } from "./actions";

const _ = require("lodash");

class EditarProjetoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subProjectsFiltered: []
    };
  }

  componentDidMount() {
    const {
      listarOtHigienizar: { fields_ot_project_list }
    } = this.props;

    if (fields_ot_project_list.length === 0) this.handleLoadFieldsOtForm();
  }

  loadSubProjects = project_id => {
    const {
      change,
      listarOtHigienizar: { fields_ot_project_list }
    } = this.props;
    change("subproject", "");
    const sub_projects = _.get(fields_ot_project_list, "sub_projects");
    this.setState({
      subProjectsFiltered: sub_projects.filter(sub_project => {
        return sub_project.parent_id === project_id;
      })
    });
  };

  handleLoadFieldsOtForm = () => {
    const {
      loadFieldsOtForm
    } = this.props;
    loadFieldsOtForm();
  };

  submitForm = () => {
    const {
      set_ot_project_multi,
      project,
      subproject,
      listarOtHigienizar: { higienizar_ot_list },
      selection
    } = this.props;

    set_ot_project_multi(higienizar_ot_list, selection, project, subproject);
  };

  render() {
    const {
      listarOtHigienizar: { fields_ot_project_list },
      project,
      subproject,
      auth,
      get_ots
    } = this.props;

    const { subProjectsFiltered } = this.state;

    return (
      <div className="overlay-wrapper">
        <div className="box-body formatInputPlaceholder">
          <Row>
            <label>Projeto</label>
            <Field
              component={DropdownListField}
              cols="12"
              name="project"
              data={_.get(fields_ot_project_list, "projects")}
              textField={item => item.name}
              textValue={({ item }) => item.id}
              placeholder="Projeto"
              onChange={project => this.loadSubProjects(project.id)}
            />
          </Row>
          <Row>
            <label>Subprojeto</label>
            <Field
              component={DropdownListField}
              cols="12"
              name="subproject"
              disabled={subProjectsFiltered.length === 0}
              data={subProjectsFiltered}
              textField={item => item.name}
              textValue={({ item }) => item.id}
              placeholder="Sub-Projeto"
            />
          </Row>
        </div>
        <div className="box-footer">
          <Grid>
            <button
              type="submit"
              disabled={!(project && subproject)}
              className="btn btn-primary pull-right"
              onClick={() => {
                this.submitForm();
                setTimeout(() => {
                  get_ots(auth, fields_ot_project_list);
                }, 2000);
              }}
            >
              SALVAR
            </button>
          </Grid>
        </div>
        <Overlay />
      </div>
    );
  }
}

const Form = reduxForm({ form: "EditarProjetoForm" })(EditarProjetoForm);
const seletor = formValueSelector("EditarProjetoForm");
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadFieldsOtForm,
      set_ot_project_multi,
      get_ots
    },
    dispatch
  );

const mapStateToProps = state => ({
  auth: state.auth,
  listarOtHigienizar: state.listarOtHigienizar,
  subproject: seletor(state, "subproject"),
  project: seletor(state, "project")
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
