import * as React from "react";
import { Formik, FormikHelpers } from "formik";
import { Button, Form, Input, Typography } from "antd";

import { getInitialValues } from "./../global";
import { FormObj } from "./../types";
import { FirebaseContext } from "./../firebase-manager";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export const CreateBoardPage = (props) => {
  const firebaseManager = React.useContext(FirebaseContext);

  const _form: FormObj = {
    handlers: {
      onSumbit: (values: any, { setSubmitting }: FormikHelpers<any>) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 400);

        firebaseManager.createBoard({ ...values, feedbackCount: 0 });
        // TODO show the "success" message
      },
    },
    inputFields: {
      name: {
        label: "name",
        placeholder: "",
        isMultiLine: false,
        isRequired: true,
        description: "Name of the board",
        initialValue: "",
      },
      passcode: {
        label: "passcode",
        placeholder: "",
        isMultiLine: false,
        isSecured: true,
        isRequired: true,
        description:
          "Share this code with your friends, they need this code to give their feedback.",
        initialValue: "",
      },
      unlockKey: {
        label: "unlock key",
        placeholder: "",
        isMultiLine: false,
        isSecured: true,
        isRequired: true,
        description:
          "Works like a password. you need this to see other’s feedback to you. Don’t share with anyone.",
        initialValue: "",
      },
      description: {
        label: "description",
        placeholder: "",
        isMultiLine: true,
        isRequired: false,
        description: "Optional description for the board",
        initialValue: "",
      },
    },
  };

  return (
    <div className="page" id="create-board-page">
      <div className="header">
        <Title>Create Board</Title>
        <Paragraph>
          {/* TODO Show a useful message here */}
          Urna ut volutpat egestas amet posuere pellentesque molestie sagittis
          nisi
        </Paragraph>
      </div>

      <Formik
        initialValues={getInitialValues(_form)}
        onSubmit={_form.handlers.onSumbit}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form
            onSubmitCapture={handleSubmit}
            layout="vertical"
            requiredMark={true}
          >
            {Object.entries(_form.inputFields).map(([fieldName, fieldObj]) => {
              return (
                <Form.Item
                  required={fieldObj.isRequired}
                  label={fieldObj.label}
                  key={fieldObj.label}
                  rules={[
                    {
                      required: true,
                      message: `Please input ${fieldObj.label}`,
                    },
                  ]}
                >
                  {fieldObj.isMultiLine ? (
                    <TextArea
                      name={fieldName}
                      onChange={handleChange}
                      placeholder={fieldObj.placeholder}
                      required={fieldObj.isRequired}
                      value={values[fieldName]}
                    />
                  ) : (
                    <Input
                      name={fieldName}
                      onChange={handleChange}
                      placeholder={fieldObj.placeholder}
                      required={fieldObj.isRequired}
                      type={fieldObj.isSecured ? "password" : "text"}
                      value={values[fieldName]}
                    />
                  )}
                  <p className="form-item-description">
                    {fieldObj.description}
                  </p>
                </Form.Item>
              );
            })}

            <Form.Item>
              <Button type="primary" size="large" htmlType="submit">
                create board
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};
