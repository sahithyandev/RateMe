import * as React from "react";
import { Typography } from "antd";

import { FeedbackObj } from "./../types";

const { Paragraph } = Typography;

interface Props {
  data: FeedbackObj;
}

export const FeedbackCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="feedback-card">
      <Paragraph className="content">{data.message}</Paragraph>
    </div>
  );
};
