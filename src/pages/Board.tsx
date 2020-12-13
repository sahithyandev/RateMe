import * as React from "react";
import { useParams } from "react-router-dom";
import { ContentHeader } from "./../components/ContentHeader";
import { Button } from "./../components/Button";
import { InputField } from "./../components/InputField";

import "./../style/board.page.scss";
import { Formik } from "formik";
interface BoardObj {
  name: string;
  description: string;
}

export const BoardPage = (props) => {
  //@ts-ignore
  const { id: boardId } = useParams();
  const [boardData, setBoardData] = React.useState<BoardObj>({
    name: "Michelle Lynn",
    description:
      "Urna ut volutpat egestas amet posuere pellentesque molestie sagittis nisi",
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
    <div className="page">
      <div>
        <ContentHeader title={boardData.name} content={boardData.description} />
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
