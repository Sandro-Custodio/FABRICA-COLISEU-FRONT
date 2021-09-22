import React from "react";

import { IconButton, Modal } from "common";
import Filter from "./filter";
import Clear from "./clear";
import Form from "./form";

export default () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        title="Editar Circuito"
        icon="search"
        color="#000"
        className="filtro-btn"
        style={{ padding: 10 }}
      />
      <Modal
        open={open}
        dimension="lg"
        title="Filtrar Circuitos"
        onClose={() => setOpen(false)}
        height="70vh"
        footer={
          <>
            <Filter handleClose={() => setOpen(false)} />
            <Clear />
          </>
        }
      >
        <Form />
      </Modal>
    </>
  );
};
