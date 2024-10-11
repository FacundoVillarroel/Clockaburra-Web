import { styled } from "styled-components";

import Colors from "../../constants/Colors";

export const Container = styled.div`
  flex: 1;
`;

export const Header = styled.header`
  background: linear-gradient(
    to bottom,
    ${Colors.secondary},
    ${Colors.primary}
  );
  color: white;
  padding: 6rem 2rem;
  text-align: center;
`;

export const Headline = styled.h1`
  font-size: 2.7rem;
  margin-bottom: 1rem;
`;

export const SubHeadline = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

export const FeaturesSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 2rem;
  background-color: ${Colors.lightBackground};
`;

export const Feature = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s;
  width: 300px;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const FeatureIcon = styled.div`
  color: #6366f1;
  margin-bottom: 1rem;
`;

export const FeatureTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
`;

export const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #6b7280;
`;
