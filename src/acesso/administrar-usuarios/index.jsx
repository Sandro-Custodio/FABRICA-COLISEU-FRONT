import React from "react";
import { Table } from "common";
import Paginator from "common/paginator/";
import { bindActionCreators } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import Overlay from "common/msg/overlay/overlay";
import { Container, Panel } from "../../common/comps";
import Header from "./header";
import { getCodSoxList } from "../actions";
import EditUser from "./editUser";
import AlterarStatus from "./alterarStatus";
import ReiniciarSenha from "./reiniciarSenha";
import columnSize from "./columnSize.json";

const AdministrarUsuarios = props => {
  const {
    cadastroUsuariosReducer: { columns, usuario_list, perfil_list },
    getCodSoxList
  } = props;

  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      await Promise.all([getCodSoxList()]);
      setLoading(false);
    })();
    return () => {
      dispatch({ type: "RESET_ACESSO_REDUCER" });
    };
  }, []);

  return (
    <div className="overlay-wrapper">
      <Overlay />
      <Container title="Administrar Usuários">
        <Panel header={<Header perfil_list={perfil_list} />}>
          <Table
            columns={columns}
            columnWidths={columnSize}
            rows={usuario_list}
            disablePagination
            actions={[
              { columnName: "actions", component: EditUser },
              { columnName: "actions", component: AlterarStatus },
              { columnName: "actions", component: ReiniciarSenha }
            ]}
          />
        </Panel>
        <Paginator useCase="LISTAR_USUARIOS" />
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  cadastroUsuariosReducer: state.cadastroUsuariosReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCodSoxList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdministrarUsuarios);
