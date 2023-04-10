import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { body } = req;
    try {
      const result = await prisma.guess.create({
        data: {
          ...body,
          score: 0,
        },
      });

      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  }
}
