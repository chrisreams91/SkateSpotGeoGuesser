import React from "react";
import {
  Center,
  Heading,
  Text,
  Box,
  VStack,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { useGlobalState } from "../Context";

interface Props {}

const GameResults = ({}: Props) => {
  const [state, _dispatch] = useGlobalState();
  const { game } = state;

  return (
    <Center>
      <Stack spacing={3}>
        <Center>
          <Heading>Total Score : {game?.score}</Heading>
        </Center>
        <Center>
          <Flex direction={"column"} alignItems={"start"}>
            <Stack spacing={3}>
              {game?.guesses?.map((guess, index) => (
                <Text key={guess.id}>
                  Guess {index + 1} : {guess.score}
                </Text>
              ))}
            </Stack>
          </Flex>
        </Center>
      </Stack>
    </Center>
  );
};

export default GameResults;
