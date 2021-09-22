import React from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
import ContentHeader from "common/adminLTE/contentHeader";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import ModalForm from "common/layout/modal";
import IconButton from "common/iconButton";
import { DropdownListField } from "common/form/components";
import { Grid as DxGrid } from "@devexpress/dx-react-grid-bootstrap3";
import Table from "common/table";
import ToolBarColumn from "./toolBarColumn";

import CadastrarAgrupador from "./cadastrar-agrupador/index.jsx";
import EditarAgrupador from "./editar-agrupador/index.jsx";
import AtivarDesativarGroup from "./ativar-desativar-agrupador/index.jsx";
import VisualizarHistorico from "./visualizar-historico/index.jsx";

import {
  get_operators_and_vendors,
  resetForm,
  get_groups,
  get_all_groups_by_filter,
  get_group_history,
  export_all
} from "./actions";

const Root = props => <DxGrid.Root {...props} style={{ height: "32vw" }} />;

const ListarAgrupadores = props => {
  const {
    auth,
    listGroupForm,
    agrupadoresReducer: { operators, vendors, groups, columns, columnsWidth, list },
    //actions
    get_operators_and_vendors,
    resetForm,
    get_groups,
    get_all_groups_by_filter,
    get_group_history,
    export_all
  } = props;

  const user = useSelector(({ auth: { user } }) => user.permissions);

  const [selection, setSelection] = React.useState([]);

  const onSelectionChange = selection => {
    setSelection(selection);
  };

  React.useEffect(() => {
    Promise.all([get_operators_and_vendors()]);
  }, []);

  const searchGroups = () => {
    setSelection([]);
    Promise.all([
      get_all_groups_by_filter({
        group: listGroupForm?.values?.group?.id,
        network: listGroupForm?.values?.network,
        operator_id: listGroupForm?.values?.operators?.id,
        vendor_id: listGroupForm?.values?.vendors?.id
      })
    ]);
  };

  const access_token = useSelector(({ auth }) => auth.user.access_token);


  return (
    <div className="overlay-wrapper">
      <div className="header" style={{ paddingBottom: "1vw" }}>
        <ContentHeader title="Listar" small="Agrupadores" />
      </div>
      <form>
        <div className="body">
          <Grid cols="12">
            <Row>
              <Field
                label="Regional"
                name="operators"
                cols="12 2"
                component={DropdownListField}
                data={operators}
                textField={item => item.regional}
                textValue={({ item }) => item.id}
                placeholder={"Selecione"}
                type="text"
                onBlur={() =>
                  Promise.all([
                    get_groups(
                      listGroupForm?.values?.operators?.id,
                      listGroupForm?.values?.vendors?.id
                    )
                  ])
                }
              />
              <Field
                label="Provedor"
                name="vendors"
                cols="12 2"
                component={DropdownListField}
                data={vendors}
                textField={item => item.name}
                textValue={({ item }) => item.id}
                placeholder={"Selecione"}
                type="text"
                onBlur={() =>
                  Promise.all([
                    get_groups(
                      listGroupForm?.values?.operators?.id,
                      listGroupForm?.values?.vendors?.id
                    )
                  ])
                }
              />
              <Field
                label="Agrupador"
                name="group"
                cols="12 2"
                component={DropdownListField}
                data={groups}
                textField={item => item.name}
                textValue={({ item }) => item.id}
                placeholder={"Selecione"}
                type="text"
              />
              <Field
                label="Rede"
                name="network"
                cols="12 2"
                component={DropdownListField}
                data={["MÓVEL", "FIXA", "FIBER"]}
                textField={item => item}
                textValue={({ item }) => item}
                placeholder={"Selecione"}
                type="text"
              />
              <div style={{ paddingTop: "1.3vw" }}>
                <Grid cols="12 1">
                  <Row>
                    <Grid cols="6">
                      <IconButton
                        icon="search"
                        title="Filtrar"
                        // disabled={!listGroupForm?.values?.vendors}
                        onClick={() => searchGroups()}
                      />
                    </Grid>
                    <Grid cols="6">
                      <IconButton
                        icon="eraser"
                        title="Limpar"
                        onClick={() => resetForm("ListarAgrupadores")}
                      />
                 
                    </Grid>
                  </Row>
                </Grid>
              </div>
            </Row>
            <Row>
              <div style={{ padding: "1vw" }}>
                <Table
                  columns={columns}
                  columnWidths={columnsWidth}
                  rows={list}
                  selectionProps={{ selection, onSelectionChange }}
                  selectByRowClick={true}
                  disablePagination={true}
                  rootComponent={Root}
                  virtualTable={true}
                  toolBarComp={
                    <ToolBarColumn
                      selection={selection}
                      list={list}
                      user={user}
                      resetForm={resetForm}
                      get_group_history={get_group_history}
                    />
                  }
                />
                     <IconButton
                        icon="file-excel-o"
                        title="Exportar Todo o Resultado"
                        onClick={() => export_all({
                          filter: {
                            group: listGroupForm?.values?.group?.id,
                            network: listGroupForm?.values?.network,
                            operator_id: listGroupForm?.values?.operators?.id,
                            vendor_id: listGroupForm?.values?.vendors?.id
                          }, access_token
                        })}
                      />
              </div>
            </Row>
          </Grid>
        </div>
      </form>
      <Overlay />
      <ModalForm
        LabelButtonSubmit="Cadastrar Agrupador"
        id={"cadastrar_agrupador"}
        title="Cadastrar Agrupador"
        dimension="modal-lg"
        height="55vw"
      >
        <CadastrarAgrupador reloadParent={searchGroups} />
      </ModalForm>
      {list && selection?.length === 1 && (
        <>
          <ModalForm
            LabelButtonSubmit="Editar Agrupador"
            id={"editar_agrupador"}
            title="Editar Agrupador"
            dimension="modal-lg"
            height="55vw"
          >
            <EditarAgrupador
              reloadParent={searchGroups}
              row={list[selection]}
            />
          </ModalForm>
          <ModalForm
            LabelButtonSubmit="Ativar/Desativar Agrupador"
            id={"desativar_agrupador"}
            title="Ativar/Desativar Agrupador"
            dimension="modal"
            height="36vw"
          >
            <AtivarDesativarGroup
              reloadParent={searchGroups}
              row={list[selection]}
            />
          </ModalForm>
          <ModalForm
            LabelButtonSubmit="Visualizar Histórico"
            id={"visualizar_historico_agrupador"}
            title="Visualizar Histórico"
            dimension="modal-lg"
            height="36vw"
          >
            <VisualizarHistorico
              reloadParent={() =>
                Promise.all([get_group_history(list[selection]?.id)])
              }
            />
          </ModalForm>
        </>
      )}
    </div>
  );
};

const Form = reduxForm({ form: "ListarAgrupadores" })(ListarAgrupadores);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_operators_and_vendors,
      resetForm,
      get_groups,
      get_all_groups_by_filter,
      get_group_history,
      export_all
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    auth: state.auth,
    listGroupForm: state.form.ListarAgrupadores,
    agrupadoresReducer: state.agrupadoresReducer
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
