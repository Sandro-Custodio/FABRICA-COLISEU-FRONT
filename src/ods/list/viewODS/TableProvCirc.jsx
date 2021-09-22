import React, { useState, useEffect, useReducer } from "react";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";
import maxBy from "lodash/maxBy";
import Row from "common/layout/row";
import Section from "./Section";
import TableProvedor from "./TableProvedor";
import TableCircuito from "./TableCircuito";
import setOdsList from "./actions";
import ModalForm from "../../../common/layout/modal";
import SdForm from "../../../sd/form/sdForm"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAllStatus, hideOverlay } from "./actions";
import { setFormData } from "sd/form/actions";
import ReactTooltip from "react-tooltip";

const TableProvCirc = props => {

  const {
    describe,
    getAllStatus,
    hideOverlay,
    setFormData,
    sdFormReducer: {
      formData,
    },
    viewOnly,
  } = props;

  const [loading, setLoading] = useState(false);
  const [groupProv, setGroupProv] = useState([]);
  const [rowsProv, setRowsProv] = useState([]);
  const [rowsCirc, setRowsCirc] = useState([]);
  const [sumCirc, setSumCirc] = useState(0);

  const [contractTitle, setContractTitle] = React.useState("Contrato")
  const [selectedLLs, setSelectedLLs] = React.useState([])
  const [allSelected, setAllSelected] = React.useState([])
  const [regra, setRegra] = React.useState("")
  const [multa, setMulta] = React.useState("")
  const [prazo, setPrazo] = React.useState("")
  const [printAttach, setPrintAttach] = React.useState(false)
  const [getRemarks, setRemarks] = React.useState("")

  const onSelectionChange = (_, index) => {
    const idx = index.length > 1 ? [index[index.length - 1]] : index;
    if (idx.length) {
      const prov = rowsProv[idx[0]][0];
      setRowsCirc(
        groupProv[prov.provedor_id].map(n => ({
          ...n,
          status: n.status.description
        }))
      );
    } else {
      setRowsCirc([]);
    }
    return idx;
  };

  const [selectionProvedor, setSelectionProvedor] = useReducer(
    onSelectionChange,
    []
  );

  const init = () => {
    setLoading(true);
    getAllStatus().then(res => {
      setOdsList(describe.id).then(({ data }) => {
        setSumCirc(data);
        const group = groupBy(data, "provedor_id");
        setGroupProv(group);
        setRowsProv(
          Object.keys(group).map(n => {
            const row = maxBy(group[n]);
            return {
              ...group[n],
              ...row,
              vendor_name: get(row, "vendor.name", ""),
              circuit_length: group[n].length,
              val_link_s_imp: row.val_link_s_imp && "$" + Number(get(row, "val_link_s_imp", "")).toFixed(2),
              sd_code: get(row, "sd.code", ""),
              sd_remarks: get(row, "sd.remarks", ""),
              sd_data: row.sd && new Date(get(row, "sd.created_at", "")).toLocaleDateString("pt-br"),
              sd_status: row.sd && res.filter(e => e.id === get(row, "sd.status_id", ""))[0].description,
              actions: "",
            };
          })
        );
        setLoading(false);
        hideOverlay();
      });
    })
  }

  useEffect(() => {
    init()
  }, []);

  const handleAction = (action, data) => {
    const circ = groupProv[(data.vendor.id).toString()].map(n => ({
      ...n,
      status: n.status.description
    }))
    setSelectedLLs([])
    setContractTitle("Contrato")
    setRegra("")
    setMulta("")
    setPrazo("")
    setAllSelected(false)
    if (data.sd) {
      setPrintAttach(data.sd.print_attach)
      setRemarks(data.sd.remarks)
      let obs = document.getElementById("obs")
      if (obs !== null)
        obs.value = data.sd.remarks
    }
    setFormData({ action, data, od_user: describe.user_id, circ });
  };

  const Actions = ({ row }) => {
    const actions = [
      { name: "new", icon: "plus", color: "success", show: row.sd_code === "", toolTip: "Novo" },
      { name: "edit", icon: "edit", color: "warning", show: (row.sd_code != "" && row.sd_status !== "Concluída"), toolTip: "Editar" },
      { name: "view", icon: "eye", color: "primary", show: row.sd_code !== "", toolTip: "Visualizar" },
    ]
    return (
      <div>
        {!viewOnly && actions.map((a, i) => (
          a.show && <a
            onClick={() => handleAction(a, row)}
            className={`btn btn-${a.color} btn-sm`}
            key={i}
            data-for="top_success_float"
            data-tip={""+a.toolTip}
          >
            <i className={`fa fa-${a.icon}`} />
            <ReactTooltip
              id="top_success_float"
              place="left"
              type="dark"
              effect="float"
            />
          </a>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Row>
        <div id="view-od">
          <Section>
            <TableProvedor
              loading={loading}
              rows={rowsProv}
              selectionProps={{
                selection: selectionProvedor,
                onSelectionChange: setSelectionProvedor
              }}

              actions={[{ columnName: "actions", component: Actions }]}
            />
          </Section>
          <div style={styles}>
            <span>
              Valor Total Mensalidade (s/imp.): R$
            <strong>{sumBy(sumCirc, n => n.val_link_s_imp)}</strong>
            </span>
          </div>
          <Section>
            <TableCircuito rows={rowsCirc} />
          </Section>
        </div>
      </Row>
      <ModalForm
        LabelButtonSubmit="SD"
        id="sd-form"
        title={{
          "new": "Criar nova SD",
          "view": "Visualizar SD",
          "edit": "Editar SD",
        }[formData.action.name] || ""}
        dimension="modal-g3 sd-form"
      >
        <div />
        {Object.entries(formData.data).length > 0 && <SdForm
          describe={describe}
          rowsCirc={rowsCirc}
          contractTitle={contractTitle}
          setContractTitle={setContractTitle}
          selectedLLs={selectedLLs}
          setSelectedLLs={setSelectedLLs}
          regra={regra}
          setRegra={setRegra}
          multa={multa}
          setMulta={setMulta}
          prazo={prazo}
          setPrazo={setPrazo}
          allSelected={allSelected}
          setAllSelected={setAllSelected}
          printAttach={printAttach}
          setPrintAttach={setPrintAttach}
          init={init}
          getRemarks={getRemarks}
          setRemarks={setRemarks}
        />}
      </ModalForm>
    </div>
  );
};

TableProvCirc.defaultProps = {
  viewOnly: false
}

const styles = {
  color: "red",
  textAlign: "end",
  margin: "10px 16px",
  fontWeight: "bold"
};

const mapStateToProps = state => ({
  auth: state.auth,
  sdFormReducer: state.sdFormReducer,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllStatus,
  hideOverlay,
  setFormData,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableProvCirc)
