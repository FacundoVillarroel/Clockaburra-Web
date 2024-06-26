import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Colors from "../../constants/Colors";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  padding-bottom: 5rem;
  background: linear-gradient(to bottom, ${Colors.primary}, white);
`;

export const Container = styled.div`
  padding: 12px 16px;
  @media (min-width: 768px) {
    padding: 24px 24px;
  }
  @media (min-width: 1024px) {
    padding: 32px 32px;
  }
  text-align: center;
`;

export const Content = styled.div`
  max-width: 640px;
  margin: 0 auto;
  & > * + * {
    margin-top: 24px;
  }
`;

export const Heading = styled.h1`
  font-size: 2.25rem;
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  font-weight: bold;
  color: ${Colors.accent};
`;

export const Paragraph = styled.p`
  font-size: 1.125rem;
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
  color: white;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

export const ButtonLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 24px;
  border-radius: 8px;
  background-color: ${Colors.primary};
  color: ${Colors.accent};
  font-weight: 500;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: ${Colors.secondary};
  }

  &:focus {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
  }

  & > svg {
    margin-right: 8px;
    width: 24px;
    height: 24px;
  }
`;

export const ScreenshotGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;

  & > div {
    flex: 1 1 calc(50% - 16px);
  }

  @media (min-width: 768px) {
    & > div {
      flex: 1 1 calc(33.3333% - 16px);
    }
  }
`;

export const Screenshot = styled.img`
  width: 200px;
  height: 300px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;
