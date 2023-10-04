import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { handleErrors } from "../../../../../../lib/prisma";

export default handleErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "PUT") {
      const { id } = req.query;
      const { body } = req;

      const result = await prisma.pov.create({
        data: {
          ...body,
          spot: {
            connect: {
              id,
            }
          }
        }
      })
      
      return res.json(result);
    }
  }
);
