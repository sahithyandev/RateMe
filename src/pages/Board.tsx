import * as React from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { Button, Typography, Form, Input } from "antd";

import firebase from "firebase";

import { getInitialValues } from "./../global";
import { BoardObj, FormObj, InputFieldObj } from "./../types";
import { ModalForm } from "./../componenets/ModalForm";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export const BoardPage = (props) => {
  const { id: boardId } = useParams<{ id: string }>();
  const [isLocked, setIsLocked] = React.useState(false);
  const [boardData, setBoardData] = React.useState<BoardObj>({
    name: "",
    description: "",
    password: "",
    unlockKey: "",
    feedbackCount: 0,
  });

  const mainForm: FormObj = {
    handlers: {
      onSumbit: (values: any, { setSubmitting }: any) => {
        setTimeout(() => {
          console.log("form-values-main", values);
          // TODO: Send data to firebase
          // also update the feedbackCount
          setSubmitting(false);
        }, 400);
      },
    },
    inputFields: {
      feedbackMsg: {
        initialValue: "",
        label: "feedback message",
        placeholder: "Enter your message here",
        isMultiLine: true,
        className: "feedback-msg-input",
      },
    },
  };

  const checkPasscode = (passcode: string) => {
    // check it on firebase's cloud functions
    return true;
  };

  const fetchData = async () => {
    if (boardId) {
      const boardRef = firebase.firestore().collection("boards").doc(boardId);
      const board = await boardRef.get();
      if (!board.exists) {
        console.log("No Boards found");
        setBoardData({
          name: "Board Not Found",
          description: "Blah blah blah...",
          feedbackCount: 0,
          password: "",
          unlockKey: "",
        });
        return;
      }
      console.log("Board details", board.data());
      setBoardData(board.data() as BoardObj);
      // const feedbacksRef = docRef.collection("feedbacks");
      // const feedbacksArr = await feedbacksRef.get();
      // const y = [];
      // const x = feedbacksArr.forEach((snap) => y.push(snap.data()));
      // console.log(y);
    }
  };

  const handleUnlock = ({ passcode }) => {
    if (checkPasscode(passcode)) {
      setIsLocked(false);
    } else {
      setIsLocked(true);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const passcodeInput: InputFieldObj = {
    label: "passcode",
    placeholder: "",
    description: "Contact the creator of this board, to get the passcode.",
    isRequired: true,
    initialValue: "",
    type: "password",
  };

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
      <ModalForm
        onSubmit={handleUnlock}
        inputField={passcodeInput}
        modalProps={{
          visible: isLocked,
          title: "Passcode Required",
          closable: false,
          onCancel: () => {
            console.log("can't close");
          },
        }}
      ></ModalForm>

      <div className="info">
        <span className="fas fa-info-circle"></span>
        <span>Be honest. You are anonymous here.</span>
      </div>

      <Formik
        initialValues={getInitialValues(mainForm)}
        onSubmit={mainForm.handlers.onSumbit}
      >
        {({ values, handleChange, handleSubmit }) => {
          const inputFieldId = "feedbackMsg";
          const selectedInputField = mainForm.inputFields[inputFieldId];

          {
            return isLocked ? (
              <div className="form" />
            ) : (
              <Form className="form">
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
                  <TextArea
                    name={inputFieldId}
                    required={selectedInputField.isRequired}
                    placeholder={selectedInputField.placeholder}
                    onChange={handleChange}
                    className={selectedInputField.className}
                    value={values[inputFieldId]}
                    autoSize={true}
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
                  submit
                </Button>
              </Form>
            );
          }
        }}
      </Formik>
    </div>
  );
};
