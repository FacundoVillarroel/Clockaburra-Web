import { CardContainer, Header, Body, Button } from "./CardStyles";

function Card({ title, content }) {
  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <CardContainer>
      <Header>{title}</Header>
      <Body>{content}</Body>
      <Button onClick={handleClick}>Click Me</Button>
    </CardContainer>
  );
}

export default Card;
