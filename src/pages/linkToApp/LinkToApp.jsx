import React, { useEffect, useRef, useState } from "react";
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
  AlertMessage,
} from "./linkToAppStyles.js";

const LinkToApp = () => {
  const [userName, setUserName] = useState("");
  const hasMounted = useRef(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
    }
  }, [user]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
    } else {
      return () => {
        if (user) {
          if (user.permissions !== "admin") {
            dispatch(logout());
          }
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
              {userName && `Hello ${userName}! `}Experience the best way to
              manage your tasks and stay organized on the go.
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

          <AlertMessage>
            This site is not accessible on screens smaller than 1024px or on
            mobile devices. To enjoy the best experience, please download our
            app for Android or iPhone.
          </AlertMessage>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default LinkToApp;
