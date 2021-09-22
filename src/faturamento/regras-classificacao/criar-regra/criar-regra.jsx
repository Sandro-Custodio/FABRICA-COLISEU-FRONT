import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, clearFields} from "redux-form";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";

import {
  DropdownListField,
  LabelField
} from "common/form/components";

import { get_class_groups, save_roles_and_items } from "../actions";
import { toastr } from "react-redux-toastr";

const _ = require("lodash");

const required = value => value ? undefined : 'Campo obrigatório';

const toInputUppercase = e => {
  e.target.value = ("" + e.target.value).toUpperCase();
};

const Rule_row = ({
  row_id,
  delete_row,
  add_row,
  billDdColumns,
  billDdSqlOperations,
  toInputUppercase,
  ...others
}) => {
  return(
    <Row>
      <Field
        name={"name"+row_id}
        cols="12 2"
        component={DropdownListField}
        placeholder="Selecione:"
        data={billDdColumns}
        textField={item => item.label}
        textValue={({ item }) => item}
        validate={required}
      />
      <Field
        name={"operation"+row_id}
        cols="12 2"
        component={DropdownListField}
        placeholder="Selecione:"
        data={billDdSqlOperations}
        textField={item => item.label}
        textValue={({ item }) => item}
        validate={required}
      />
      <Field
        name={"clean_value"+row_id}
        cols="12 2"
        component={LabelField}
        validate={required}
        onInput={toInputUppercase}
      />
      <Field
        name={"combo_end"+row_id}
        cols="12 2"
        component={DropdownListField}
        placeholder="Selecione:"
        data={['(',')',' OU ', ') OU ', ' OU (',') OU (',' E ',') E ',' E (',') E (',') )' ]}
        textField={item => item}
        textValue={({ item }) => item}
        validate={required}
      />
      <Grid cols="12 2">
        <Row>
          <button
            className="btn btn-success"
            type="button"
            onClick={() => add_row()}
          >
            <i className="fa fa-plus"></i>
          </button>
          {row_id != 1 && (
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => delete_row(row_id)}
            >
              <i className="fa fa-minus"></i>
            </button>
          )}
        </Row>
      </Grid>
    </Row>
  );
}

Rule_row.defaultProps = {
  row_id: 0,
  toInputUppercase: toInputUppercase
};

const RuleRows = ({
  rowArray,
  handleAddRow,
  handleDeleteRow,
  billDdColumns,
  billDdSqlOperations
}) =>{
  const rules = rowArray.map((item) => {
    return (
      <Rule_row
        row_id={item}
        add_row={handleAddRow}
        delete_row={handleDeleteRow}
        billDdColumns={billDdColumns}
        billDdSqlOperations={billDdSqlOperations}
      />)
  });

  return(<>{rules}</>);
}

