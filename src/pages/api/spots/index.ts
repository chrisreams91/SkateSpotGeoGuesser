import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const count = await prisma.spot.count();
    const skip = Math.max(0, Math.floor(Math.random() * count));

    const result = await prisma.spot.findFirst({
      take: 1,
      skip: skip,
    });
    // console.log("result :", result);

    return res.json(result);
  }
}
