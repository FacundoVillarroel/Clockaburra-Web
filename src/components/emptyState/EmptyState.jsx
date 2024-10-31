import React from "react";

import {
  StyledCard,
  CardContent,
  StyledAlertCircle,
  MessageTitle,
  MessageText,
} from "./emptyState.styles.js";

const EmptyState = ({ message = "There's nothing to see here" }) => {
  return (
    <StyledCard>
      <CardContent>
        <StyledAlertCircle />
        <MessageTitle>{message}</MessageTitle>
        <MessageText>
          Try adjusting your filters or search criteria to find what you're
          looking for.
        </MessageText>
      </CardContent>
    </StyledCard>
  );
};

export default EmptyState;
