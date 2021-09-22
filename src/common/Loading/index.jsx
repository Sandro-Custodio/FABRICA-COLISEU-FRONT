import React from "react";
import { BarLoader } from "react-spinners";
import LogoImg from "../images/tim-logo.png";

const ModalOverlay = props => (
  <div
    className="overlay fade-in fade-out-in"
    style={{
      backgroundColor: "rgba(0,0,0,0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "800"
    }}
    {...props}
  />
);

const Loading = ({ style, modal, visibility, size }) => {
  if (!visibility) return null;
  const Container = modal ? ModalOverlay : React.Fragment;

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: size,
          height: size,
          ...style
        }}
      >
        <img src={LogoImg} style={{ width: size }} alt="Logo Tim" />
        <BarLoader
          css={{
            marginTop: 10,
            backgroundColor: "rgba(255,255,255,0.9)"
          }}
          color="rgb(235, 0, 41)"
          height={10}
          width={size}
        />
      </div>
    </Container>
  );
};

Loading.defaultProps = {
  size: 100,
  visibility: true,
  modal: true
};

export default Loading;
