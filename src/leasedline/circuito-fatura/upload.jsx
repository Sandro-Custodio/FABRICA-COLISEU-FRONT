import React from "react";
import { Dropzone } from "common";
import { uploadFile } from "./actions";

export default ({ setLoading }) => {
  const handleDrop = file => {
    setLoading(true);
    const upload = uploadFile(file[0]);
    upload.finally(() => {
      setLoading(false);
    });
  };
  return (
    <Dropzone
      onDrop={handleDrop}
      accept=".csv"
      disableFilename
    />
  );
};
