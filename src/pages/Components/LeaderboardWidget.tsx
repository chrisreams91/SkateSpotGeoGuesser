import { Heading } from "@chakra-ui/react";

interface Props {}

const LeaderBoardWidget = ({}: Props) => {
  return (
    <div style={{ backgroundColor: "grey" }}>
      <Heading>LeaderBoard:</Heading>
      <p>player 1</p>
      <p>player 2</p>
      <p>player 3</p>
      <p>player 4</p>
      <p>player 5</p>
    </div>
  );
};

export default LeaderBoardWidget;
