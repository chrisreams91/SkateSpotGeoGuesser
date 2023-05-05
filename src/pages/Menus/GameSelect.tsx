import { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import LeaderBoardWidget from "../Components/LeaderboardWidget";
import { Game, GameType, SpotType } from "@/util/Types";

interface Props {
  gameStarted: boolean;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
}

const GameSelect = ({ gameStarted, setGameStarted }: Props) => {
  const [gameType, setGameType] = useState(GameType.FREEPLAY);
  const [spotType, setSpotType] = useState(SpotType.POPULAR);
  const [userName, setUserName] = useState("Anon");

  const startGame = () => {
    const game: Game = {
      user: { name: userName },
      gameType,
      spotTypes: spotType,
      guesses: [],
      score: 0,
    };
    setGameStarted(true);
  };

  return (
    <>
      {!gameStarted && (
        <div style={{ backgroundColor: "gray", height: "90vh" }}>
          <div>
            <Heading>Game Type</Heading>
            <RadioGroup
              onChange={(value: GameType) => setGameType(value)}
              value={gameType}
            >
              <Stack direction="row">
                <Radio value={GameType.FREEPLAY}>{GameType.FREEPLAY}</Radio>
                <Radio value={GameType.SCORED_ROUNDS}>
                  {GameType.SCORED_ROUNDS}
                </Radio>
                <Radio value={GameType.TIMED_ROUNDS}>
                  {GameType.TIMED_ROUNDS}
                </Radio>
              </Stack>
            </RadioGroup>
          </div>
          <div>
            <Heading>Spot Types</Heading>
            <RadioGroup
              onChange={(value: SpotType) => setSpotType(value)}
              value={spotType}
            >
              <Stack direction="row">
                <Radio value={SpotType.POPULAR}>{SpotType.POPULAR}</Radio>
                <Radio value={SpotType.ALL}>{SpotType.ALL}</Radio>
              </Stack>
            </RadioGroup>
          </div>
          <div>
            <Heading>User Name</Heading>
            <Editable defaultValue={userName}>
              <EditablePreview />
              <EditableInput
                value={userName}
                onChange={(value) => setUserName(value.target.value)}
              />
            </Editable>
          </div>
          {/* <div>
            <LeaderBoardWidget />
          </div> */}
          <Button onClick={startGame}>Start</Button>
        </div>
      )}
    </>
  );
};

export default GameSelect;
