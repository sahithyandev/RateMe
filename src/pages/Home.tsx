import * as React from "react";
import { Button, Typography } from "antd";

import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export const HomePage = (props) => {
  return (
    <div className="page">
      <Title>RateMe</Title>
      <Paragraph>Under development. :)</Paragraph>
      <Link to="/create">
        <Button type="primary" className="full-button">
          Create Your Board
        </Button>
      </Link>
    </div>
  );
};
