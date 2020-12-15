import * as React from "react";
import { Formik } from "formik";

import { Button } from "./../components/Button";
import { FormObj } from "./../types";

import { ContentHeader,InputField } from "./../components";

export const CreateBoardPage = (props) => {
  const _form: FormObj = {
    initialValues: {
      name: "",
      passcode: "",
      unlockKey: "",
      description: "",
    },
    handlers: {
      onSumbit: (values: any, { setSubmitting }: any) => {
        setTimeout(() => {
          console.log("form-values", values);
          setSubmitting(false);
        }, 400);
      },
    },
    inputFields: [
      { label: "name", placeholder: "", description: "Name of the board" },
      {
        label: "passcode",
        placeholder: "",
        description:
          "Share this code with your friends, they need this to give their feedback.",
      },
      {
        label: "unlock key",
        placeholder: "",
        description:
          "Works like a password. you need this to see other’s feedback to you. Don’t share with anyone.",
      },
      {
        label: "description",
        placeholder: "",
        description: "Optional description for the board",
      },
    ],
  };

  return (
    <div className="page">
      <ContentHeader
        title="Create Board"
        content="Urna ut volutpat egestas amet posuere pellentesque molestie sagittis nisi"
      />

      <Formik
        initialValues={_form.initialValues}
        onSubmit={_form.handlers.onSumbit}
      >
        {({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            {_form.inputFields.map((fieldObj) => {
              return (
                <InputField
                  key={fieldObj.label}
                  fieldObj={fieldObj}
                  onChange={handleChange}
                />
              );
              // generateInputField
            })}

            <Button type="submit">Create Board</Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
