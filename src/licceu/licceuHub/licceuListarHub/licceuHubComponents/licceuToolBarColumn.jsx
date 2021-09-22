import React from "react";
import { Plugin, Template } from "@devexpress/dx-react-core";

const API = [
  {
    id: 1,
    icon: "retweet",
    title: "Alteração Múltipla de Status",
    color: "green",
    "data-for": "search",
    "data-tip": "",
    "data-target": "#licceuAlteracaoMassiva"
  },
  {
    id: 2,
    icon: "edit",
    title: "Editar HUB",
    color: "orange",
    "data-for": "",
    "data-tip": "",
    "data-target": "#licceuEditarHub"
  }
];

const LicceuToolbarColumn = ({ children, hubSelected, selection }) => (
  <Plugin name="ToolbarColumn">
    <Template name="toolbarContent">
      <button
        style={{ margin: "0px 10px" }}
        data-for="search"
        data-tip="Abrir Filtro"
        type="button"
        className="btn-sm btn-link fade-in filtro-btn"
        data-toggle="modal"
        data-target="#licceuOpenFilter"
      >
        <i
          className="fa fa-search"
          data-toggle="tooltip"
          title="Abrir Filtro"
        />
      </button>
      {children}
      {API.map(todo => (
        <div className="btn-group" key={todo.id}>
          {/* Só mostrar os botões caso tenha algum item selecionado. Caso tenha mais de um item selecionado, não será exibido o botão Editar Hub (id = 2) */}
          {selection.length > 0 && (!(selection.length > 1) || todo.id !== 2) && (
            <button
              style={{ margin: "0px 10px" }}
              type="button"
              className="btn-lg btn-link fade-in filtro-btn"
              data-toggle="modal"
              {...todo}
              key={todo.id}
            >
              <i
                className={`fa fa-${todo.icon} text-${todo.color}`}
                data-toggle="tooltip"
                title={todo.title}
              />
            </button>
          )}
        </div>
      ))}
      {
        <span style={{ marginLeft: "14%" }}>
          {!hubSelected || hubSelected.id_licceu}
        </span>
      }
    </Template>
  </Plugin>
);

export default LicceuToolbarColumn;
