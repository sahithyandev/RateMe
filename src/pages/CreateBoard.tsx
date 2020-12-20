import * as React from "react";
import { Formik, FormikHelpers } from "formik";
import { Button, Form, Input, Typography, Modal } from "antd";

import { getInitialValues } from "./../global";
import { FormObj } from "./../types";
import { FirebaseContext } from "./../firebase-manager";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export const CreateBoardPage = (props) => {
  const firebaseManager = React.useContext(FirebaseContext);
  const [newId, setNewId] = React.useState("");

  const _form: FormObj = {
    handlers: {
      onSumbit: (values: any, { setSubmitting }: FormikHelpers<any>) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 400);

        firebaseManager
          .createBoard({ ...values, feedbackCount: 0 })
          .then((id) => {
            console.log(id);
            setNewId(id);
          })
          .catch((error) => {
            console.error(error);
          });
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

  const copyText = (text) => {
    const el = document.getElementById("link") as HTMLInputElement;
    console.log(el.value);
    el.disabled = false;
    el.select();
    el.setSelectionRange(0, 9999);
    document.execCommand("copy");
    el.disabled = true;
  };

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <div className="page" id="create-board-page">
      <Modal
        visible={newId !== ""}
        className="custom-modal"
        onCancel={() => setNewId("")}
        onOk={() => setNewId("")}
      >
        <Title>Success</Title>

        <Paragraph>
          Share this link with your friends and family, and ask their opinion
          about you.
        </Paragraph>

        <textarea
          disabled={true}
          className="link-share"
          id="link"
          value={`${window.location.host}/board/${newId}`}
        />

        <Button style={{ width: "100%" }} type="primary" onClick={copyText}>
          Copy Link
        </Button>
      </Modal>

      <div className="header">
        <span
          onClick={goBack}
          className="fas fa-arrow-left pointable go-back"
        ></span>
        <Title>Create Board</Title>
        <Paragraph>
          A board is where other people write their feedback on you.
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
