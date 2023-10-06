import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { handleErrors } from "../../../lib/prisma";
import { Guess } from "@prisma/client";

export default handleErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "POST") {
      const { body } = req;
      const guessIds = body.guesses.map((guess: Guess) => ({ id: guess.id }));

      const result = await prisma.game.create({
        data: {
          user: "anonymous",
          score: body.score,
          gameType: body.gameType,
          spotType: body.spotType,
          guesses: {
            connect: guessIds,
          },
        },
      });
      return res.json(result);
    }
  }
);
