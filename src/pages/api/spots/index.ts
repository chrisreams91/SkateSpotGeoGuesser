import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { handleErrors } from "../../../../lib/prisma";
import { Spot } from "@prisma/client";
import { Tag } from "@/util/Types";

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

      // console.log("result :", result);
      return res.json(result);
    }
  }
);
