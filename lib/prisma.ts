import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma: PrismaClient = new PrismaClient();

export const handleErrors = (
  routeHandler: (req: NextApiRequest, res: NextApiResponse) => any
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await routeHandler(req, res);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const errorProperties = Object.getOwnPropertyNames(error);
        const parsedError = {};

        if (error instanceof Error) {
          errorProperties.forEach((val) => {
            //@ts-ignore
            if (typeof error[val] === "function") {
              //@ts-ignore
              parsedError[val] = error[val]();
            } else {
              //@ts-ignore
              parsedError[val] = error[val];
            }
          });
        }

        return res.status(503).json(parsedError);
      } else {
        return res.status(503).json({ error: true });
      }
    }
  };
};

export default prisma;
