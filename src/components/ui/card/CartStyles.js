import styled from "styled-components";

export const StyledCard = styled.div`
  background-color: ${(props) => props.bgColor || "#fff"};
  border: ${(props) => props.border || "1px solid #e0e0e0"};
  border-radius: ${(props) => props.borderRadius || "1rem"};
  box-shadow: ${(props) => props.box_shadow || "0 2px 5px rgba(0,0,0,0.1)"};
  padding: ${(props) => props.padding || ".8rem"};
  margin: ${(props) => props.margin || "1rem 0rem"};
`;
