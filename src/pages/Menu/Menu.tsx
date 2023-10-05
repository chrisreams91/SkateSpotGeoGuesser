import { Button, Heading } from "@chakra-ui/react";
import GameSelect from "./GameSelect";
import LeaderBoardWidget from "../Components/LeaderboardWidget";
import { useGlobalState } from "../Context";

interface Props {}

const Menu = ({}: Props) => {
  const [state, dispatch] = useGlobalState();

  return (
    <>
      {!state.game && <GameSelect />}

      {state.game?.isCompleted && (
        <>
          <div style={{ backgroundColor: "grey" }}>
            <Heading>Final Score: {state.game.score}</Heading>
            <LeaderBoardWidget />
            {JSON.stringify(state.game)}
          </div>
          <Button onClick={() => dispatch!({ game: undefined })}>
            Play Again ???
          </Button>
        </>
      )}
    </>
  );
};

export default Menu;
