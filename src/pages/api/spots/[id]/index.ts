import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { Spot } from "@prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const { id } = req.query;
    const result = await prisma.spot.findFirst({
      where: {
        id: String(id),
      },
    });
    return res.json(result);
  }
}
