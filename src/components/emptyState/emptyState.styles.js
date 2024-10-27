import styled from "styled-components";
import { LuAlertCircle } from "react-icons/lu";
import Colors from "../../constants/Colors";

export const StyledCard = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0px 4px 12px ${Colors.primary};
  background-color: ${Colors.lightBackground};
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  text-align: center;
`;

export const MessageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${Colors.darkerAccent};
  letter-spacing: -0.5px;
`;

export const MessageText = styled.p`
  font-size: 0.875rem;
  color: ${Colors.darkerAccent};
`;

export const StyledAlertCircle = styled(LuAlertCircle)`
  width: 3rem;
  height: 3rem;
  color: ${Colors.darkerAccent};
  margin-bottom: 1rem;
`;
