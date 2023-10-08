import React from "react";
import { Center, Heading, Stack, Text, Box, VStack } from "@chakra-ui/react";
import { useGlobalState } from "../Context";

interface Props {}

const GameResults = ({}: Props) => {
  const [state, _dispatch] = useGlobalState();
  const { game } = state;

  return (
    <Center>
      <Stack spacing={3}>
        <Center>
          <Heading>Game Results</Heading>
        </Center>
        <Center>
          <Text>Total Score : {game?.score}</Text>
        </Center>
        {game?.guesses?.map((guess, index) => (
          <VStack key={guess.id}>
            <Text>
              Guess {index + 1} : {guess.score}
            </Text>
          </VStack>
        ))}
      </Stack>
    </Center>
  );
};

export default GameResults;
