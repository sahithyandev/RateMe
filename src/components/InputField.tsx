import * as React from "react";
import { InputFieldObj } from "./../types";

interface PropTypes {
  fieldObj: InputFieldObj;
  onChange: any;
  value?: string;
  type?: string;
}

export const InputField = ({ fieldObj, onChange, value, type }: PropTypes) => {
  value = value || "";
  type = type || "";
  return (
    <div className="input-field">
      <label className="input-field--label" htmlFor={fieldObj.label}>
        {fieldObj.label}
      </label>
      <input
        className="input-field--input"
        id={fieldObj.label}
        placeholder={fieldObj.placeholder}
        onChange={onChange}
        value={value}
        type={type}
      />
      {fieldObj.description ? (
        <p className="input-field--description">{fieldObj.description}</p>
      ) : null}
    </div>
  );
};
