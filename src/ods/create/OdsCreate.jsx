import React, { useState, useReducer } from "react";
import { connect } from "react-redux";
import axios from "axios";
import get from "lodash/get";
import { toastr } from "react-redux-toastr";
import Content from "common/adminLTE/content";
import Grid from "common/layout/grid";
import ContentHeader from "common/adminLTE/contentHeader";
import Panel from "common/Panel";
import IconButton from "common/iconButton";
import OdsCreateTable from "./OdsCreateTable";
import OdsCreateForm from "./OdsCreateForm";

const onSelectionChange = (state, index) => index;

const OdsCreate = ({ new_od, auth: { id, area_id }, rede }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useReducer(onSelectionChange, []);
  const leasedlines = selection.map(el => get(rows[el], "id", []));

  const generateShutdownOrder = () => {
    const data = {
      new_od: {
        ...new_od,
        user_area_id: area_id,
        user_id: id,
        status_id: parseInt(new_od.status_id, 10),
        project_id: parseInt(new_od.project_id, 10)
      },
      leasedlines,
      rede,
      segmento_mercado: new_od.segmento_mercado
    };
    console.log("new OD", data);
    let error_message = validateData(data);

    if(error_message.length == 0){
      setLoading(true);
      axios
        .post("ods/generate_shutdown_order", data)
        .then(res => {
          setRows([]);
          toastr.success("OD criada com sucesso", res.data.code, {timeOut: 0});
        })
        .catch(() => toastr.error("ERRO", "Erro ao criar ODS"))
        .finally(() => {
          setSelection([]);
          setLoading(false);
        });
    }else{
      toastr.error("ERRO",error_message,{timeOut: 8000});
    }
  };

  const validateData = data => {
    let error_message = "";
    if(!data.rede)
      error_message += "Campo Rede em branco. ";
    if(data.rede === "FIXA" && !data.segmento_mercado)
      error_message += "Campo Tipo de mercado em branco. ";
    if(!data.new_od.project_id)
      error_message += "Campo Projetos em branco. ";
    if(!data.new_od.study_origin)
      error_message += "Campo Fonte de Estudo em branco. ";
    return error_message;
  };

  return (
    <div className="fade-in fade-out">
      <div className="header">
        <div className="header__left-items">
          <ContentHeader title="Criar" small="ODS" />
        </div>
      </div>
      <Content>
        <Grid cols="12">
          <Panel
            footer={
              <IconButton
                icon="save"
                title="Salvar"
                onClick={generateShutdownOrder}
                disabled={selection.length === 0}
                className="btn-primary"
              >
                Salvar
              </IconButton>
            }
          >
            <OdsCreateForm setRows={setRows} setLoading={setLoading} />
            <OdsCreateTable
              rows={rows}
              loading={loading}
              setSelection={setSelection}
              selection={selection}
            />
          </Panel>
        </Grid>
      </Content>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: get(state.auth, "user", {}),
    new_od: get(state.form.createODS, "values", {}),
    rede: get(state, "form.createODS.values.rede")
  };
};

export default connect(mapStateToProps)(OdsCreate);
