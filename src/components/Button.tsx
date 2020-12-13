import * as React from "react";

import "./../style/button.component.scss";

const Button = ({ children }) => {
  return <button className="button">{children}</button>;
};

export default Button;
