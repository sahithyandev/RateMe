import { FormObj, StrObject } from "./types";

export const getInitialValues = (form: FormObj): StrObject<string> => {
  const outputObj = {};

  Object.entries(form.inputFields).forEach(([fieldName, fieldObj]) => {
    outputObj[fieldName] = fieldObj.initialValue;
  });
  return outputObj;
};
