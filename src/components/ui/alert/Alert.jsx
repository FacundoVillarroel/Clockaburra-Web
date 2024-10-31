import React from "react";

import { AlertWrapper } from "./alertStyles.js";

const Alert = ({ children, ...props }) => {
  return <AlertWrapper {...props}>{children}</AlertWrapper>;
};

export default Alert;
