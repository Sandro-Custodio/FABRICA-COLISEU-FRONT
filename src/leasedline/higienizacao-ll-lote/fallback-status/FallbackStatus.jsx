import "./styles.css";
import React, { useState } from "react";
import Content from "common/adminLTE/content";
import Grid from "common/layout/grid";
import { Tab } from "common";
import ContentHeader from "common/adminLTE/contentHeader";
import get from "lodash/get";
import Operacao from "./Operacao";
import Anexar from "./Anexar";
import { columns, column_upload, select_status } from "./mock.json";

const FallbackStatus = () => {
  const [loading, setLoading] = useState(false);
  const [rowOperacao, setRowOperacao] = useState([]);
  const [uploadAnexar, setUploadAnexar] = useState([]);
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState("");

  const label = get(
    select_status.filter(n => n.id === selected)[0],
    "description",
    ""
  );

  const list = [
    {
      title: "Operação de Higienização",
      Comp: (
        <Operacao
          rowOperacao={rowOperacao}
          loading={loading}
          columns={columns}
          setRowOperacao={setRowOperacao}
          setLoading={setLoading}
          setChecked={setChecked}
          setUploadAnexar={setUploadAnexar}
          selected={selected}
          setSelected={setSelected}
        />
      )
    },
    {
      title: "Anexar Evidências",
      Comp: (
        <Anexar
          uploadAnexar={uploadAnexar}
          loading={loading}
          column_upload={column_upload}
          setUploadAnexar={setUploadAnexar}
          setLoading={setLoading}
          checked={checked}
          rowOperacao={rowOperacao}
          selected={selected}
          setRowOperacao={setRowOperacao}
          setChecked={setChecked}
          label={label}
          setSelected={setSelected}
        />
      )
    }
  ];

  return (
    <div className="fade-in fade-out" id="fallback-status">
      <div className="header">
        <ContentHeader title="Fallback" small="Atualização de Status" />
      </div>
      <Content>
        <Grid cols="12">
          <Tab tabList={list} />
        </Grid>
      </Content>
    </div>
  );
};

export default FallbackStatus;
