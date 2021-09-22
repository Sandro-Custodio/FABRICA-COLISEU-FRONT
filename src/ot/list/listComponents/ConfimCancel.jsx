import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { IconButton, Modal, Table } from "common";
import get from "lodash/get";
import { reduxForm, Field } from "redux-form";
import {
  LabelInput,
  TextareaField,
  DateTimePickerField
} from "common/form/components";
import moment from "moment";
import { get_sm_seg_history, confirm_cancel_segment } from "./actions";
import { getOtList } from "../actions";
import { logCodeAndCallback } from '../../../auth/actions'

const columns = [
  { name: "transicao", title: "Ação " },
  { name: "user_name", title: "Usuário " },
  { name: "updated_at", title: "Data " },
  { name: "remarks", title: "Observação" }
];

const ConfirmCancel = ({
  user,
  ots,
  getOtList,
  auth,
  row,
  multi_rows,
  handleReset
}) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, handleLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [change, setChange] = useState("");

  const simpleOrMult = {
    simple: {
      header: `Confirmar Cancelamento ${row.code}`,
      result: `${row.code} Operação realizada com sucessso`
    },
    multi: {
      header: "Confirmar o Cancelamento de Multiplas OTS",
      result: "Operação realizada com sucessso"
    }
  };

  const msg =
    multi_rows.length === 1 ? simpleOrMult.simple : simpleOrMult.multi;

  const { header, result } = msg;

  const handleOpen = () => {
    setOpenFilter(true);
    handleLoading(true);
    get_sm_seg_history(row.seg_id)
      .then(res => setRows(res))
      .finally(() => {
        handleLoading(false);
        setChange("");
      });
  };

  const handleSubmit = () => {
    handleLoading(true);
    const transitionType = "CANCEL";
    const data = multi_rows.map(item => ({
      seg_id: item.seg_id,
      user_id: user.id,
      remarks: change,
      transition_type: transitionType,
      code: "DR_COA1I1F1"
    }));
    confirm_cancel_segment({ data })
      .then(() => {
        toastr.success(result);
        handleReset();
      })
      .finally(() => {
        handleLoading(false);
        setOpenFilter(false);
        getOtList(auth, ots);
        setChange("");
      });
  };

  const rowsFormated = rows.map(todo => ({
    ...todo,
    updated_at: moment(todo.updated_at).format("DD/MM/YYYY")
  }));

  return (
    <>
      <IconButton
        title="Confirmar Cancelamento"
        icon="times-circle-o"
        onClick={() => logCodeAndCallback("DR_COA1B1A1", handleOpen)}
        className="btn-lg pull-left"
        style={{ margin: 0 }}
      />
      <Modal
        open={openFilter}
        dimension="lg"
        title={header}
        onClose={() => setOpenFilter(false)}
        loading={loading}
        footer={
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Salvar
          </button>
        }
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <LabelInput
              cols="4"
              label="Usuário"
              value={get(user, "name", "")}
              readOnly
            />
            <Field
              name="updated_at"
              label="Data"
              component={DateTimePickerField}
              value={new Date()}
              cols="2"
              time={false}
              placeholder="Data"
            />
          </div>
          <TextareaField
            cols="6"
            value={change}
            label="Observações"
            onChange={e => setChange(e.target.value)}
          />
        </div>
        <div style={{ margin: "0 15px" }} id="confirm-cancel">
          <Table
            style={{ maxHeight: "300px" }}
            columns={columns}
            rows={rowsFormated}
            disablePagination
            columnWidths={columns.map(todo => ({
              columnName: todo.name,
              width: todo.name === "remarks" ? 500 : 200
            }))}
          />
        </div>
      </Modal>
    </>
  );
};

const Form = reduxForm({ form: "ConfirmCancel" })(ConfirmCancel);
const mapStateToProps = ({ auth, ot }) => ({ user: auth.user, auth, ots: ot });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOtList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
