import React from "react";
import Content from "common/adminLTE/content";
import Grid from "common/layout/grid";
import ContentHeader from "common/adminLTE/contentHeader";
import get from "lodash/get";
import { IconButton } from "common";

import FiltroPainelConciliacao from "./FiltroPainelConciliacao";
import TabelaPainelConciliacao from "./TabelaPainelConciliacao";

export default ({
  setPage,
  rows,
  loading,
  setLoading,
  onSelectionChange,
  rowValues,
  groups,
  months,
  opAndVendors
}) => {
  const bill = get(rows, "bill[0]", {});
  const cont_app = get(rows, "cont_app[0]", {});
  const cont_ok = get(rows, "cont_ok[0]", {});
  const bill_items = get(rows, "bill_items", []);
  const items = bill_items.filter(item => item.bill_dif_type_id < 20);
  const maxItems = bill_items.filter(item => item.bill_dif_type_id > 19);
  const { id } = bill;
  return (
    <div className="fade-in fade-out conciliacao">
      <div className="header">
        <IconButton
          icon="arrow-left"
          title="Conciliação"
          color="#97a0b3"
          onClick={() => {
            // getAllByBillId(bill_id, user_id);
            setPage("conciliacao");
          }}
        />
        <ContentHeader title="Faturamento" small="Painel" />
      </div>
      <Content>
        <Grid cols="12">
          <FiltroPainelConciliacao
            bill={bill}
            cont_app={cont_app}
            cont_ok={cont_ok}
            bill_items={bill_items}
            items={items}
            maxItems={maxItems}
            rowValues={rowValues}
            groups={groups}
            months={months}
            opAndVendors={opAndVendors}
          />
          <TabelaPainelConciliacao
            loading={loading}
            setLoading={setLoading}
            items={items}
            maxItems={maxItems}
            rowValues={rowValues}
            setPage={setPage}
            id={id}
            bill={bill}
            bill_items={bill_items}
            onSelectionChange={onSelectionChange}
          />
        </Grid>
      </Content>
    </div>
  );
};
