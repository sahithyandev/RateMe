import * as React from "react";
import { useParams } from "react-router-dom";
import { log } from "./../global";
import { Title } from "../components";
import { FeedbackObj, BoardObj } from "./../types";

export const FeedbacksPage = (props) => {
  const { id: boardId } = useParams<{ id: string }>();
  const [boardData, setBoardData] = React.useState<BoardObj>();
  const [feedbacks, setFeedbacks] = React.useState<FeedbackObj[]>();
  log(boardId);

  const fetchData = () => {
    // TODO: implement this function
    return [];
  };

  React.useEffect(() => {
    setFeedbacks(fetchData());
  });

  const generateFeedbackCard = (feedback: FeedbackObj) => {
    return (
      <div className="feedback-card">
        <p className="content">{feedback.message}</p>
      </div>
    );
  };

  return (
    <div className="page" id="feedbacks-page">
      <Title>{boardData.name}</Title>
      {boardData.feedbackCount === 0 ? null : (
        <div className="feedbacks-container">
          {feedbacks.map(generateFeedbackCard)}
        </div>
      )}
    </div>
  );
};
