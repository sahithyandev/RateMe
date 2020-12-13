import * as React from "react";

import "./../style/button.component.scss";

interface PropTypes {
  children: any;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}

export const Button = ({ children, onClick, type }: PropTypes) => {
  return (
    <button onClick={onClick} type={type} className="button">
      {children}
    </button>
  );
};
