import React, { useState } from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import FastForm from "common/FastForm";
import { IconButton, Modal } from "common";
import axios from "axios";
import UpdateFallback from "./UpdateFallback";

const ToolBarColumn = ({ getOdsStatus, size, user_id, data, setSelection }) => {
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState("");
  const [loading, setLoading] = useState(false);
  const [formFast, setFormFast] = useState("");
  const [isError, setIsError] = useState(false);

  const datas = {
    all: data,
    user_id,
    remarks: change
  };

  const updateOdsStatus = () => {
    if (change.length === 0) {
      setIsError(true);
    } else {
      setLoading(true);
      axios
        .post("/ot_ll/create_od_fallback", datas)
        .then(() => {
          setOpen(false);
          toastr.success("Fallback ODS", "Operação realizada com sucesso");
          setChange("");
          setFormFast("");
          getOdsStatus();
          setSelection([]);
          setIsError(false);
        })
        .catch(() => toastr.error("Erro ao se comunicar com o servidor"))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <FastForm
        handleSubmit={() => getOdsStatus(formFast)}
        inputProps={{
          value: formFast,
          onChange: e => setFormFast(e.target.value)
        }}
      />
      {!!size && (
        <IconButton
          title="Fallback"
          onClick={() => setOpen(true)}
          icon="retweet"
          color="#28a745"
          typeTooltip="success"
        />
      )}
      {open && (
        <Modal
          open={open}
          dimension="md"
          title="Solicitar Fallback"
          loading={loading}
          onClose={() => {
            setOpen(false);
            setChange("");
            setSelection([]);
            setIsError(false);
          }}
          height="35vh"
          footer={
            <button
              type="button"
              onClick={updateOdsStatus}
              className="btn btn-primary"
            >
              Solicitar Fallback
            </button>
          }
        >
          <UpdateFallback
            setChange={txt => {
              setChange(txt);
              setIsError(!txt);
            }}
            change={change}
            isError={isError}
          />
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = ({ auth }) => ({ user_id: auth.user.id });

export default connect(mapStateToProps)(ToolBarColumn);
