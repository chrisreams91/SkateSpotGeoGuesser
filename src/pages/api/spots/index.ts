import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { handleErrors } from "../../../../lib/prisma";
import { Spot } from "@prisma/client";
import { Tag } from "@/util/Types";

export default handleErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") {
      const result: Spot[] = await prisma.$queryRawUnsafe(
        `SELECT * FROM "Spot" WHERE '${Tag.POPULAR}'=ANY(tags) ORDER BY RANDOM() LIMIT 1;`
      );

      console.log("result[0]: ", result[0]);
      return res.json(result[0]);
    }
  }
);
