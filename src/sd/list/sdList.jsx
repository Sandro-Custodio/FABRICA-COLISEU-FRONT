import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { Table, IconButton, Modal } from "common";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Content from "../../common/adminLTE/content";
import { columns, columnWidths } from "./api.json";
import {
  getSdList,
  getOdStatuses,
  getSdStatuses,
  getAllVendors,
  carregarDadosVisualizar
} from "./actions";
import { SDToolbar, SDOpenFilter, VisualizarSD } from "./sdComponents";

const SDList = ({
  listarSD: {
    sdRows,
    page,
    total,
    visualizarData,
    visualizarTableData,
    filter
  },
  getSdList,
  getOdStatuses,
  getSdStatuses,
  getAllVendors,
  carregarDadosVisualizar
}) => {
  const [selection, changeSelection] = React.useState([]);
  const [openFilter, setOpenFilter] = React.useState(false);
  const [openVisualizar, setOpenVisualizar] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(
    () =>
      getInitialData(
        getSdList,
        getOdStatuses,
        getSdStatuses,
        getAllVendors,
        setLoading
      ),
    []
  );

  const getInitialData = (
    getSdList,
    getOdStatuses,
    getSdStatuses,
    getAllVendors,
    setLoading
  ) => {
    setLoading(true);
    const list = getSdList({}, 1);
    Promise.all([list]).then(() => {
      setLoading(false);
    });
    getOdStatuses();
    getSdStatuses();
    getAllVendors();
  };

  const handleOpenVisualizar = () => {
    setLoading(true);
    const visualizar = carregarDadosVisualizar(sdRows[selection].id);
    Promise.all([visualizar]).then(() => {
      setLoading(false);
      setOpenVisualizar(true);
    });
  };

  const onSelectionChange = selectionValue => {
    const newSelection = selectionValue[selectionValue.length - 1];
    changeSelection(newSelection >= 0 ? [newSelection] : []);
  };

  return (
    <div className="fade-in fade-out sd-list">
      <div className="header">
        <div className="header__left-items">
          <ContentHeader title="Listar" small="SDs" />
        </div>
      </div>
      <Content>
        <Table
          columns={columns}
          columnWidths={columnWidths}
          rows={sdRows}
          currentPage={page}
          enableDefaultFilter
          total={total}
          selectionProps={{
            selection,
            onSelectionChange
          }}
          pageSize="100"
          changePage={changePage => {
            changeSelection([]);
            setLoading(true);
            const list = getSdList(filter, changePage);
            Promise.all([list]).then(() => {
              setLoading(false);
            });
          }}
          loading={loading}
          toolBarComp={
            <SDToolbar rows={sdRows} columns={columns}>
              <IconButton icon="search" onClick={() => setOpenFilter(true)} />
              {openFilter && (
                <Modal
                  open={openFilter}
                  title="Filtrar SDs"
                  dimension="sm"
                  width="30vw"
                  onClose={() => setOpenFilter(false)}
                  disableBtnClose
                >
                  <SDOpenFilter
                    // initialValues={filter}
                    enableReinitialize
                    onSubmit={submit => {
                      changeSelection([]);
                      setLoading(true);
                      setOpenFilter(false);
                      const list = getSdList(submit, page);
                      Promise.all([list]).then(() => {
                        setLoading(false);
                      });
                    }}
                  />
                </Modal>
              )}
              <FastForm
                onSubmit={submit => {
                  changeSelection([]);
                  setLoading(true);
                  const list = getSdList(submit, page, "quick");
                  Promise.all([list]).then(() => {
                    setLoading(false);
                  });
                }}
              />
              {selection.length === 1 && (
                <div className="btn-group">
                  <IconButton
                    icon="eye"
                    onClick={() => handleOpenVisualizar()}
                  />
                  {openVisualizar && (
                    <Modal
                      open={openVisualizar}
                      title="Visualizar SD"
                      dimension="lg"
                      width="80vw"
                      onClose={() => setOpenVisualizar(false)}
                      disableBtnClose
                    >
                      <VisualizarSD
                        initialValues={visualizarData}
                        tableData={visualizarTableData}
                      />
                    </Modal>
                  )}
                </div>
              )}
            </SDToolbar>
          }
        />
      </Content>
    </div>
  );
};

let FastForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className="input-group input-group-sm">
      <Field
        className="form-control input-sm"
        type="text"
        name="sd_code"
        value="Codigo SD"
        component="input"
        placeholder="Código SD"
      />

      <span className="input-group-btn">
        <button
          type="submit"
          className="btn btn-primary btn-flat"
          data-toggle="tooltip"
          title="Busca Rápida"
        >
          <i className="fa fa-fast-forward" aria-hidden="true" />
        </button>
      </span>
    </div>
  </form>
);

FastForm = reduxForm({ form: "fastForm" })(FastForm);

const mapStateToProps = state => ({ listarSD: state.listarSD });

const mapDispacthToProps = dispatch =>
  bindActionCreators(
    {
      getSdList,
      getOdStatuses,
      getSdStatuses,
      getAllVendors,
      carregarDadosVisualizar
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispacthToProps)(SDList);
