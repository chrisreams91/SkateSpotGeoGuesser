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
import http from "@/util/Http1";
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
    <Flex justify={"center"}>
      <TableContainer id="container" width={"90vh"}>
        <Table>
          <TableCaption placement="top">Leaderboard</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Score</Th>
              <Th isNumeric>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {highScoreGames.map((game: Game) => {
              const date = new Date(game.createdAt);
              return (
                <Tr key={game.id}>
                  <Td>{game.user}</Td>
                  <Td isNumeric>{game.score}</Td>
                  <Td isNumeric>{date.toDateString()}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default LeaderBoard;
