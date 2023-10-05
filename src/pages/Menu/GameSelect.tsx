import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { GameMode, SpotType } from "../../util/Types";
import { TabRadioGroup } from "../Components/RadioGroup";
import { Game } from "../Classes/Game";
import { useGlobalState } from "../Context";

interface Props {}

const GameSelect = ({}: Props) => {
  const [state, dispatch] = useGlobalState();
  const [gameType, setGameType] = useState(GameMode.FREEPLAY);
  const [spotType, setSpotType] = useState(SpotType.POPULAR);
  const [userName, setUserName] = useState("Anon");

  const createAndStartGame = () => {
    const newGame = new Game(userName, gameType, spotType);
    console.log("newGame : ", newGame);
    dispatch!({ game: newGame });
  };

  return (
    <>
      {!state.game && (
        <div style={{ backgroundColor: "gray", height: "90vh" }}>
          <Box>
            <Heading padding={"4"}>Game Type</Heading>
            <TabRadioGroup
              name="Game Type"
              options={[
                GameMode.FREEPLAY,
                GameMode.SCORED_ROUNDS,
                GameMode.TIMED_ROUNDS,
              ]}
              onChange={(value) => setGameType(value as GameMode)}
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
          <Button onClick={createAndStartGame}>Start</Button>
        </div>
      )}
    </>
  );
};

export default GameSelect;
