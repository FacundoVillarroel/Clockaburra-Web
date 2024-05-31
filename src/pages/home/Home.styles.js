import styled from "styled-components";
import Colors from "../../constants/Colors";

export const Container = styled.div`
  font-family: Arial, sans-serif;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background-color: #f8f9fa;
  text-align: center;
`;

export const Headline = styled.h1`
  font-size: 36px;
  color: ${Colors.primary};
  margin-bottom: 20px;
`;

export const SubHeadline = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
`;

export const FeaturesSection = styled.section`
  padding: 60px 20px;
  background-color: #fff;
  text-align: center;
`;

export const Feature = styled.div`
  margin-bottom: 40px;
`;

export const FeatureTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

export const FeatureDescription = styled.p`
  font-size: 16px;
  color: #666;
`;
