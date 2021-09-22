import React from "react";
import ReactDropzone from "react-dropzone";

const Container = ({
  label,
  labelValidFile,
  labelInvalidFile,
  inputProps,
  divProps: { styleDiv, ...otherDivProps },
  getRootProps,
  getInputProps,
  isDragActive,
  isDragReject,
  minWidthContainer,
  nameFile
}) => {
  let color = "#337ab7";
  if ((isDragActive && !isDragReject) || nameFile) color = "#4cae4c";
  else if (isDragReject && labelInvalidFile) color = "#d9534f";
  return (
    <div
      className="dropzone fade-in fade-out"
      style={{
        cursor: "pointer",
        padding: "0 10px",
        borderColor: color,
        minWidth: minWidthContainer,
        maxWidth: 500,
        height: 50,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color,
        display: "flex",
        alignItems: "center",
        margin: "initial",
        ...styleDiv
      }}
      {...getRootProps()}
      {...otherDivProps}
    >
      <input {...getInputProps()} {...inputProps} />
      {nameFile ? (
        <span>
          <i className="fa fa-file" style={{ marginRight: 5 }} />
          {nameFile}
        </span>
      ) : (
        <span>
          <i className="fa fa-upload" style={{ marginRight: 5 }} />
          {!isDragActive && label}
          {isDragActive && !isDragReject && labelValidFile}
          {isDragReject && labelInvalidFile}
        </span>
      )}
    </div>
  );
};

Container.defaultProps = {
  divProps: {},
  inputProps: {}
};

const Dropzone = ({
  label,
  labelValidFile,
  labelInvalidFile,
  inputProps,
  divProps,
  minWidthContainer,
  onDrop,
  disableFilename,
  ...others
}) => {
  const [nameFile, setNameFile] = React.useState("");
  const handleDrop = file => {
    if (file.length === 1) setNameFile(file[0].name);
    else if (file.length > 1)
      setNameFile(`${file.length} arquivos selecionados`);
    else setNameFile("");
    onDrop(file);
  };
  const MyContainer = props => (
    <Container
      label={label}
      labelValidFile={labelValidFile}
      labelInvalidFile={labelInvalidFile}
      inputProps={inputProps}
      divProps={divProps}
      minWidthContainer={minWidthContainer}
      nameFile={!disableFilename && nameFile}
      {...props}
    />
  );
  return (
    <ReactDropzone onDrop={handleDrop} {...others}>
      {MyContainer}
    </ReactDropzone>
  );
};

Dropzone.defaultProps = {
  accept: "*",
  onDrop: file => console.log("onDrop-file", file),
  label: "Clique aqui ou solte um arquivo",
  labelValidFile: "Solte o arquivo aqui!",
  labelInvalidFile: "Arquivo inválido!",
  minWidthContainer: 310
};

export default Dropzone;
