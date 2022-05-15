import React from "react";
import { Link } from "react-router-dom";

export const CustomLink = (props: any) => {
  const {to, children, ...rest} = props
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};
