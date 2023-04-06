import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Spot } from "@prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const result = await prisma.spot.findMany();
    return res.json(result);
  }

  if (req.method == "PUT") {
    const spot: Spot = req.body;
    console.log(spot);
    const result = await prisma.spot.update({
      where: {
        id: spot.id,
      },
      data: {
        votesToRemove: {
          increment: 1,
        },
      },
    });
    console.log(result);
    return res.json(spot);
  }
}
