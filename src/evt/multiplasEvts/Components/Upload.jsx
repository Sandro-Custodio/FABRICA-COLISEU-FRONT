import React from "react";
import Dropzone from "react-dropzone";
import { IconButton } from "common";

export default ({ onDrop, multiple, label, title, disabled, ...others }) => (
  <Dropzone onDrop={onDrop}>
    {({ getRootProps, getInputProps }) => (
      <section>
        <div {...getRootProps()}>
          <input {...getInputProps()} multiple={multiple} disabled={disabled} />
          <IconButton
            {...others}
            title={title && title}
            icon="upload"
            disabled={disabled}
          >
            {label && label}
          </IconButton>
        </div>
      </section>
    )}
  </Dropzone>
);
