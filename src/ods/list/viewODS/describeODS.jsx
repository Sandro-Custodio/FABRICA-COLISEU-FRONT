import React, { useState, useEffect } from "react";
import { getDetails } from "./actions";
import "./styles.css";

const styles = {
  title: {
    backgroundColor: "#2E527E",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 10
  },
  head: {
    backgroundColor: "#B1C9FF"
  }
};

export default ({ row_id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDetails(row_id)
      .then(({ data }) => setData(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="ods-describe overlay-wrapper">
      <Table>
        <Head />
        <Tbody circuito api={data} />
      </Table>

      <Table title="Ponta A">
        <Head defaultHead />
        <Tbody pontaA api={data} />
      </Table>

      <Table title="Ponta B">
        <Head defaultHead />
        <Tbody pontaB api={data} />
      </Table>
      {loading && (
        <div className="overlay fade-in fade-out-in">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
      )}
    </div>
  );
};

const Table = ({ children, title }) => (
  <>
    {title && (
      <div style={styles.title}>
        <strong>{title}</strong>
      </div>
    )}
    <table className="table ">{children}</table>
  </>
);

const Head = ({ defaultHead }) => (
  <thead>
    {defaultHead ? (
      <tr style={styles.head}>
        <th>CNL</th>
        <th>Endereço ID</th>
        <th>Endereço</th>
        <th>Município</th>
        <th>UF</th>
        <th>Mensalidade c/ Impostos</th>
      </tr>
    ) : (
      <tr style={styles.head}>
        <th>Sequêncial</th>
        <th>Código do Circuito</th>
        <th>Circuito Piloto</th>
        <th>Velocidade</th>
        <th>Degrau</th>
        <th>Rota</th>
      </tr>
    )}
  </thead>
);

const Tbody = ({ api, circuito, pontaA, pontaB }) => (
  <tbody>
    {circuito && (
      <tr>
        <td>1</td>
        <td>{api.circuito_id}</td>
        <td>{api.address_b}</td>
        <td>{api.speed_name}</td>
        <td>{api.degrau}</td>
        <td>{api.val_link_c_imp_b}</td>
      </tr>
    )}
    {pontaA && (
      <tr>
        <td>{api.cnl_a}</td>
        <td>{api.endereco_id_a}</td>
        <td>{api.address_a}</td>
        <td>{api.city_a}</td>
        <td>{api.state_a}</td>
        <td>{api.val_link_c_imp_a}</td>
      </tr>
    )}
    {pontaB && (
      <tr>
        <td>{api.cnl_a}</td>
        <td>{api.endereco_id_b}</td>
        <td>{api.address_b}</td>
        <td>{api.city_b}</td>
        <td>{api.state_b}</td>
        <td>{api.val_link_c_imp_b}</td>
      </tr>
    )}
  </tbody>
);
