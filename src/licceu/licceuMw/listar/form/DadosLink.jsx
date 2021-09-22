/* eslint-disable react/no-array-index-key */
import React from "react";
import { Field } from "redux-form";

const status = [
  "ATIVADO",
  "PROJETO",
  "EM ANALISE",
  "EM ESTUDO",
  "DESATIVADO",
  "CANCELADO",
  "DESINSTALADO"
];

export default ({ isVisualizar }) => (
  <main className="fade-in fade-out">
    <form className="form">
      <div className="col-md-6">
        <label htmlFor="mwe_id">MW ID</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="mwe_id"
          id="mwe_id"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="vendor_name">Vendor</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="vendor_name"
          id="vendor_name"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="est1_regional_estacao">Regional A</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="est1_regional_estacao"
          id="est1_regional_estacao"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="est2_regional_estacao">Regional B</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="est2_regional_estacao"
          id="est2_regional_estacao"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="tipo_elemento_a">Tipo Elemento A</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="tipo_elemento_a"
          id="tipo_elemento_a"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="tipo_elemento_b">Tipo Elemento B</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="tipo_elemento_b"
          id="tipo_elemento_b"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="est1_sigla_2g">Sigla 2G A</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="est1_sigla_2g"
          id="est1_sigla_2g"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="est2_sigla_2g">Sigla 2G B</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="est2_sigla_2g"
          id="est2_sigla_2g"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="endereco_id_a">Endereço A</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="endereco_id_a"
          id="endereco_id_a"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="endereco_id_b">Endereço B</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="endereco_id_b"
          id="endereco_id_b"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="est1_municipio_estacao">Municipio A</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="est1_municipio_estacao"
          id="est1_municipio_estacao"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="est2_municipio_estacao">Municipio B</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="est2_municipio_estacao"
          id="est2_municipio_estacao"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="est1_uf_estacao">UF A</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="est1_uf_estacao"
          id="est1_uf_estacao"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="est2_uf_estacao">UF B</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="est2_uf_estacao"
          id="est2_uf_estacao"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="est1_latitude_wgs84">Latitude A (WGS 84)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="est1_latitude_wgs84"
          id="est1_latitude_wgs84"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="est2_latitude_wgs84">Latitude B (WGS 84)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="est2_latitude_wgs84"
          id="est2_latitude_wgs84"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="est1_longitude_wgs84">Longitude A (WGS 84)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="est1_longitude_wgs84"
          id="est1_longitude_wgs84"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="est2_longitude_wgs84">Longitude B (WGS 84)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="est2_longitude_wgs84"
          id="est2_longitude_wgs84"
          disabled
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="status">Status</label>
        <Field
          component="select"
          className="form-control input-sm"
          name="status"
          id="status"
          disabled={isVisualizar}
        >
          {status.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </Field>
      </div>

      <div className="col-md-6">
        <label htmlFor="chave">Chave</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="chave"
          id="chave"
          disabled={isVisualizar}
        />
      </div>
    </form>
  </main>
);
