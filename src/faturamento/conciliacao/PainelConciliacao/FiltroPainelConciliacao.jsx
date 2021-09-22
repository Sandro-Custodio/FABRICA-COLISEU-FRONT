import React from "react";
// import { useSelector } from "react-redux";
import { Input } from "common/input";
import { Card } from "common";
import sumBy from "lodash/sumBy";
import { toFloat, isValidation } from "common/utils";
import { useSelector } from "react-redux";

const FiltroPainelConciliacao = ({
  bill,
  cont_app,
  cont_ok,
  bill_items,
  maxItems,
  rowValues
}) => {
  const {
    competence_month,
    bill_dd_circuits,
    bill_total,
    bill_dd_items
  } = bill;

  let apont = 0;
  const contest = rowValues.contestar;
  const base_fisica = sumBy(maxItems, el => el.base_fisica);

  sumBy(bill_items, el => {
    if (
      el.bill_dif_type_id !== 1 &&
      el.bill_dif_type_id !== 2 &&
      el.bill_dif_type_id !== 5 &&
      el.bill_dif_type_id !== 8
    ) {
      apont +=
        parseFloat(el.apontado) < 0
          ? parseFloat(el.apontado) * -1
          : parseFloat(el.apontado);
    }
    return toFloat(apont);
  });

  const okCircuito = toFloat(base_fisica);
  const lbl_circuito = cont_app.circuitos;
  const lbl_circuito_p =
    bill_dd_circuits !== null && bill_dd_circuits > 0
      ? `${toFloat((cont_app.circuitos / bill_dd_circuits) * 100)}%`
      : `${toFloat(0)}%`;
  const lbl_item = cont_app.itens;

  const lbl_previsto = isValidation(rowValues.previsto)
    ? toFloat(rowValues?.previsto || 0)
    : toFloat(0);
  const lbl_previsto_p = toFloat((lbl_previsto / bill_total) * 100);
  const lbl_item_p =
    bill_dd_items !== null && bill_dd_items > 0
      ? `${toFloat((cont_app.itens / bill_dd_items) * 100)}%`
      : `${toFloat(0)}%`;
  const lbl_apontado = toFloat(apont);

  const lbl_apontado_p = isValidation(bill_total)
    ? `${toFloat((apont / bill_total) * 100)}%`
    : `${toFloat(0)}%`;

  const lbl_contestar = isValidation(contest) ? contest : toFloat(0);
  const lbl_contestar_p =
    isValidation(bill_total) && isValidation(contest)
      ? `${toFloat((contest / bill_total) * 100)}%`
      : `${toFloat(0)}%`;

  // VALOR OK
  const lbl_ok = sumBy(maxItems, el => el.base_fisica);
  const lbl_ok_p =
    isValidation(okCircuito / lbl_previsto) &&
    isValidation(okCircuito) &&
    isValidation(lbl_previsto)
      ? `${toFloat((okCircuito / lbl_previsto) * 100)}%`
      : toFloat(0);
  const lbl_circuito_ok = cont_ok.circuitos;
  const lbl_circuito_ok_p =
    cont_ok.circuitos / bill_dd_circuits === 0 || bill_dd_circuits === null
      ? `${toFloat(0)}%`
      : `${toFloat((cont_ok.circuitos / bill_dd_circuits) * 100)}%`;

  const { userLogin, billReducer } = useSelector(state => ({
    userLogin: state.faturamentoConciliacaoReducer.userLogin,
    billReducer: state.faturamentoConciliacaoReducer.bill
  }))

  const adicionaZero = number => {
    if(number <= 9){
      return ("0" + number)
    }else{
      return number
    }
  }

  let created_at = ""
  let created_atFormated = ""
  let bill_cost_ddReducer = ""
  let bill_totalReducer = ""

  if(billReducer.length > 0){
    created_at = billReducer[0].created_at
    created_atFormated = new Date(created_at)
    created_atFormated = (adicionaZero(created_atFormated.getDate()) + "/" + (adicionaZero(created_atFormated.getMonth() + 1))+ "/" + created_atFormated.getFullYear())
    bill_cost_ddReducer = billReducer[0].bill_cost_dd
    bill_totalReducer = billReducer[0].bill_total
  }
  

  const painelLeft = [
    {
      key: "1",
      readOnly: true,
      label: "Cadastrada por",
      name: "cadastrada",
      component: Input,
      placeholder:  userLogin ,
      contentProps: "col-md-3"
    },
    {
      key: "2",
      readOnly: true,
      label: "Cadastrada em",
      name: "cadastrada_em",
      component: Input,
      contentProps: "col-md-3",
      placeholder: created_atFormated
    },
    {
      key: "3",
      readOnly: true,
      label: "Conciliada por",
      name: "conciliada",
      component: Input,
      contentProps: "col-md-3"
    },
    {
      key: "4",
      readOnly: true,
      label: "Conciliada em",
      name: "conciliada_em",
      component: Input,
      placeholder: "",
      contentProps: "col-md-3"
    },
    {
      key: "5",
      readOnly: true,
      label: "Regional",
      name: "regional",
      component: Input,
      placeholder: rowValues.regional,
      contentProps: "col-md-3"
    },
    {
      key: "6",
      readOnly: true,
      label: "Provedor",
      name: "provedor",
      component: Input,
      contentProps: "col-md-3",
      placeholder: rowValues.provedor
    },
    {
      key: "7",
      readOnly: true,
      label: "Agrupador",
      name: "agrupador",
      component: Input,
      contentProps: "col-md-3",
      placeholder: rowValues.agrupador
    },
    {
      key: "8",
      readOnly: true,
      label: "Mês Referência",
      name: "competence_month",
      component: Input,
      placeholder: competence_month,
      contentProps: "col-md-3"
    },
    {
      key: "9",
      readOnly: true,
      label: "Status",
      name: "status",
      component: Input,
      contentProps: "col-md-3",
      placeholder: rowValues.status
    },
    {
      key: "10",
      readOnly: true,
      label: "Fatura",
      name: "fatura",
      component: Input,
      contentProps: "col-md-3"
    },
    {
      key: "11",
      readOnly: true,
      label: "Emissão",
      name: "emissao",
      component: Input,
      contentProps: "col-md-3"
    },
    {
      key: "12",
      readOnly: true,
      label: "Vencimento",
      name: "vencimento",
      component: Input,
      contentProps: "col-md-3"
    }
  ];

  return (
    <Card color="primary">
      <section>
        <div className="col-md-6 painel-left">
          {painelLeft.map(todo => (
            <Input {...todo} size="sm" readOnly />
          ))}
        </div>

        <div className="col-md-6 painel-right">
          <div className="col-md-5">
            <div className="col-md-4"></div>
            <Input
              contentProps="col-md-8"
              label="Apontado"
              readOnly
              placeholder={lbl_apontado}
              size="sm"
            />
            <div className="col-md-4"></div>
            <Input
              contentProps="col-md-8"
              size="sm"
              readOnly
              placeholder={lbl_apontado_p}
            />
            <label htmlFor="circuito" className="col-md-4 painel-left__label">
              Circuito
            </label>
            <Input
              placeholder={lbl_circuito}
              // circuito
              contentProps="col-md-3"
              size="sm"
              readOnly
            />
            <Input
              contentProps="col-md-5"
              size="sm"
              readOnly
              placeholder={lbl_circuito_p}
            />

            <label htmlFor="items" className="col-md-4 painel-left__label">
              Itens
            </label>
            <Input
              contentProps="col-md-3"
              size="sm"
              readOnly
              placeholder={lbl_item}
            />
            <Input
              contentProps="col-md-5"
              size="sm"
              readOnly
              placeholder={lbl_item_p}
            />
          </div>

          <div className="col-md-2">
            <Input
              contentProps="col-md-12"
              readOnly
              label="Contestar"
              placeholder={lbl_contestar}
              size="sm"
            />
            <Input
              contentProps="col-md-12"
              size="sm"
              readOnly
              placeholder={lbl_contestar_p}
            />
          </div>
          <div className="col-md-2">
            <Input
              contentProps="col-md-12"
              label="Previsto"
              readOnly
              placeholder={lbl_previsto}
              size="sm"
            />
            <Input
              contentProps="col-md-12"
              size="sm"
              readOnly
              placeholder={String(`${lbl_previsto_p}%`)}
            />
          </div>

          <div className="col-md-3">
            <Input
              contentProps="col-md-12"
              label="OK"
              size="sm"
              readOnly
              placeholder={toFloat(lbl_ok)}
            />
            <Input
              contentProps="col-md-12"
              size="sm"
              readOnly
              placeholder={lbl_ok_p}
            />
            <Input
              contentProps="col-md-4"
              size="sm"
              readOnly
              placeholder={lbl_circuito_ok}
            />
            <Input
              contentProps="col-md-8"
              size="sm"
              readOnly
              placeholder={lbl_circuito_ok_p}
            />
          </div>
        </div>
        <div>
          <Input
            readOnly
            label="Total Circuitos Fatura"
            name="bill_dd_circuits"
            placeholder={bill.bill_dd_circuits}
            component={Input}
            contentProps="col-md-2"
          />
          <Input
            readOnly
            label="Total Itens Fatura"
            name="bill_dd_items"
            placeholder={bill.bill_dd_items}
            component={Input}
            contentProps="col-md-2"
          />
          <Input
            readOnly
            label="Valor DD (R$)"
            name="bill_cost_dd"
            placeholder={toFloat(Number(bill_cost_ddReducer)).replace(".",",")}
            component={Input}
            contentProps="col-md-2"
          />
          <Input
            readOnly
            label="Valor Fatura (R$)"
            name="bill_total"
            placeholder={toFloat(Number(bill_totalReducer)).replace(".",",")}
            component={Input}
            contentProps="col-md-3"
          />
          <Input
            readOnly
            label="Valor Acordo (Novo Valor)"
            name="new_value"
            // placeholder={bill.new_value}
            component={Input}
            contentProps="col-md-3"
          />
        </div>
      </section>
    </Card>
  );
};

export default FiltroPainelConciliacao;
