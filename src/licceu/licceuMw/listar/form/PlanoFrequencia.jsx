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
        <label htmlFor="freq1_freq2_canal">Canal</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq1_canal"
          id="freq1_canal"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="freq2_canal">Canal</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq2_canal"
          id="freq2_canal"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="freq1_frequencia_tx">Frequência (MHz)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq1_frequencia_tx"
          id="freq1_frequencia_tx"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="freq2_frequencia_tx">Frequência (MHz)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq2_frequencia_tx"
          id="freq2_frequencia_tx"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="freq1_polarizacao">Polarização (V/H)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq1_polarizacao"
          id="freq1_polarizacao"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="freq2_polarizacao">Polarização (V/H)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq2_polarizacao"
          id="freq2_polarizacao"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="freq1_potencia_tx_dbm_min">
          Potência TX Mínima (dBm)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq1_potencia_tx_dbm_min"
          id="freq1_potencia_tx_dbm_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="freq2_potencia_tx_dbm_min">
          Potência TX Mínima (dBm)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq2_potencia_tx_dbm_min"
          id="freq2_potencia_tx_dbm_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="freq1_potencia_tx_dbm_max">
          Potência TX Máxima (dBm)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq1_potencia_tx_dbm_max"
          id="freq1_potencia_tx_dbm_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="freq2_potencia_tx_dbm_max">
          Potência TX Máxima (dBm)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq2_potencia_tx_dbm_max"
          id="freq2_potencia_tx_dbm_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="freq1_potencia_tx_mw_min">
          Potência TX Mínima (mW)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq1_potencia_tx_mw_min"
          id="freq1_potencia_tx_mw_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="freq2_potencia_tx_mw_min">
          Potência TX Mínima (mW)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq2_potencia_tx_mw_min"
          id="freq2_potencia_tx_mw_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="freq1_potencia_tx_mw_max">
          Potência TX Máxima (mW)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq1_potencia_tx_mw_max"
          id="freq1_potencia_tx_mw_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="freq2_potencia_tx_mw_max">
          Potência TX Máxima (mW)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="freq2_potencia_tx_mw_max"
          id="freq2_potencia_tx_mw_max"
          disabled={isVisualizar}
        />
      </div>
    </form>
  </main>
);
