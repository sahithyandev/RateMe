import * as React from "react";

interface PropTypes {
  children: any;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}

export const Button = ({ children, onClick, type }: PropTypes) => {
  return (
    <button onClick={onClick} type={type} className="button-component">
      {children}
    </button>
  );
};
