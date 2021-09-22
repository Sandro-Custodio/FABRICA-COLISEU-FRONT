import React from "react";
import { Field } from "redux-form";

export default ({ isVisualizar }) => (
  <main className="fade-in fade-out">
    <form className="form">
      <div className="col-md-12">
        <label htmlFor="enlace_distancia">Distância (Km)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="enlace_distancia"
          id="enlace_distancia"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="enlace_nivel_rx_min">Nível RX (dBm)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="enlace_nivel_rx_min"
          id="enlace_nivel_rx_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="enlace_nivel_rx_max">Nível RX (dBm)</label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="enlace_nivel_rx_max"
          id="enlace_nivel_rx_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="enlace_flat_fade_margin_min">
          Flat Fade Margin (dB)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="enlace_flat_fade_margin_min"
          id="enlace_flat_fade_margin_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="enlace_flat_fade_margin_max">
          Flat Fade Margin (dB)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="enlace_flat_fade_margin_max"
          id="enlace_flat_fade_margin_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="enlace_worst_month_sesr_min">
          Worst Month Sesr (SEC/MES)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="enlace_worst_month_sesr_min"
          id="enlace_worst_month_sesr_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="enlace_worst_month_sesr_max">
          Worst Month Sesr (SEC/MES)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="enlace_worst_month_sesr_max"
          id="enlace_worst_month_sesr_max"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="enlace_annual_unavail_min">
          Annual Unavailability (min/ano)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="enlace_annual_unavail_min"
          id="enlace_annual_unavail_min"
          disabled={isVisualizar}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="enlace_annual_unavail_max">
          Annual Unavailability (min/ano)
        </label>
        <Field
          component="input"
          className="form-control input-sm"
          type="text"
          name="enlace_annual_unavail_max"
          id="enlace_annual_unavail_max"
          disabled={isVisualizar}
        />
      </div>
    </form>
  </main>
);
