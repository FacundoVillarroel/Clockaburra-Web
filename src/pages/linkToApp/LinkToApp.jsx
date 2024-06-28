import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducers/authSlice";

import { FaApple, FaGooglePlay } from "react-icons/fa";
import screenshot1 from "../../assets/screenshot1.jpg";
import screenshot2 from "../../assets/screenshot2.jpg";
import screenshot3 from "../../assets/screenshot3.jpg";

import {
  Wrapper,
  Container,
  Content,
  Heading,
  Paragraph,
  FlexContainer,
  ButtonLink,
  ScreenshotGrid,
  Screenshot,
} from "./linkToApp.styles";

const LinkToApp = () => {
  const hasMounted = useRef(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
    } else {
      return () => {
        if (user === "employee") {
          dispatch(logout());
        }
      };
    }
  }, [user, dispatch]);

  return (
    <Wrapper>
      <Container>
        <Content>
          <div>
            <Heading>Download Our App</Heading>
            <Paragraph>
              Experience the best way to manage your tasks and stay organized on
              the go.
            </Paragraph>
          </div>
          <FlexContainer>
            <ButtonLink to="#">
              <FaApple />
              Download on the App Store
            </ButtonLink>
            <ButtonLink to="#">
              <FaGooglePlay />
              Get it on Google Play
            </ButtonLink>
          </FlexContainer>
          <ScreenshotGrid>
            <Screenshot src={screenshot1} alt="App Screenshot" />
            <Screenshot src={screenshot2} alt="App Screenshot" />
            <Screenshot src={screenshot3} alt="App Screenshot" />
          </ScreenshotGrid>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default LinkToApp;
