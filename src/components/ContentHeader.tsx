import * as React from "react";
import { Title } from "./Title";

export const ContentHeader = ({ title, content }) => {
  return (
    <div className="content-header-component">
      <Title>{title}</Title>
      <p className="content">{content}</p>
    </div>
  );
};
