import React from "react";
import { Link } from "react-router-dom";

export const CustomLink: React.FC<{ to: string; className?: string }> = ({
  to,
  children,
  ...rest
}) => {
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};
