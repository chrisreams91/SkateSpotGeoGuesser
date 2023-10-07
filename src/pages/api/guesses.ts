import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { handleErrors } from "../../../lib/prisma";

export default handleErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "POST") {
      const { body } = req;
      
      const result = await prisma.guess.create({
        data: {
          distanceFromSpot: body.distanceFromSpot,
          score: body.score,
          pov: {  
            create: {
              ...body.pov,
            }
          },
          spot: {
            connect: {
              id: body.spotId
            }
          },
        },
      });

      return res.json(result);
    }
  }
);
