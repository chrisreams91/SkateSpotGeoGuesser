import { Center, Heading, Flex, Box } from "@chakra-ui/react";
import GameSelect from "./GameSelect";
import LeaderBoard from "./Leaderboard";
import { useGlobalState } from "../Context";
import GameResults from "./GameResults";

interface Props {}

const Menu = ({}: Props) => {
  const [state, dispatch] = useGlobalState();

  return (
    <Box>
      {!state.game && <GameSelect />}
      {state.game?.isCompleted && (
        <Flex direction={"column"} justify={"flex-end"}>
          <GameResults />
          <LeaderBoard />
        </Flex>
      )}
    </Box>
  );
};

export default Menu;
