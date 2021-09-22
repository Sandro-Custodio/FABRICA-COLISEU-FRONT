import React from "react";
import Row from "common/layout/row";
import get from "lodash/get";
import { LabelInput } from "common/form/components";
import Section from "./Section";

export default ({ handleChange, describe }) => {

  const formatDate = (date) => new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" })

  const CustomField = ({ name, cols, ...others }) => (
    <LabelInput
      cols={cols && "6"}
      value={get(describe, name) || "[n/a]"}
      readOnly
      {...others}
    />
  );

  return (
    <Row>
      <Section col="3 3" row>
        <CustomField name="od_user_name" label="Solicitante" />
        <CustomField name="od_area_name" label="Área" />
        <div className="col-xs-12 ">
          <div className="form-group">
            <label htmlFor="rede">Data Abertura</label>
            <div className="input-group">
              <div className="input-group-addon">
                <i className="fa fa-calendar"></i>
              </div>
              <input
                id="date"
                type="text"
                disabled
                className="form-control"
                value={ get(describe, "created_at") ? formatDate(get(describe, "created_at")) : ""}
              />
            </div>
          </div>
        </div>
      </Section>
      <Section col="3 3" row>
        <div className="col-xs-12 ">
          <div className="form-group">
            <label htmlFor="rede">Rede</label>
            <select
              id="rede"
              className="form-control"
              name="rede"
              defaultValue={describe.rede}
              onChange={handleChange}
            >
              <option value="MÓVEL">MÓVEL</option>
              <option value="FIXA">FIXA</option>
            </select>
          </div>
        </div>
        <CustomField name="od_status" label="Status" />
        <CustomField name="projeto" label="Projeto" />
      </Section>
      <Section col="6 6" row>
        <CustomField cols name="segmento_mercado" label="Tipo de Mercado" />
        <div className="col-xs-6 ">
          <div className="form-group">
            <label htmlFor="study_origin">Fonte de Estudo</label>
            <select
              id="study_origin"
              className="form-control"
              name="study_origin"
              defaultValue={describe.study_origin}
              onChange={handleChange}
            >
              <option value="Discovery">Discovery</option>
              <option value="Rede">Rede</option>
              <option value="Wholesale">Wholesale</option>
              <option value="Zero LL">Zero LL</option>
            </select>
          </div>
        </div>

        <div className="col-xs-12 ">
          <div className="form-group">
            <label htmlFor="remarks">Observação</label>
            <textarea
              id="remarks"
              className="form-control"
              defaultValue={describe.remarks}
              style={{ height: 103 }}
              name="remarks"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </Section>
    </Row>
  );
};
