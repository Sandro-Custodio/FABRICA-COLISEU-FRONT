import React, { useState } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { Card, IconButton } from "common";
import { Select } from "common/input";
import {
  DateTimePickerField
} from "common/form/components";
import { connect, useSelector } from "react-redux";

import get from "lodash/get";
import { selectGroups } from "../actions";
import {
  isPermited,
  logUserMenuAccess,
  logCodeAndCallback
} from "auth/actions";

const FiltroConcilicao = ({
  dispatch,
  operator_id,
  vendor_id,
  rede,
  handleFilter,
  setGroups,
  groups,
  months,
  opAndVendors
}) => {
  const [groupLoading, setGroupLoading] = useState(false);
  const [forceReloadDateFields, setForceReloadDateFields] = useState(true);

  const handleChange = () => {
    setGroupLoading(true);
    selectGroups(operator_id, vendor_id, rede)
      .then(res => {
        setGroups(res.data);
        setGroupLoading(false);
      })
      .catch(error => {
        console.log(error.response);
        setGroupLoading(false);
      });
  };

  const handle_clear_filter = () => {
    dispatch(reset("FiltroConciliacao"))
    setForceReloadDateFields(false);
    setTimeout(() => {
      setForceReloadDateFields(true);
    }, 1);
  }

  const user = useSelector(({ auth: { user } }) => user.permissions);

  const select = [
   /* {
      key: "1",
      name: "month_begin",
      data: months,
      textKey: "mes",
      valueKey: "mes",
      component: Select,
      label: "Mês início",
      placeholder: "MM/YYYY",
      contentProps: "col-md-3",
      loading: months.length === 0
    }, */
    {
      key: "1",
      label: "Mês início",
      name: "month_begin",
      cols: "12 3",
      component: DateTimePickerField,
      onInput: e => e.target.value = "",
      time: false,
      formatacao: "MM/YYYY",
      contentProps: "col-md-3",
      visualizacao: ["year"]
    },
    {
      key: "2",
      name: "operator_id",
      data: opAndVendors[0],
      textKey: "regional",
      valueKey: "id",
      component: Select,
      label: "Regional",
      contentProps: "col-md-3",
      onBlur: () => handleChange(),
      loading: opAndVendors[0].length === 0
    },
    {
      key: "3",
      name: "vendor_id",
      data: opAndVendors[1],
      textKey: "name",
      valueKey: "id",
      component: Select,
      label: "Provedor",
      contentProps: "col-md-3",
      onBlur: () => handleChange(),
      loading: opAndVendors[1].length === 0
    },
    {
      key: "4",
      name: "group_id",
      data: groups,
      textKey: "name",
      valueKey: "id",
      component: Select,
      label: "Agrupador",
      contentProps: "col-md-3",
      loading: groupLoading
    },
   /* {
      key: "5",
      name: "month_end",
      data: months,
      textKey: "mes",
      valueKey: "mes",
      component: Select,
      label: "Mês fim",
      placeholder: "MM/YYYY",
      contentProps: "col-md-3",
      loading: months.length === 0
    }, */
    {
      key: "5",
      label: "Mês fim",
      name: "month_end",
      cols: "12 3",
      component: DateTimePickerField,
      onInput: e => e.target.value = "",
      time: false,
      formatacao: "MM/YYYY",
      contentProps: "col-md-3",
      visualizacao: ["year"]
    },
    {
      key: "6",
      name: "network",
      data: [
        { id: 1, label: "FIXA" },
        { id: 2, label: "MÓVEL" },
        { id: 3, label: "FIBER" }
      ],
      textKey: "label",
      valueKey: "label",
      component: Select,
      label: "Rede",
      contentProps: "col-md-3",
      onBlur: () => handleChange()
    },
    {
      key: "7",
      name: "status_id",
      data: opAndVendors[3],
      textKey: "description",
      valueKey: "id",
      component: Select,
      label: "Status",
      contentProps: "col-md-3",
      loading: opAndVendors[3].length === 0
    },
    {
      key: "8",
      name: "tipo_mercado",
      data: [
        { id: 1, label: "LL" },
        { id: 2, label: "LM" }
      ],
      textKey: "label",
      valueKey: "label",
      component: Select,
      label: "Tipo de Mercado",
      contentProps: "col-md-3"
    }
  ];

  return (
    <Card
      color="primary"
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {isPermited(user, "DR_COF1F1") && (
            <IconButton
              className="btn-success btn-sm"
              icon="search"
              onClick={() => logCodeAndCallback("DR_COF1F1", handleFilter)}
            >
              Filtrar
            </IconButton>
          )}
          <IconButton
            className="btn-primary btn-sm"
            icon="eraser"
            onClick={() => handle_clear_filter()}
          >
            Limpar
          </IconButton>
        </div>
      }
    >
      {forceReloadDateFields && select.map(todo => (
        <Field component={Select} {...todo} />
      ))}
    </Card>
  );
};

const formWrapper = reduxForm({
  form: "FiltroConciliacao"
})(FiltroConcilicao);

const mapStateToProps = ({ form: { FiltroConciliacao } }) => ({
  operator_id: get(FiltroConciliacao, "values.operator_id", null),
  vendor_id: get(FiltroConciliacao, "values.vendor_id", null),
  rede: get(FiltroConciliacao, "values.rede", null)
});

export default connect(mapStateToProps)(formWrapper);
