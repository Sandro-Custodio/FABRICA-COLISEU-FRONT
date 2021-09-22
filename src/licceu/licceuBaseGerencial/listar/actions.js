import axios from "axios";
import get from "lodash/get";
import { change } from "redux-form";
import { toastr } from "react-redux-toastr";

const baseUrl = process.env.REACT_APP_API_URL_JAVA;
const MSG_SUCESSO_CRIACAO = "Gerencial Criada com Sucesso.";
const MSG_SUCESSO_EDITAR = "Gerencial alterada com sucesso.";

export const listBaseGerencialFilter = (page = 1) => async (
  dispatch,
  getState
) => {
  try {
    const filtro = get(getState(), "form.listarBaseGerencialFilter.values", {});

    const params = { filtro, page, limit: 100 };
    dispatch({ type: "LISTAR_BASEGERENCIAL_SET_LOADING", payload: true });
    const { data } = await axios.post(
      `${baseUrl}/baseGerencial/consulta-base-gerencial`,
      params
    );
    console.log(data);
    dispatch({
      type: "LISTAR_BASEGERENCIAL_SET_TABLE",
      payload: data.dados,
      page,
      total: data.qtd
    });
  } catch (error) {
    toastr.error("Erro", "Erro ao listar a Base Gerencial");
  } finally {
    dispatch({ type: "LISTAR_BASEGERENCIAL_SET_LOADING", payload: false });
  }
};

export const saveEditBaseGerencial = () => async (dispatch, getState) => {
  try {
    const dadosEdicao = get(getState(), "form.formBaseGerencial.values", {});
    const dadosIniciais = get(
      getState(),
      "licceuBaseGerencial.selected_rows.0",
      {}
    );

    let isEdicaoOk = false;
    // Verifica se qualquer campo foi alterado para validar a Observação Controller
    if (JSON.stringify(dadosIniciais) !== JSON.stringify(dadosEdicao)) {
      isEdicaoOk = true;
    }

    // Verifica alterações na Ponta_B
    if (
      dadosEdicao.pontaB !== dadosIniciais.pontaB &&
      dadosEdicao.endIdPontaB === dadosIniciais.endIdPontaB
    ) {
      const toastrConfirmPontaB = {
        onOk: () => console.log(""),
        disableCancel: true
      };
      toastr.confirm(
        "Com alteração da Ponta_B o campo END_ID Ponta_B também precisa ser alterado. Alteração não poderá ser concluída.",
        toastrConfirmPontaB
      );
      return false;
    }

    if (
      dadosEdicao.pontaB !== dadosIniciais.pontaB &&
      dadosEdicao.endIdPontaB !== dadosIniciais.endIdPontaB
    ) {
      isEdicaoOk = true;
    }

    if (dadosEdicao.vendorExecucao !== dadosIniciais.vendorExecucao) {
      isEdicaoOk = true;
    }

    if (
      dadosEdicao.detailProjAssociado !== dadosIniciais.detailProjAssociado &&
      dadosEdicao.amplDetail === dadosIniciais.amplDetail &&
      !isEmptyInputRequired(dadosEdicao.detailProjAssociado) &&
      !isEmptyInputRequired(dadosEdicao.epm)
    ) {
      const toastrConfirmVerificaDetalhamentoProjeto = {
        onOk: () => document.getElementById("amplDetail").focus(),
        onCancel: () => console.log("")
      };
      toastr.confirm(
        "Deseja Alterar o Campo 'Ampliação Detalhamento'?",
        toastrConfirmVerificaDetalhamentoProjeto
      );
      return false;
    }

    if (
      dadosEdicao.detailProjAssociado !== dadosIniciais.detailProjAssociado &&
      dadosEdicao.amplDetail !== dadosIniciais.amplDetail
    ) {
      isEdicaoOk = true;
    }

    const flagContinuarEdicao = verificaObservacaoController(
      dadosEdicao,
      isEdicaoOk
    );

    if (flagContinuarEdicao) {
      // Prossegue com a edição da base gerencial
      if (
        dadosEdicao.obsFocalNew !== "" &&
        dadosEdicao.obsFocalNew !== undefined
      ) {
        dadosEdicao.obsFocal += ` |${dadosEdicao.obsFocalNew}`;
      }

      if (
        dadosEdicao.observacaoControllerNew !== "" &&
        dadosEdicao.observacaoControllerNew !== undefined
      ) {
        dadosEdicao.observacaoController += ` |${dadosEdicao.observacaoControllerNew}`;
      }

      if (
        !isEmptyInputRequired(dadosEdicao.epm) &&
        !isEmptyInputRequired(dadosEdicao.detailProjAssociado)
      ) {
        dispatch({
          type: "POPUP_EDIT_BASEGERENCIAL_SET_LOADING",
          payload: true
        });
        const params = { dadosEdicao };
        const { data } = await axios.post(
          `${baseUrl}/baseGerencial/editarBaseGerencial`,
          params
        );

        if (!data.lenght) {
          toastr.success("Sucesso", MSG_SUCESSO_EDITAR);
          dispatch({ type: "RESETA_TABELA_BASEGERENCIAL" });
        } else {
          toastr.error("Erro", data[0]);
        }
        dispatch({
          type: "POPUP_EDIT_BASEGERENCIAL_SET_LOADING",
          payload: false
        });
      } else {
        const toastrConfirmErroCampoEpm = {
          onOk: () => console.log(""),
          disableCancel: true
        };
        toastr.confirm(
          'Valor Nulo não permitido para os campos "EPM" ou "Detalhamento: Projeto Associado"',
          toastrConfirmErroCampoEpm
        );
        return false;
      }
    }

    return true;
  } catch (error) {
    toastr.error("Erro", "Problema ao alterar Base Gerencial.");
    dispatch({ type: "POPUP_EDIT_BASEGERENCIAL_SET_LOADING", payload: false });
  }
};

