// Import necessary libraries and components
import React from "react";
import Button from "../../components/ui/button/Button";

import Card from "../../components/ui/card/Card";

import {
  Container,
  Header,
  Headline,
  SubHeadline,
  FeaturesSection,
  Feature,
  FeatureTitle,
  FeatureDescription,
} from "./Home.styles";

const Home = () => {
  return (
    <Container>
      <Header>
        <Card
          padding={"2rem 16rem"}
          box_shadow={"0 2px 5px rgba(17,31,77,0.1);"}
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
