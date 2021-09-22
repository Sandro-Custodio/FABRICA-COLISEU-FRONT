import React from "react";
import { Field } from "redux-form";

export default ({ isVisualizar }) => (
  <main className="fade-in fade-out">
    <form className="form">
      <div className="col-md-6">
        <label htmlFor="modelo_min">Modelo Mínimo</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="modelo_min"
          id="modelo_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="modelo_max">Modelo Máximo</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="modelo_max"
          id="modelo_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="modulacao_min">Modulação Mínima</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="modulacao_min"
          id="modulacao_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="modulacao_max">Modulação Máxima</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="modulacao_max"
          id="modulacao_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="capacidade_min">Capacidade Mínima (Mbps)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="capacidade_min"
          id="capacidade_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="capacidade_max">Capacidade Máxima (Mbps)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="capacidade_max"
          id="capacidade_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="configuracao_min">Configuração Mínima</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="configuracao_min"
          id="configuracao_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="configuracao_max">Configuração Máxima</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="configuracao_max"
          id="configuracao_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-12">
        <label htmlFor="faixa_frequencia">Faixa de Frequência (GHz)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="faixa_frequencia"
          id="faixa_frequencia"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="largura_banda_min">Largura da Banda Mínima (MHz)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="largura_banda_min"
          id="largura_banda_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="largura_banda_max">Largura da Banda Máxima (MHz)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="largura_banda_max"
          id="largura_banda_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-12">
        <label htmlFor="consumo">Consumo (W)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="consumo"
          id="consumo"
          disabled={isVisualizar}
        />
      </div>
      <div className="col-md-12">
        <label htmlFor="tensao">Tensão (V)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="tensao"
          id="tensao"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="perda_txrx_min">Perdas TX+RX Mínima (dB)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="perda_txrx_min"
          id="perda_txrx_min"
          disabled={isVisualizar}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="perda_txrx_max">Perdas TX+RX Máximo (dB)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="perda_txrx_max"
          id="perda_txrx_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-12">
        <label htmlFor="sub_banda_odu">Sub-Banda ODUs</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="sub_banda_odu"
          id="sub_banda_odu"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="potencia_tx_dbm_min">Potência TX Mínima (dBm)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="potencia_tx_dbm_min"
          id="potencia_tx_dbm_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="potencia_tx_dbm_max">Potência TX Máxima (dBm)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="potencia_tx_dbm_max"
          id="potencia_tx_dbm_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="potencia_tx_mw_min">Potência TX Mínima (mW)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="potencia_tx_mw_min"
          id="potencia_tx_mw_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="potencia_tx_mw_max">Potência TX Máxima (mW)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="potencia_tx_mw_max"
          id="potencia_tx_mw_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="comentario_min">Comentário Mínimo</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="comentario_min"
          id="comentario_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="comentario_max">Comentário Máximo</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="comentario_max"
          id="comentario_max"
          disabled={isVisualizar}
        />
      </div>
    </form>
  </main>
);
