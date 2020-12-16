import * as React from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { Button, Typography, Form, Input } from "antd";

import { log, getInitialValues } from "./../global";
import { BoardObj, FormObj } from "./../types";

const { Title, Paragraph } = Typography;

// TODO: implement `unlocked` state
export const BoardPage = (props) => {
  const { id: boardId } = useParams<{ id: string }>();
  // TODO: revert to default
  const [lockedState, setLockedState] = React.useState(true);
  const [boardData, setBoardData] = React.useState<BoardObj>({
    name: "Michelle Lynn",
    description:
      "Urna ut volutpat egestas amet posuere pellentesque molestie sagittis nisi",
    feedbackCount: 1,
  });

  const _form: FormObj = {
    handlers: {
      onSumbit: (values: any, { setSubmitting }: any) => {
        setTimeout(() => {
          log("form-values", values);

          if (lockedState) {
            // if locked; try to unlock it.
            if (checkPasscode()) setLockedState(false);
          } else {
          }
          setSubmitting(false);
        }, 400);
      },
    },
    inputFields: {
      passcode: {
        label: "passcode",
        placeholder: "",
        description: "Contact the creator of this board, to get the passcode.",
        isSecured: true,
        isRequired: true,
        initialValue: "sahithyan",
      },
      feedbackMsg: {
        initialValue: "",
        label: "feedback message",
        placeholder: "Enter your message here",
      },
    },
  };

  const checkPasscode = () => {
    // check it on firebase's cloud functions
    return true;
  };

  const fetchData = () => {
    // TODO: implement this function
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page" id="board-page">
      <div className="header">
        <Title>{boardData.name}</Title>
        <Paragraph>{boardData.description}</Paragraph>

        <div className="icon-container">
          <span className="fas fa-comment"></span>
          <span className="feedback-count">{boardData.feedbackCount}</span>
        </div>
      </div>
      {lockedState ? null : (
        <div className="info">
          <span className="fas fa-info-circle"></span>
          <span>Be honest. You are anonymous here.</span>
        </div>
      )}
      <Formik
        initialValues={getInitialValues(_form)}
        onSubmit={_form.handlers.onSumbit}
      >
        {({ values, handleChange, handleSubmit }) => {
          const inputFieldId = "passcode";
          const selectedInputField = _form.inputFields[inputFieldId];
          return lockedState ? (
            <Form>
              <Form.Item
                label={selectedInputField.label}
                key={selectedInputField.label}
                rules={[
                  {
                    required: true,
                    message: `Please input ${selectedInputField.label}`,
                  },
                ]}
              >
                <Input
                  name={inputFieldId}
                  required={selectedInputField.isRequired}
                  onChange={handleChange}
                  placeholder={selectedInputField.placeholder}
                  type={selectedInputField.isSecured ? "password" : "text"}
                  value={values[inputFieldId]}
                />
                <p className="form-item-description">
                  {selectedInputField.description}
                </p>
              </Form.Item>
              <Button
                size="large"
                onClick={() => {
                  handleSubmit();
                }}
                type="primary"
                htmlType="submit"
              >
                proceed
              </Button>
            </Form>
          ) : null;
        }}
      </Formik>
    </div>
  );
};
