import * as React from "react";
import { Formik } from "formik";

import Title from "./../components/Title";
import { FormObj } from "./../types";

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
  };

  return (
    <div>
      <div>
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
        {({ values, handleSubmit }) => <form onSubmit={handleSubmit}></form>}
      </Formik>
    </div>
  );
};

export default CreateBoardPage;
