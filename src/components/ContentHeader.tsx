import * as React from "react";
import { Title } from "./Title";

export const ContentHeader = ({ title, content }) => {
  return (
    <div className="header">
      <Title>{title}</Title>
      <p>{content}</p>
    </div>
  );
};
