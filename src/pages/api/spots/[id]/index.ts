import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { handleErrors } from "../../../../../lib/prisma";

export default handleErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
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
);
