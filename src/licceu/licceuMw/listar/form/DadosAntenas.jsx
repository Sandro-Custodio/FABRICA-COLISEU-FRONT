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
        <label htmlFor="ant1_fabricante">Fabricante</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant1_fabricante"
          id="ant1_fabricante"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant2_fabricante">Fabricante</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant2_fabricante"
          id="ant2_fabricante"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant1_polarizacao">Dual/Single POL</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant1_polarizacao"
          id="ant1_polarizacao"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant2_polarizacao">Dual/Single POL</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant2_polarizacao"
          id="ant2_polarizacao"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant1_altura_base">
          Altura(m) em Relação a Base (estrutura + torre)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant1_altura_base"
          id="ant1_altura_base"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant2_altura_base">
          Altura(m) em Relação a Base (estrutura + torre)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant2_altura_base"
          id="ant2_altura_base"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant1_diametro">Diâmetro (m)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant1_diametro"
          id="ant1_diametro"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant2_diametro">Diâmetro (m)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant2_diametro"
          id="ant2_diametro"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant1_azimute">Azimute (°)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant1_azimute"
          id="ant1_azimute"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant2_azimute">Azimute (°)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant2_azimute"
          id="ant2_azimute"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant1_ganho">Ganho (dBi)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant1_ganho"
          id="ant1_ganho"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant2_ganho">Ganho (dBi)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant2_ganho"
          id="ant2_ganho"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant1_tilt">Tilt (°)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant1_tilt"
          id="ant1_tilt"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant2_tilt">Tilt (°)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant2_tilt"
          id="ant2_tilt"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant1_angulo_meia_potencia">
          Ângulo Meia Potência (°)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant1_angulo_meia_potencia"
          id="ant1_angulo_meia_potencia"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant2_angulo_meia_potencia">
          Ângulo Meia Potência (°)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant2_angulo_meia_potencia"
          id="ant2_angulo_meia_potencia"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant1_peso">Peso (Kg)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant1_peso"
          id="ant1_peso"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant2_peso">Peso (Kg)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant2_peso"
          id="ant2_peso"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant1_numero_cabos">Cabos</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant1_numero_cabos"
          id="ant1_numero_cabos"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant2_numero_cabos">Cabos</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant2_numero_cabos"
          id="ant2_numero_cabos"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant1_diametro_cabo">Diâmetro dos Cabos</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant1_diametro_cabo"
          id="ant1_diametro_cabo"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant2_diametro_cabo">Diâmetro dos Cabos</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant2_diametro_cabo"
          id="ant2_diametro_cabo"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant1_comprimento_cabo">Comprimento dos Cabos (m)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant1_comprimento_cabo"
          id="ant1_comprimento_cabo"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ant2_comprimento_cabo">Comprimento dos Cabos (m)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="ant2_comprimento_cabo"
          id="ant2_comprimento_cabo"
          disabled={isVisualizar}
        />
      </div>
    </form>
  </main>
);
