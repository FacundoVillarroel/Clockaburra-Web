// Import necessary libraries and components
import React from "react";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background-color: #f8f9fa;
  text-align: center;
`;

const Headline = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

const SubHeadline = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
`;

const CallToAction = styled.button`
  padding: 15px 30px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const FeaturesSection = styled.section`
  padding: 60px 20px;
  background-color: #fff;
  text-align: center;
`;

const Feature = styled.div`
  margin-bottom: 40px;
`;

const FeatureTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: #666;
`;

const Footer = styled.footer`
  padding: 20px;
  background-color: #111f4d;
  text-align: center;
  color: white;
`;

const Home = () => {
  return (
    <Container>
      <Header>
        <Headline>Welcome to Clockaburra</Headline>
        <SubHeadline>Your ultimate timesheet management solution.</SubHeadline>
        <CallToAction>Get Started</CallToAction>
      </Header>
      <FeaturesSection>
        <Feature>
          <FeatureTitle>Easy Time Tracking</FeatureTitle>
          <FeatureDescription>
            Track your working hours effortlessly and accurately.
          </FeatureDescription>
        </Feature>
        <Feature>
          <FeatureTitle>Detailed Reports</FeatureTitle>
          <FeatureDescription>
            Generate comprehensive reports for better insights.
          </FeatureDescription>
        </Feature>
        <Feature>
          <FeatureTitle>Mobile Friendly</FeatureTitle>
          <FeatureDescription>
            Access and manage your timesheets on the go.
          </FeatureDescription>
        </Feature>
      </FeaturesSection>
      <Footer>
        &copy; {new Date().getFullYear()} Clockaburra. All rights reserved.
      </Footer>
    </Container>
  );
};

export default Home;
