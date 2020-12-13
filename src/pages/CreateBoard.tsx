import * as React from "react";
import { Formik } from "formik";

import Title from "./../components/Title";
import Button from "./../components/Button";
import { FormObj, InputFieldObj } from "./../types";

import "./../style/create-board.page.scss";

const CreateBoardPage = (props) => {
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

  const generateInputField = (fieldObj: InputFieldObj): any => {
    return (
      <div className="input-field">
        <label className="input-field--label" htmlFor={fieldObj.label}>
          {fieldObj.label}
        </label>
        <input
          className="input-field--input"
          id={fieldObj.label}
          placeholder={fieldObj.placeholder}
        />
        {fieldObj.description ? (
          <p className="input-field--description">{fieldObj.description}</p>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <div className="header">
        <Title>Create Board</Title>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio,
          consectetur.
        </p>
      </div>

      <Formik
        initialValues={_form.initialValues}
        onSubmit={_form.handlers.onSumbit}
      >
        {({ values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {_form.inputFields.map(generateInputField)}

            <Button>Create Board</Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBoardPage;
