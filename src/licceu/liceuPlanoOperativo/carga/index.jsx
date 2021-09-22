import React from "react";
import { Tab } from "common";
import { Container, BackLink, Panel } from "../comps";
import HeaderDownload from "./HeaderDownload";
import HeaderUpload from "./HeaderUpload";
import GridDownload from "./GridDownload";
import GridUpload from "./GridUpload";

export default ({ code, title }) => {
  const [key, setKey] = React.useState(0);
  const list = [
    { title: "Download", Comp: <GridDownload /> },
    { title: "Upload", Comp: <GridUpload /> }
  ];

  return (
    <Container title={title} subtitle={<BackLink />}>
      <Panel
        header={
          <>
            {key === 0 && <HeaderDownload code={code} />}
            {key === 1 && <HeaderUpload code={code} />}
          </>
        }
      >
        <Tab tabList={list} activeKey={key} onSelect={k => setKey(k)} />
      </Panel>
    </Container>
  );
};
