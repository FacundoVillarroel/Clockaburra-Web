// Import necessary libraries and components
import React from "react";
import styled from "styled-components";
import Button from "../../components/ui/button/Button";

import Card from "../../components/ui/card/Card";
import Colors from "../../constants/Colors";

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
  color: ${Colors.primary};
  margin-bottom: 20px;
`;

const SubHeadline = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
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

const Home = () => {
  return (
    <Container>
      <Header>
        <Card
          padding={"2rem 16rem"}
          boxShadow={"0 2px 5px rgba(17,31,77,0.1);"}
        >
          <Headline>Welcome to Clockaburra</Headline>
          <SubHeadline>
            Your ultimate timesheet management solution.
          </SubHeadline>
          <Button>Get Started</Button>
        </Card>
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
    </Container>
  );
};

export default Home;
