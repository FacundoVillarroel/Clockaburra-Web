import styled from "styled-components";

import Colors from "../../../constants/Colors";

export const StyledButton = styled.button`
  background-color: ${(props) => props.bg_color || Colors.primary};
  color: ${(props) => props.color || "#fff"};
  padding: ${(props) => props.padding || ".6rem 1.4rem"};
  margin: ${(props) => props.margin || "0px"};
  border: none;
  border-radius: ${(props) => props.border_radius || ".4rem"};
  font-size: ${(props) => props.font_size || "1.2rem"};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hover_bg_color || Colors.secondary};
  }
`;
