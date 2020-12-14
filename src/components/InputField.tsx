import * as React from "react";
import { InputFieldObj } from "./../types";

interface PropTypes {
  fieldObj: InputFieldObj;
  onChange: any;
}

export const InputField = ({ fieldObj, onChange }: PropTypes) => {
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
      />
      {fieldObj.description ? (
        <p className="input-field--description">{fieldObj.description}</p>
      ) : null}
    </div>
  );
};
