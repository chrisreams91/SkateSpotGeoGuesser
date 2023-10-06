import React, { ReactElement, useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import http from "@/util/Http";
import { Game } from "@prisma/client";

interface Props {}

const LeaderBoardWidget = ({}: Props) => {
  const [highScoreGames, setHighScoreGames] = React.useState([]);

  useEffect(() => {
    const getTopScores = async () => {
      const topScores = await http("/api/game");
      setHighScoreGames(topScores);
      console.log(topScores);
    };

    getTopScores();
  }, []);

  return (
    <div style={{ backgroundColor: "grey" }}>
      <Heading>LeaderBoard:</Heading>
      {highScoreGames.map((game: Game) => (
        <p key={game.id}>
          {game.user} : {game.score}
        </p>
      ))}
    </div>
  );
};

export default LeaderBoardWidget;
