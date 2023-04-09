import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "PUT") {
    const { id } = req.query;
    const result = await prisma.spot.update({
      where: {
        id: String(id),
      },
      data: {
        votesToRemove: {
          increment: 1,
        },
      },
    });
    return res.json(result);
  }
}
