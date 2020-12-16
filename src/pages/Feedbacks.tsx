import * as React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "antd";

import { log } from "./../global";
import { FeedbackObj, BoardObj } from "./../types";

const { Title, Text, Paragraph } = Typography;

export const FeedbacksPage = (props) => {
  const { id: boardId } = useParams<{ id: string }>();
  const [boardData, setBoardData] = React.useState<BoardObj>({
    name: "Michelle Lynn",
    description:
      "Urna ut volutpat egestas amet posuere pellentesque molestie sagittis nisi",
    feedbackCount: 2,
  });
  const [feedbacks, setFeedbacks] = React.useState<FeedbackObj[]>([]);
  log(boardId);

  const fetchData = (): FeedbackObj[] => {
    // TODO: implement this function
    return [
      {
        message:
          "Nice guy. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur ipsa quis minus nostrum laboriosam vero harum itaque vitae laudantium doloremque.",
      },
      {
        message:
          "Tenetur ipsa quis minus nostrum laboriosam vero harum itaque vitae laudantium doloremque.",
      },
    ];
  };

  React.useEffect(() => {
    setFeedbacks(fetchData());
  }, []);

  const generateFeedbackCard = (feedback: FeedbackObj) => {
    return (
      <div className="feedback-card">
        <p className="content">{feedback.message}</p>
      </div>
    );
  };

  return (
    <div className="page" id="feedbacks-page">
      <div className="header">
        <Title>{boardData.name}</Title>
        <Paragraph>{boardData.description}</Paragraph>
      </div>

      {boardData.feedbackCount === 0 ? (
        <Text className="no-feedback-message">No feedback so far.</Text>
      ) : (
        <div className="feedbacks-container">
          {feedbacks.map(generateFeedbackCard)}
        </div>
      )}
    </div>
  );
};
