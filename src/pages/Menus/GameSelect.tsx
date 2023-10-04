import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import LeaderBoardWidget from "../Components/LeaderboardWidget";
import { GameType, SpotType } from "../../util/Types";
import { TabRadioGroup } from "../Components/RadioGroup";
import { Game } from "../Classes/Game";

interface Props {
  gameStarted: boolean;
  setGameStarted: (game: Game) => void;
}

const GameSelect = ({ gameStarted, setGameStarted }: Props) => {
  const [gameType, setGameType] = useState(GameType.FREEPLAY);
  const [spotType, setSpotType] = useState(SpotType.POPULAR);
  const [userName, setUserName] = useState("Anon");

  const createAndStartGame = () => {
    const newGame = new Game(userName, gameType, spotType);
    console.log(newGame);
    setGameStarted(newGame);
  };

  return (
    <>
      {!gameStarted && (
        <div style={{ backgroundColor: "gray", height: "90vh" }}>
          <Box>
            <Heading padding={"4"}>Game Type</Heading>
            <TabRadioGroup
              name="Game Type"
              options={[
                GameType.FREEPLAY,
                GameType.SCORED_ROUNDS,
                GameType.TIMED_ROUNDS,
              ]}
              onChange={(value) => setGameType(value as GameType)}
            />
          </Box>
          <Box>
            <Heading padding={"4"}>Spot Types</Heading>
            <TabRadioGroup
              name="Spot Types"
              options={[SpotType.POPULAR, SpotType.ALL]}
              onChange={(value) => setSpotType(value as SpotType)}
            />
          </Box>
          <Box>
            <Heading padding={"4"}>User Name</Heading>
            <Editable defaultValue={userName}>
              <EditablePreview />
              <EditableInput
                value={userName}
                onChange={(value) => setUserName(value.target.value)}
              />
            </Editable>
          </Box>
          {/* <div>
            <LeaderBoardWidget />
          </div> */}
          <Button onClick={createAndStartGame}>Start</Button>
        </div>
      )}
    </>
  );
};

export default GameSelect;
