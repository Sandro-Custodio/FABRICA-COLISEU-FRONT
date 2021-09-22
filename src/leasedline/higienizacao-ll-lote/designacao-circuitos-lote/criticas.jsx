import React from "react";

export default ({ criticas }) => {
  return (
    <ul>
      {criticas.map(critica => (
        <>
          <li>{critica.ll_guid}</li>
        </>
      ))}
    </ul>
  );
};
