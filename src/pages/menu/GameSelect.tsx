import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Center,
  Flex,
  Container,
  Grid,
  Input,
  GridItem,
} from "@chakra-ui/react";
import { GameType, SpotType, SpotWithPov } from "../../util/Types";
import { TabRadioGroup } from "../../components/RadioGroup";
import { Game } from "../../classes/Game";
import { useGlobalState } from "../Context";
import http from "@/util/Http";

interface Props {}

const GameSelect = ({}: Props) => {
  const [state, dispatch] = useGlobalState();
  const [gameType, setGameType] = useState(GameType.FREEPLAY);
  const [spotType, setSpotType] = useState(SpotType.POPULAR);
  const [userName, setUserName] = useState("SkateBoy");

  useEffect(() => {
    const existingUser = window.localStorage.getItem(
      "skatespotgeoguesser-user"
    );

    if (existingUser) {
      setUserName(existingUser);
    }
  }, []);

  const createAndStartGame = async () => {
    const spot: SpotWithPov = await http("/api/spots?spotType=" + spotType);

    const newGame = new Game(userName, gameType, spotType);
    // console.log("createAndStartGame : ", spot);

    dispatch!({ game: newGame, spot });
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
            options={[
              SpotType.POPULAR,
              SpotType.ALL,
              SpotType.STL_AREA,
              SpotType.NOT_UNITED_STATES,
            ]}
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
          <Button
            colorScheme="blue"
            onClick={createAndStartGame}
            size={"lg"}
            px={10}
            py={3}
          >
            Start Game
          </Button>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default GameSelect;
