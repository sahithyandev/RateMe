import * as React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "antd";

import { FirebaseContext } from "./../firebase-manager";

import { FeedbackObj, BoardObj, InputFieldObj } from "./../types";
import { ModalForm } from "./../componenets/ModalForm";
import { FeedbackCard } from "./../componenets/FeedbackCard";

const { Title, Text, Paragraph } = Typography;

export const FeedbacksPage = (props) => {
  const firebaseManager = React.useContext(FirebaseContext);

  const { id: boardId } = useParams<{ id: string }>();
  const [isLocked, setIsLocked] = React.useState(false);
  const [boardData, setBoardData] = React.useState<BoardObj>({
    name: "",
    description: "",
    unlockKey: "",
    password: "",
    feedbackCount: 0,
  });
  const [feedbacks, setFeedbacks] = React.useState<FeedbackObj[]>([]);
  console.log(boardId);

  const fetchBoardData = async () => {
    if (boardId) {
      const board = await firebaseManager.getBoard(boardId);
      setBoardData(board);
    }
    return;
  };

  const fetchFeedbacks = async () => {
    // TODO: implement this function
    if (boardId) {
      const feedbacks = await firebaseManager.getFeedbacks(boardId);
      setFeedbacks(feedbacks);
    }
    return;

    // return [
    //   {
    //     message:
    //       "Nice guy. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur ipsa quis minus nostrum laboriosam vero harum itaque vitae laudantium doloremque.",
    //   },
    //   {
    //     message:
    //       "Tenetur ipsa quis minus nostrum laboriosam vero harum itaque vitae laudantium doloremque.",
    //   },
    // ];
  };

  React.useEffect(() => {
    fetchBoardData();
    fetchFeedbacks();
  }, []);

  const goBack = () => {
    // TODO: implement go back functionality
    console.log("not developed yet");
  };

  const unlockKeyInput: InputFieldObj = {
    label: "unlock key",
    name: "unlockKey",
    placeholder: "",
    description:
      "You are not supposed to be here unless you created this board.",
    isRequired: true,
    initialValue: "",
    type: "password",
  };

  const checkUnlockKey = (unlockKey) => {
    return true;
  };

  const onSubmit = ({ unlockKey }) => {
    if (checkUnlockKey(unlockKey)) {
      setIsLocked(false);
    } else {
      setIsLocked(true);
    }
  };

  return (
    <div className="page" id="feedbacks-page">
      <ModalForm
        modalProps={{ visible: isLocked, title: "Enter Unlock Key" }}
        inputField={unlockKeyInput}
        onSubmit={onSubmit}
      />
      <span onClick={goBack} className="fas fa-arrow-left pointable"></span>
      <div className="header">
        <Title>{boardData.name}</Title>
        <Paragraph>{boardData.description}</Paragraph>
      </div>

      {isLocked ? null : boardData.feedbackCount === 0 ? (
        <Text className="no-feedback-message">No feedback so far.</Text>
      ) : (
        <div className="feedbacks-container">
          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback.message} data={feedback} />
          ))}
        </div>
      )}
    </div>
  );
};
