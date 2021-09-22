import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Row from "common/layout/row";
import Overlay from "common/msg/overlay/overlay";

import { delete_lpu_items_by_id } from "../actions";

const DeletarItemLpu = props => {
  const {
    comandoLpuReducer: {
      list
    },
    reloadParent,
    //actions
    delete_lpu_items_by_id,
  } = props;

  const handleSubmit = () => {
    const {
      selection,
      comandoLpuReducer: {
        list
      },
    } = props;
    let id_list = [];
    let lpu_id_list = [];
    if(list?.length > 0 && selection?.length > 0){
      selection.map(item => {
        id_list.push(list[item].id)
        lpu_id_list.push(list[item].lpu_id)
      })
      //Limpa duplicatas de dentro de um array
      lpu_id_list = [...new Set(lpu_id_list)];
    }
    Promise.all([delete_lpu_items_by_id(
      {
        lpu_item_ids: id_list,
        lpu_ids: lpu_id_list
      }
    )]).finally($ => {
      window.$("#deletar_item_lpu").modal("hide")
      reloadParent()
    })
  }

  return (
    <div className="overlay-wrapper">
      <Row>
        <h4 style={{paddingLeft: '0.6vw'}}>
          Tem certeza que deseja excluir os items de LPU selecionados?
        </h4>
      </Row>
      <Row>
        <button
          className="btn btn-success"
          type="button"
          onClick={() => handleSubmit()}
        >
          Sim
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => window.$("#deletar_item_lpu").modal("hide")}
        >
          Não
        </button>
      </Row>
      <Overlay/>
    </div>
  );
}

DeletarItemLpu.defaultProps = {
  reloadParent: () => {}
};

const mapStateToProps = state => ({
  comandoLpuReducer: state.comandoLpuReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
  delete_lpu_items_by_id
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletarItemLpu);
