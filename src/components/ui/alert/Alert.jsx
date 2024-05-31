import React from "react";

import { AlertWrapper } from "./Alert.styles";

const Alert = ({ children, ...props }) => {
  return <AlertWrapper {...props}>{children}</AlertWrapper>;
};

export default Alert;
