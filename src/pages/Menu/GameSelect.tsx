import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Editable,
  EditablePreview,
  EditableInput,
  Center,
  Flex,
  Container,
  Grid,
  Input,
  GridItem,
} from "@chakra-ui/react";
import { GameType, SpotType } from "../../util/Types";
import { TabRadioGroup } from "../Components/RadioGroup";
import { Game } from "../../Classes/Game";
import { useGlobalState } from "../Context";

interface Props {}

const GameSelect = ({}: Props) => {
  const [state, dispatch] = useGlobalState();
  const [gameType, setGameType] = useState(GameType.FREEPLAY);
  const [spotType, setSpotType] = useState(SpotType.POPULAR);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const existingUser = window.localStorage.getItem(
      "skatespotgeoguesser-user"
    );

    if (existingUser) {
      setUserName(existingUser);
    } else {
      setUserName("SkateBoy");
    }
  }, []);

  const createAndStartGame = () => {
    const newGame = new Game(userName, gameType, spotType);
    dispatch!({ game: newGame });
  };

  return (
    <Grid id="gameSelect" gap={20}>
      {/* Setup different game types later */}
      {/* <GridItem>
        <Center>
          <Heading padding={"4"}>Game Type</Heading>
        </Center>
        <Center>
          <TabRadioGroup
            name="Game Type"
            options={[
              GameType.FREEPLAY,
              GameType.SCORED_ROUNDS,
              GameType.TIMED_ROUNDS,
            ]}
            onChange={(value) => setGameType(value as GameType)}
          />
        </Center>
      </GridItem> */}
      <GridItem>
        <Center>
          <Heading padding={"4"}>Spot Types</Heading>
        </Center>
        <Center>
          <TabRadioGroup
            name="Spot Types"
            options={[SpotType.POPULAR, SpotType.ALL]}
            onChange={(value) => setSpotType(value as SpotType)}
          />
        </Center>
      </GridItem>
      <GridItem>
        <Center>
          <Heading padding={"4"}>User Name</Heading>
        </Center>
        <Center>
          <Input
            width={"min-content"}
            defaultValue={userName || "SkateBoy"}
            value={userName}
            onChange={(value) => {
              setUserName(value.target.value);
              window.localStorage.setItem(
                "skatespotgeoguesser-user",
                value.target.value
              );
            }}
          />
        </Center>
      </GridItem>
      <GridItem>
        <Center>
          <Button onClick={createAndStartGame} size={"lg"} px={10} py={3}>
            Start Game
          </Button>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default GameSelect;
