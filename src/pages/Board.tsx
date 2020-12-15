import * as React from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";

import { Title, InputField, Button } from "./../components";
import { log } from "./../global";
import { BoardObj } from "./../types";

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

  const _form = {
    initialValues: {
      passcode: "sahithyan",
      feedbackMsg: "",
    },
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
      },
      feedbackMsg: {
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
        {/**
         * @abstract of {ContentHeader}
         */}
        <Title>{boardData.name}</Title>
        <p className="content">{boardData.description}</p>
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
        initialValues={_form.initialValues}
        onSubmit={_form.handlers.onSumbit}
      >
        {({ values, handleChange, handleSubmit }) =>
          lockedState ? (
            <form>
              <InputField
                fieldObj={_form.inputFields.passcode}
                onChange={handleChange}
                value={values.passcode}
                type="password"
              />

              <Button onClick={handleSubmit}>proceed</Button>
            </form>
          ) : null
        }
      </Formik>
    </div>
  );
};
