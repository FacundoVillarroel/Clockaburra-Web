import React from "react";
import {
  LuUsers,
  LuClock,
  LuCalendar,
  LuSmartphone,
  LuRefreshCw,
  LuUserPlus,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/button/Button";
import Colors from "../../constants/Colors";

import {
  Container,
  Header,
  Headline,
  SubHeadline,
  FeaturesSection,
  Feature,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
} from "./home.styles";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <LuCalendar size={32} color={Colors.secondary} />,
      title: "Shift Scheduling Made Simple",
      description:
        "Effortlessly create, edit, and manage employee shifts with an intuitive interface designed for efficiency. Whether it's weekly or monthly scheduling, your team is always covered.",
    },
    {
      icon: <LuClock size={32} color={Colors.secondary} />,
      title: "Timesheet Management",
      description:
        "Monitor and manage employee hours with detailed timesheet tracking. View work hours, overtime, and breaks for individuals or your entire team on a weekly or monthly basis.",
    },
    {
      icon: <LuUsers size={32} color={Colors.secondary} />,
      title: "User Permissions & Role Assignment",
      description:
        "Tailor access for different team members. Assign custom permissions for managers, supervisors, and employees, ensuring the right people have control over scheduling and timesheets.",
    },
    {
      icon: <LuSmartphone size={32} color={Colors.secondary} />,
      title: "Mobile Access for Employees",
      description:
        "Employees can view their shifts, clock in, and manage their timesheets directly from the mobile app. Real-time updates ensure everyone stays on the same page.",
    },
    {
      icon: <LuRefreshCw size={32} color={Colors.secondary} />,
      title: "Real-Time Clock-In/Clock-Out Sync",
      description:
        "Employees can clock in, start breaks, and clock out through the mobile app. All time entries are instantly synced, giving you up-to-date timesheet data without manual entry.",
    },
    {
      icon: <LuUserPlus size={32} color={Colors.secondary} />,
      title: "Employee Registration & Onboarding",
      description:
        "Register new employees in minutes, setting them up with appropriate roles and permissions. Simplify onboarding by ensuring all new hires are ready to go from day one.",
    },
  ];

  const handleClick = () => {
    navigate("/employees");
  };

  return (
    <Container>
      <Header>
        <Headline>Welcome to Clockaburra</Headline>
        <SubHeadline>
          Revolutionize your workforce management with our all-in-one solution
        </SubHeadline>
        <Button
          onClick={handleClick}
          bg_color={Colors.accent}
          color={Colors.primary}
          hover_bg_color={Colors.darkerAccent}
        >
          <strong>Get Started</strong>
        </Button>
      </Header>
      <FeaturesSection>
        {features.map((feature, index) => (
          <Feature key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </Feature>
        ))}
      </FeaturesSection>
    </Container>
  );
}
