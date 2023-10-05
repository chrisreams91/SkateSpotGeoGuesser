import { Heading } from "@chakra-ui/react";
import { Game } from "../Classes/Game";

interface Props {
  game: Game;
}

const GameResults = ({ game }: Props) => {
  return (
    <>
      {game.isCompleted && (
        <div style={{ backgroundColor: "black" }}>
          <Heading>Final Score: 0</Heading>
        </div>
      )}
    </>
  );
};

export default GameResults;
