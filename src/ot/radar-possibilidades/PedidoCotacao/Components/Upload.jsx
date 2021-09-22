import React from "react";
import Dropzone from "react-dropzone";
import { IconButton } from "common";

export default ({ onDrop, multiple, label }) => (
  <Dropzone onDrop={onDrop}>
    {({ getRootProps, getInputProps }) => (
      <section>
        <div {...getRootProps()}>
          <input {...getInputProps()} multiple={multiple} />
          <IconButton title="Upload" icon="upload" color="#00A65A">
            {label && label}
          </IconButton>
        </div>
      </section>
    )}
  </Dropzone>
);
