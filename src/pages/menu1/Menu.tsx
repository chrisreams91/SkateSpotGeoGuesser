import { Center, Heading, Flex, Box, Button } from "@chakra-ui/react";
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
        <Flex direction={"column"}>
          <GameResults />
          <LeaderBoard />
          <Center padding={20}>
            <Button
              colorScheme="blue"
              onClick={() => dispatch!({ game: undefined })}
            >
              Play Again
            </Button>
          </Center>
        </Flex>
      )}
    </Box>
  );
};

export default Menu;
