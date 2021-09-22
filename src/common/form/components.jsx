/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import DropdownList from "react-widgets/lib/DropdownList";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import { DebounceInput } from "react-debounce-input";
import Grid from "../layout/grid";
import If from "../operator/if";

export function Label(props) {
  const { cols, text } = props;
  return (
    <Grid cols={cols}>
      <div className="form-group">
        <label>{text}</label>
      </div>
    </Grid>
  );
}

export function LabelInput(props) {
  const { cols, input, label, msgvalidation } = props;
  return (
    <Grid cols={cols}>
      <div className="form-group">
        {label ? <label>{label}</label> : null}
        <DebounceInput
          className="form-control"
          debounceTimeout={800}
          {...props}
          {...input}
        />
      </div>
      {msgvalidation !== "" && msgvalidation !== undefined ? (
        <div className="form-group">
          <span className="label label-danger">{msgvalidation}</span>
        </div>
      ) : null}
    </Grid>
  );
}

export function LabelField(props) {
  const {
    cols,
    input,
    label,
    meta: { touched, error, warning }
  } = props;
  return (
    <Grid cols={cols}>
      <div className="form-group">
        {label ? <label>{label}</label> : null}
        <DebounceInput
          className="form-control"
          debounceTimeout={800}
          {...props}
          {...input}
        />
        {(error && <span className="label label-danger">{error}</span>) ||
          (warning && <span className="label label-warning">{warning}</span>)}
      </div>
    </Grid>
  );
}

export function InputAuth(props) {
  const { hide, input, icon } = props;
  return (
    <If test={!hide}>
      <div className="form-group has-feedback">
        <DebounceInput
          className="form-control"
          debounceTimeout={800}
          {...props}
          {...input}
        />
        <span className={`glyphicon glyphicon-${icon} form-control-feedback`} />
      </div>
    </If>
  );
}

export function Input(props) {
  const { input } = props;
  return (
    <DebounceInput
      className="form-control"
      debounceTimeout={800}
      {...props}
      {...input}
    />
  );
}

export function DropdownListField(props) {
  const {
    label,
    cols,
    msgvalidation,
    input,
    meta: { error, warning }
  } = props;
  return (
    <Grid cols={cols}>
      <div className="form-group">
        {label ? <label>{label}</label> : null}
        <DropdownList {...props} {...input} />
        {msgvalidation === undefined &&
          ((error && (
            <div className="form-group">
              <span className="label label-danger">{error}</span>
            </div>
          )) ||
            (warning && (
              <div className="form-group">
                <span className="label label-warning">{warning}</span>
              </div>
            )))}
      </div>
      {msgvalidation !== "" && msgvalidation !== undefined ? (
        <div className="form-group">
          <span className="label label-danger">{msgvalidation}</span>
        </div>
      ) : null}
    </Grid>
  );
}

export function DateTimePickerField(props) {
  const {
    input,
    cols,
    label,
    msgvalidation,
    meta: { error, warning },
    formatacao,
    visualizacao
  } = props;
  return (
    <Grid cols={cols}>
      <div className="form-group">
        {label ? <label>{label}</label> : null}
        <DateTimePicker
          onChange={value => {
            input.onChange(value ? value.toLocaleDateString() : "");
          }}
          format={formatacao ? formatacao : "DD/MM/YYYY"}
          {...props}
          views={visualizacao ? visualizacao : ["month", "year", "decade"]}
        />
      </div>
      {msgvalidation !== "" && msgvalidation !== undefined ? (
        <div className="form-group">
          <span className="label label-danger">{msgvalidation}</span>
        </div>
      ) : null}
      {msgvalidation === undefined &&
        ((error && (
          <div className="form-group">
            <span className="label label-danger">{error}</span>
          </div>
        )) ||
          (warning && (
            <div className="form-group">
              <span className="label label-warning">{warning}</span>
            </div>
          )))}
    </Grid>
  );
}

export function TextareaField(props) {
  const { input, cols, label, msgvalidation, error } = props;
  const hasError = error ? "has-error" : "";
  const msgError = error && "Preenchimento Obrigatório!";

  return (
    <Grid cols={cols}>
      <div className={`form-group ${hasError}`}>
        {label && <label>{label}</label>}
        <DebounceInput
          debounceTimeout={800}
          element="textarea"
          {...props}
          {...input}
          cols="40"
        />
        {error && <span className="help-block">{msgError}</span>}
      </div>
      {msgvalidation !== "" && msgvalidation !== undefined && (
        <div className="form-group">
          <span className="label label-danger">{msgvalidation}</span>
        </div>
      )}
    </Grid>
  );
}

export function TextareaFieldValidation(props) {
  const {
    input,
    cols,
    label,
    msgvalidation,
    meta: { error, warning }
  } = props;

  return (
    <Grid cols={cols}>
      <div className="form-group">
        {label && <label>{label}</label>}
        <DebounceInput
          debounceTimeout={800}
          element="textarea"
          {...props}
          {...input}
          cols="40"
        />
      </div>
      {error && (
        <div className="form-group">
          <span className="label label-danger">{error}</span>
        </div>
      )}
    </Grid>
  );
}

export function SpanLabel(props) {
  const { type, children, cols } = props;
  return (
    <If test={children !== "" && children !== undefined}>
      <Grid cols={cols}>
        <div className="form-group">
          <span className={`label label${type ? `-${type}` : ""}`}>
            {children}
          </span>
        </div>
      </Grid>
    </If>
  );
}
