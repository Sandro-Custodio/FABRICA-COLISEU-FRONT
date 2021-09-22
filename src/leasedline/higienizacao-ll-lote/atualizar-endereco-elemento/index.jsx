import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, clearFields } from "redux-form";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import Content from "common/adminLTE/content";
import ContentHeader from "common/adminLTE/contentHeader";
import Upload from "./upload";
import { LabelField } from "common/form/components";
import get from "lodash/get";
import Loading from "common/Loading/index";
import Table from "common/table"

import { update_ll_element_and_address } from "./actions";
import { toastr } from "react-redux-toastr";

const AtualizarDdDefinitivo = ({
  bill,
  update_dd_previo,
  handleFilter,
  setSelection,
  ...others
}) => {

  const {
    AtualizarDdDefinitivoForm,
    update_ll_element_and_address
   } = others;

  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [fileName, setFileName] = React.useState('');

  let columns = [
    { name: 'error_message', title: 'Mensagem de Erro' },
    { name: 'll_guid', title: 'LL_GUID' },
    { name: 'ot', title: 'OT' },
    { name: 'element_a', title: 'ELEMENTO A',
      getCellValue: row => (row.element_a.elemento_id ? row.element_a.elemento_id: '')
    },
    { name: 'address_a', title: 'ENDEREÇO A',
      getCellValue: row => (row.address_a.id ? row.address_a.id: '')
    },
    { name: 'element_b', title: 'ELEMENTO B',
      getCellValue: row => (row.element_b.elemento_id ? row.element_b.elemento_id: '')
    },
    { name: 'address_b', title: 'ENDEREÇO B',
      getCellValue: row => (row.address_b.id ? row.address_b.id: '')
    }
  ];
  let enableSubmit = false;
  if(list && list.length > 0){
    var aux = list.find(row => row.error_message.length > 0);
    if(aux){
      enableSubmit = false;
    }else{
      enableSubmit = true;
    }
  }else{
    enableSubmit = false;
  }

  const handleUpload = (newList, newFileName) => {
    setList(newList)
    setFileName(newFileName)
  }
  const handleSubmit = () => {
    setTimeout(() => {
      setLoading(true);
    },10);
    Promise.all([update_ll_element_and_address(fileName)]).then(() => {
      toastr.success("Linhas atualizadas")
      setList([])
    }).catch(e => {
      console.log("aaa",e.response)
      toastr.error("ERRO")
    }).finally(() => setLoading(false))
  }

  return (
    <div className="overlay-wrapper" width="device-width">
      <div className="header">
        <ContentHeader title="Atualização" small="Endereço base SPAZIO e Elemento" />
      </div>
      <Content>
      <Grid style={{padding: '1vw'}}>
        <Row>
          <Grid cols="12 4">
            <Upload
              accept={'.csv'}
              handleUpload={handleUpload}
              setLoading={setLoading}
            />
          </Grid>
        </Row>
        <Row>
          <Table
            total={list.length}
            pageSize={list.length}
            toolBarComp={
              <>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setTimeout(() => {
                        const response = {
                            file: process.env.REACT_APP_API_URL+'/modelo/modelo_higienizacao_endereco_elemento.csv',
                        };
                        window.open(response.file);
                    }, 10);
                  }}
                >
                  <i className="fa fa-file"/> Modelo
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!enableSubmit}
                  onClick={() => handleSubmit()}
                >
                  <i className="fa fa-check"/> Higienizar
                </button>
              </>
            }
            rows={list}
            columns={columns}
          />
        </Row>
      </Grid>
      </Content>
      <Overlay />
      {loading && (<Loading/>)}
    </div>
  );
};

AtualizarDdDefinitivo.defaultProps = {
  bill: {id: 1},
  update_dd_previo: () => {return(false)},
  handleFilter: () => {return(false)}
};

const Form = reduxForm({ form: "AtualizarDdDefinitivo" })(AtualizarDdDefinitivo);

const mapDispatchToProps = dispatch => bindActionCreators({
  update_ll_element_and_address
}, dispatch);

const mapStateToProps = (state,props) => {
  return {
    AtualizarDdDefinitivoForm: state.form.AtualizarDdDefinitivo,
    auth: state.auth
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