export const abrirPopupCriarBaseGerencial = () => async dispatch => {
  dispatch(change("formBaseGerencial", "chaveVendor", ""));
  dispatch(change("formBaseGerencial", "chave", ""));
  dispatch(change("formBaseGerencial", "ano", ""));
  dispatch(change("formBaseGerencial", "indice", ""));
  dispatch(change("formBaseGerencial", "obsController", ""));
  dispatch(change("formBaseGerencial", "obsFocalNew", ""));
  dispatch(change("formBaseGerencial", "observacaoController", ""));
  dispatch(change("formBaseGerencial", "obsFocal", ""));
};

export const saveCreateBaseGerencial = () => async (dispatch, getState) => {
  let flagSalvoComSucesso = false;
  try {
    const dadosDaNovaCriacao = get(
      getState(),
      "form.formBaseGerencial.values",
      {}
    );

    if (
      dadosDaNovaCriacao.obsFocalNew !== "" &&
      dadosDaNovaCriacao.obsFocalNew !== undefined
    ) {
      dadosDaNovaCriacao.dataInclusao += ` |${dadosDaNovaCriacao.obsFocalNew}`;
    }

    if (
      dadosDaNovaCriacao.observacaoControllerNew !== "" &&
      dadosDaNovaCriacao.observacaoControllerNew !== undefined
    ) {
      dadosDaNovaCriacao.observacaoController += ` |${dadosDaNovaCriacao.observacaoControllerNew}`;
    }

    if (
      !isEmptyInput(
        dadosDaNovaCriacao.chave,
        dadosDaNovaCriacao.vendorExecucao
      ) &&
      validaChave(dadosDaNovaCriacao.chave) &&
      !verificaObservacaoControllerCriar(
        dadosDaNovaCriacao.observacaoControllerNew
      )
    ) {
      dispatch({
        type: "POPUP_CRIAR_BASEGERENCIAL_SET_LOADING",
        payload: true
      });
      const params = { dadosDaNovaCriacao };
      const { data } = await axios.post(
        `${baseUrl}/baseGerencial/salvarBaseGerencial`,
        params
      );
      if (data[0] === MSG_SUCESSO_CRIACAO) {
        flagSalvoComSucesso = true;
        toastr.success("Sucesso", MSG_SUCESSO_CRIACAO);
        dispatch({ type: "RESETA_TABELA_BASEGERENCIAL" });
      } else {
        flagSalvoComSucesso = false;
        toastr.error("Erro", data[0]);
      }
      dispatch({
        type: "POPUP_CRIAR_BASEGERENCIAL_SET_LOADING",
        payload: false
      });
      return flagSalvoComSucesso;
    }
  } catch (error) {
    toastr.error("Erro", "Criação não foi efetuada.");
    dispatch({
      type: "POPUP_CRIAR_BASEGERENCIAL_SET_LOADING",
      payload: false
    });
  }
};

// Functions utils
const verificaObservacaoController = (data, flag) => {
  if (
    (data.observacaoControllerNew === "" ||
      data.observacaoControllerNew === undefined) &&
    flag
  ) {
    const toastrConfirmVerificaObservacaoController = {
      onOk: () => {
        console.log("OK: clicked");
      },
      disableCancel: true
    };
    toastr.confirm(
      "Observação Controller não Preenchida. Alteração não Poderá ser Concluída!",
      toastrConfirmVerificaObservacaoController
    );
    return false;
  }
  return true;
};

const isEmptyInputRequired = pInput => {
  let vRetorno = false;

  if (pInput === "" || typeof pInput === "undefined") {
    vRetorno = true;
  }

  return vRetorno;
};

const isEmptyInput = (pChave, pVendorExecucao) => {
  let vRetorno = false;
  if (pChave === "" || pVendorExecucao === "") {
    vRetorno = true;
    const toastrEmptyInput = {
      onOk: () => console.log(""),
      disableCancel: true
    };
    toastr.confirm(
      "É Obrigatório o preenchimento da Chave e do Vendor Execução.",
      toastrEmptyInput
    );
  }
  return vRetorno;
};

const validaChave = pChave => {
  let vRetorno = false;
  const vRegex = /^(\d{4}.\d{6}$)/;
  const vMatch = pChave.match(vRegex);
  const vExeRegex = vRegex.exec(pChave);
  if (pChave !== "") {
    if (vExeRegex || vMatch) {
      vRetorno = true;
    } else {
      const toastrValidaChave = {
        onOk: () => console.log(""),
        disableCancel: true
      };
      toastr.confirm(
        'A Chave deve conter o seguinte padrão: campo Ano com 4 números, seguido de ponto "." e campo Índice com 6 números. Exemplo: 2018.000001',
        toastrValidaChave
      );
    }
  }

  return vRetorno;
};

const verificaObservacaoControllerCriar = data => {
  let vRetorno = false;
  if (data === "" || data === undefined) {
    vRetorno = true;
    const toastrConfirmVerificaObservacaoControllerCriar = {
      onOk: () => console.log(""),
      disableCancel: true
    };
    toastr.confirm(
      "Observação Controller não Preenchida. Alteração não Poderá ser Concluída!",
      toastrConfirmVerificaObservacaoControllerCriar
    );
  }
  return vRetorno;
};
