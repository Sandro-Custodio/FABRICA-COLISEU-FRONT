import React from "react";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";

const InvalidarFatura = ({bill, auth, invalidate_bill, handleFilter, setSelection, ...others}) => {

  return (
    <div className="overlay-wrapper" width="device-width">
      <Grid style={{padding: '1vw'}}>
        <Row>
          <label>O status da fatura será alterado para inválida, deseja continuar?</label>
        </Row>
        <Row>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              Promise.all([
                invalidate_bill({
                  bill:{
                    bill_id: bill.id,
                    status_id: bill.status_id,
                    invalid_user_id: auth.user.id
                  }
                })
              ]).then($ => {
                window.$("#invalidar_fatura").modal("hide")
                // setTimeout(() => {
                  handleFilter()
                  setSelection([])
                // }, 1000)
              })
            }}
          >
            Sim
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => window.$("#invalidar_fatura").modal("hide")}
          >
            Não
          </button>
        </Row>
      </Grid>
      <Overlay />
    </div>
  );
};

InvalidarFatura.defaultProps = {
  bill: {id: 0,status_id: 0},
  auth: {user:{id:0}},
  invalidate_bill: () => {return(false)},
  handleFilter: () => {return(false)}
};

export default InvalidarFatura;
