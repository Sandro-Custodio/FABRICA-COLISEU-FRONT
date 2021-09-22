import React from "react";
import { Container, BackLink, Tab, Loading } from "common";
import BdConfig from "./bdconfig/index"
import LinksSnoa from "./linksSnoa/index"
import Paginator from "common/paginator/";


const SincronizarBdConfig = () => {
    const tabs = [
        {
            title: "Bd Config",
            Comp: <BdConfig />
        },
        // {
        //     title: "Links Snoa",
        //     Comp: <LinksSnoa />
        // }
    ]

    return (
        <Container
            title="Sincronização"
            subtitle={<BackLink title="Leasedlines" url="/leasedlines" />}
        >
            <Tab tabList={tabs} />
        </Container>
    );
}

export default SincronizarBdConfig