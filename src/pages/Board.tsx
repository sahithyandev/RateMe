import * as React from "react";
import { useParams } from "react-router-dom";
import { Title,InputField, Button } from "./../components";

import { Formik } from "formik";
interface BoardObj {
  name: string;
  description: string;
  feedbackCount: number;
}

export const BoardPage = (props) => {
  //@ts-ignore
  const { id: boardId } = useParams();
  const [boardData, setBoardData] = React.useState<BoardObj>({
    name: "Michelle Lynn",
    description:
      "Urna ut volutpat egestas amet posuere pellentesque molestie sagittis nisi",
    feedbackCount: 1,
  });

  const _form = {
    initialValues: {
      passcode: "",
    },
    handlers: {
      onSumbit: (values: any, { setSubmitting }: any) => {
        setTimeout(() => {
          console.log("form-values", values);
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
    },
  };

  const checkPasscode = () => {
    // check it on firebase's cloud functions
    return true;
  };

  const fetchData = () => {
    // get data from firebase
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
      <Formik
        initialValues={_form.initialValues}
        onSubmit={_form.handlers.onSumbit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form>
            <InputField
              fieldObj={_form.inputFields.passcode}
              onChange={handleChange}
            />

            <Button onClick={handleSubmit}>proceed</Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
