import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { handleErrors } from "../../../../lib/prisma";

export default handleErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") {
      const count = await prisma.spot.count();
      const skip = Math.max(0, Math.floor(Math.random() * count));

      const result = await prisma.spot.findFirst({
        take: 1,
        skip: skip,
        include: {
          pov: true,
        },
      });

      return res.json(result);
    }
  }
);
