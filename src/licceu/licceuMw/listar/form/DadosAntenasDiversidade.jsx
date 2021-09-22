import React from "react";
import { Field } from "redux-form";

export default ({ isVisualizar }) => (
  <main className="fade-in fade-out">
    <form className="form">
      <div className="col-md-6">
        <label htmlFor="est1_sigla_2g">Estação 1</label>
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
        <label htmlFor="est2_sigla_2g">Estação 2</label>
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
        <label htmlFor="ant_sd1_modelo">Modelo</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd1_modelo"
          id="ant_sd1_modelo"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd2_modelo">Modelo</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd2_modelo"
          id="ant_sd2_modelo"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd1_certificado_homolog">
          Certificado de Homologação
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd1_certificado_homolog"
          id="ant_sd1_certificado_homolog"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd2_certificado_homolog">
          Certificado de Homologação
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd2_certificado_homolog"
          id="ant_sd2_certificado_homolog"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd1_polarizacao">Polarização (V/H)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd1_polarizacao"
          id="ant_sd1_polarizacao"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd2_polarizacao">Polarização (V/H)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd2_polarizacao"
          id="ant_sd2_polarizacao"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd1_altura_base">Altura (m)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd1_altura_base"
          id="ant_sd1_altura_base"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd2_altura_base">Altura (m)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd2_altura_base"
          id="ant_sd2_altura_base"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd1_diametro">Diâmetro (m)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd1_diametro"
          id="ant_sd1_diametro"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd2_diametro">Diâmetro (m)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd2_diametro"
          id="ant_sd2_diametro"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd1_azimute">Azimute (°)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd1_azimute"
          id="ant_sd1_azimute"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd2_azimute">Azimute (°)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd2_azimute"
          id="ant_sd2_azimute"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd1_ganho">Ganho (dBi)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd1_ganho"
          id="ant_sd1_ganho"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd2_ganho">Ganho (dBi)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd2_ganho"
          id="ant_sd2_ganho"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd1_angulo_meia_potencia">Ângulo (°)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd1_angulo_meia_potencia"
          id="ant_sd1_angulo_meia_potencia"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd2_angulo_meia_potencia">Ângulo (°)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd2_angulo_meia_potencia"
          id="ant_sd2_angulo_meia_potencia"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd1_frente_consta">Frente (dB)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd1_frente_consta"
          id="ant_sd1_frente_consta"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd2_frente_consta">Frente (dB)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd2_frente_consta"
          id="ant_sd2_frente_consta"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd1_peso">Peso (Kg)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd1_peso"
          id="ant_sd1_peso"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant_sd2_peso">Peso (Kg)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant_sd2_peso"
          id="ant_sd2_peso"
          disabled={isVisualizar}
        />
      </div>
    </form>
  </main>
);
