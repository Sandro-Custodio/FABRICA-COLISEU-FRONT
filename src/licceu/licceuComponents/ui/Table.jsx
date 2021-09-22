import React from "react";

const Table = ({ children }) => (
  <table className="table no-margin">{children}</table>
);

const Head = children => (
  <thead>
    <tr>
      <th>{children}</th>
    </tr>
  </thead>
);

const Body = () => (
  <tbody>
    <tr>
      <td>
        <a href="#/">OT-PIMMW-2018-00040</a>
      </td>
      <td>MW</td>
      <td>
        <span className="label label-success">Concluída</span>
      </td>
      <td>20/01/2018</td>
    </tr>
    <tr>
      <td>
        <a href="#/">OT-LL-2018-00040</a>
      </td>
      <td>LL</td>
      <td>
        <span className="label label-warning">Em Cancelamento</span>
      </td>
      <td>20/01/2018</td>
    </tr>
    <tr>
      <td>
        <a href="#/">OT-FO-2018-00040</a>
      </td>
      <td>FO</td>
      <td>
        <span className="label label-danger">Cancelada</span>
      </td>
      <td>20/01/2018</td>
    </tr>
    <tr>
      <td>
        <a href="#/">OT-BBIP-2018-00040</a>
      </td>
      <td>BBIP</td>
      <td>
        <span className="label label-danger">Cancelada</span>
      </td>
      <td>20/01/2018</td>
    </tr>
    <tr>
      <td>
        <a href="#/">OT-MUX-2018-00040</a>
      </td>
      <td>MUX</td>
      <td>
        <span className="label label-info">Em Andamento</span>
      </td>
      <td>20/01/2018</td>
    </tr>
  </tbody>
);

export { Table, Head, Body };
