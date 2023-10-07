import React, { useEffect } from "react";
import {
  Center,
  Heading,
  Stack,
  Text,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  TableCaption,
  Tfoot,
  Td,
  Flex,
} from "@chakra-ui/react";
import http from "@/util/Http";
import { Game } from "@prisma/client";

interface Props {}

const LeaderBoard = ({}: Props) => {
  const [highScoreGames, setHighScoreGames] = React.useState([]);

  useEffect(() => {
    const getTopScores = async () => {
      const topScores = await http("/api/games");
      setHighScoreGames(topScores);
    };

    getTopScores();
  }, []);

  return (
    <Box>
      <Center>
        <Heading>Leaderboard</Heading>
      </Center>
      <TableContainer>
        <Table variant="simple" size={"lg"}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Score</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {highScoreGames.map((game: Game) => {
              const date = new Date(game.createdAt);
              return (
                <Tr key={game.id}>
                  <Td>{game.user}</Td>
                  <Td> {game.score}</Td>
                  <Td> {date.toDateString()}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeaderBoard;
