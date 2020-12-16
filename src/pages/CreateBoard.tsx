import * as React from "react";
import { Formik } from "formik";
import { Button, Form, Input, Typography } from "antd";

import { log, getInitialValues } from "./../global";
import { FormObj } from "./../types";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export const CreateBoardPage = (props) => {
  const _form: FormObj = {
    handlers: {
      onSumbit: (values: any, { setSubmitting }: any) => {
        setTimeout(() => {
          log("form-values", values);
          setSubmitting(false);
        }, 400);
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
          "Share this code with your friends, they need this to give their feedback.",
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
    <div className="page">
      <div className="header">
        <Title>Create Board</Title>
        <Paragraph>
          Urna ut volutpat egestas amet posuere pellentesque molestie sagittis
          nisi
        </Paragraph>
      </div>

      <Formik
        initialValues={getInitialValues(_form)}
        onSubmit={_form.handlers.onSumbit}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form onSubmitCapture={handleSubmit} layout="vertical">
            {Object.entries(_form.inputFields).map(([fieldName, fieldObj]) => {
              return (
                <Form.Item
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
                    />
                  ) : (
                    <Input
                      name={fieldName}
                      onChange={handleChange}
                      placeholder={fieldObj.placeholder}
                      required={fieldObj.isRequired}
                      type={fieldObj.isSecured ? "password" : "text"}
                    />
                  )}
                  <p className="form-item-description">
                    {fieldObj.description}
                  </p>
                </Form.Item>
              );
            })}

            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                onClick={() => {
                  handleSubmit();
                }}
              >
                create board
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};
