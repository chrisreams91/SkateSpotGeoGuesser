import { Heading } from "@chakra-ui/react";

interface Props {}

const GameResults = ({}: Props) => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <Heading>Score: 0</Heading>
    </div>
  );
};

export default GameResults;