const CriarRegra = props => {

  const {
    criarRegraForm,
    listarRegrasForm,
    regrasClassificacaoReducer: {
      groups,
      billDdColumns,
      billDdSqlOperations
    },
    auth,
    get_class_groups,
    save_roles_and_items,
    handleFilter,
    bill
  } = props;

  const [rowArray, setRowArray] = React.useState([1]);

  const handleAddRow = () => {
    var aux = (Math.max.apply(Math, rowArray.map((o) => { return o; }))+1);
    setRowArray(rowArray.concat(aux));
  };

  const handleDeleteRow = rowNum => {
    const remainder = rowArray.filter((row) => {
      if(row !== rowNum) return row;
    });
    props.clearFields('CriarRegra', false, false, [`name${rowNum}`]);
    props.clearFields('CriarRegra', false, false, [`operation${rowNum}`]);
    props.clearFields('CriarRegra', false, false, [`clean_value${rowNum}`]);
    props.clearFields('CriarRegra', false, false, [`combo_end${rowNum}`]);
    setRowArray(remainder);
  };

  const handleClearRules = () => {
    rowArray.map((item) => {
      props.clearFields('CriarRegra', false, false, [`name${item}`]);
      props.clearFields('CriarRegra', false, false, [`operation${item}`]);
      props.clearFields('CriarRegra', false, false, [`clean_value${item}`]);
      props.clearFields('CriarRegra', false, false, [`combo_end${item}`]);
    });
    props.clearFields('CriarRegra', false, false, ['nome']);
    props.clearFields('CriarRegra', false, false, ['group']);
    props.clearFields('CriarRegra', false, false, ['combo_home']);
    setRowArray([1]);
  };

  const handleSubmit = () => {
    var openParenthesisCount = 0;
    var closedParenthesisCount = 0;
    openParenthesisCount  += criarRegraForm.values.combo_home.match(/\(/g || []).length;
    rowArray.map((value) => {
      var combo_endval = "combo_end"+value;
      openParenthesisCount += (criarRegraForm.values[combo_endval].match(/\(/g || []) || []).length;
      closedParenthesisCount += (criarRegraForm.values[combo_endval].match(/\)/g || []) || []).length;
    });
    var rede;
    var vendor_id;
    if (bill && bill.vendor && bill.network){
      rede = bill.network;
      vendor_id = bill.vendor.id;
    }else {
      rede = listarRegrasForm.values.network;
      vendor_id = listarRegrasForm.values.vendor.id;
    }
    if(openParenthesisCount === closedParenthesisCount){
      const params = {
        roles_items:{
          label_name:"",
          class_group:"",
          open_user_id: auth.user.id,
          clean_value:"",
          logical_order:"",
          sql_operation:"",
          operation:"",
          logical_view:"",
          rede: rede,
          value:"",
          name:"",
          left_string:"",
          vendor_id: vendor_id,
          right_string:"",
          field_name:""
        },
        new_roles_items: [],
        type: "new"
      };
      var last_val;
      rowArray.map((value) => {
        var nameval = "name"+value
        var operationval = "operation"+value
        var clean_valueval = "clean_value"+value
        var combo_endval = "combo_end"+value
        if(value === 1){
          params.roles_items.label_name = criarRegraForm.values[nameval].label
          params.roles_items.field_name = criarRegraForm.values[nameval].column_name

          params.roles_items.sql_operation = criarRegraForm.values[operationval].sql_function
          params.roles_items.operation = criarRegraForm.values[operationval].label

          params.roles_items.clean_value = criarRegraForm.values[clean_valueval]
          params.roles_items.value = mountValue(params.roles_items.operation, params.roles_items.clean_value )

          params.roles_items.class_group = criarRegraForm.values.group.name
          params.roles_items.name = criarRegraForm.values.nome

          params.roles_items.left_string = criarRegraForm.values.combo_home
          params.roles_items.right_string = criarRegraForm.values[combo_endval]
          var logical_string = params.roles_items.right_string;
          logical_string = logical_string.replace(/ E /gi, " AND ")
          logical_string = logical_string.replace(/ OU /gi, " OR ")
          params.roles_items.logical_order = params.roles_items.left_string+" "+params.roles_items.field_name+" "+params.roles_items.sql_operation+" "+params.roles_items.value+" "+logical_string
          params.roles_items.logical_view = params.roles_items.left_string+" "+params.roles_items.label_name+" "+params.roles_items.operation+" "+params.roles_items.clean_value+" "+params.roles_items.right_string
        }else{
          var aux = {
            label_name: criarRegraForm.values[nameval].label,
            field_name: criarRegraForm.values[nameval].column_name,
            sql_operation: criarRegraForm.values[operationval].sql_function,
            operation: criarRegraForm.values[operationval].label,
            clean_value: criarRegraForm.values[clean_valueval],
            value: mountValue(criarRegraForm.values[operationval].label, criarRegraForm.values[clean_valueval]),
            left_string: criarRegraForm.values["combo_end"+last_val],
            right_string: criarRegraForm.values[combo_endval]
          }
          var logical_string = aux.right_string;
          logical_string = logical_string.replace(/ E /gi, " AND ")
          logical_string = logical_string.replace(/ OU /gi, " OR ")
          params.roles_items.logical_order = params.roles_items.logical_order+" "+aux.field_name+" "+aux.sql_operation+" "+aux.value+" "+logical_string
          params.roles_items.logical_view = params.roles_items.logical_view+" "+aux.label_name+" "+aux.operation+" "+aux.clean_value+" "+aux.right_string
          params.new_roles_items.push(aux);
        }
        last_val = value;
      });
      save_roles_and_items(params);
    }else{
      toastr.warning("O número de parênteses abertos tem que ser iguais aos de fechados!","",{timeOut: 6000});
    }
  };

  const mountValue = (operation,val) => {
    var value = "'" + val + "'";
    if (operation == 'CONTÉM' || operation == 'NÃO CONTÉM'){
      value = "'%" + val + "%'"
    }else if (operation == 'COMEÇA COM'){
      value = "'" + val + "%'";
    }else if (operation == 'TERMINA COM'){
      value = "'%" + val + "'";
    }else if (operation == 'ESTÁ NA LISTA' || operation == 'NÃO ESTÁ NA LISTA'){
      if (val.split(',').length > 1){
        var array = val.split(',');
        value = "(";
        for (var i=0; i < array.length; i++){
          if (i>0){
            value += ",'" + array[i] + "'";
          }else{
            value += "'" + array[i] + "'";
          }
        }
        value += ")";
      }else{
        value = "('" + val + "')";
      }
    }
    return value;
  };

  React.useEffect(() => {
    get_class_groups()
    handleClearRules()
  },[]);

  return (
    <div className="overlay-wrapper" width="device-width">
      <div className="">
        <div className="box box-body">
          <Grid style={{padding: '1vw'}}>
            <Row>
              <Field
                label="Nome"
                name="nome"
                cols="12 2"
                component={LabelField}
                validate={required}
                onInput={toInputUppercase}
              />
              <Field
                label="Grupo"
                name="group"
                cols="12 3"
                component={DropdownListField}
                placeholder="Selecione:"
                data={groups}
                textField={item => item.name}
                textValue={({ item }) => item.name}
                validate={required}
              />
            </Row>
            <Row>
              <Field
                name="combo_home"
                cols="12 1"
                component={DropdownListField}
                placeholder="Selecione:"
                data={['(','((']}
                textField={item => item}
                textValue={({ item }) => item}
                validate={required}
              />
            </Row>
            <RuleRows
              rowArray={rowArray}
              handleAddRow={handleAddRow}
              handleDeleteRow={handleDeleteRow}
              billDdColumns={billDdColumns}
              billDdSqlOperations={billDdSqlOperations}
            />
          </Grid>
        </div>
        <div className="box box-footer">
          <Grid style={{padding: '1vw'}}>
            <Row>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleSubmit()
                  setTimeout(() => {
                    handleFilter()
                  }, 1000)
                }}
                disabled={(criarRegraForm && criarRegraForm.syncErrors)}
              >
                Salvar Regra
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => handleClearRules()}
              >
                Limpar Regra
              </button>
            </Row>
          </Grid>
        </div>
      </div>
      <Overlay />
    </div>
  );
};

const Form = reduxForm({ form: "CriarRegra" })(CriarRegra);

const mapDispatchToProps = dispatch => bindActionCreators({
  get_class_groups,
  save_roles_and_items
}, dispatch);

const mapStateToProps = state => {
  return {
    criarRegraForm: state.form.CriarRegra,
    listarRegrasForm: state.form.ListarRegras,
    regrasClassificacaoReducer: state.regrasClassificacaoReducer,
    auth: state.auth
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
