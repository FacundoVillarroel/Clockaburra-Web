import styled from "styled-components";

export const AlertWrapper = styled.div`
  background-color: ${(props) => props.bgColor || "#f8d7da"};
  color: ${(props) => props.color || "#721c24"};
  padding: ${(props) => props.padding || ".8rem 1.6rem"};
  border: ${(props) => props.border || "1px solid #f5c6cb"};
  border-radius: ${(props) => props.borderRadius || ".4rem"};
  margin: ${(props) => props.margin || ".8rem, 0rem"};
  width: fit-content;
`;
