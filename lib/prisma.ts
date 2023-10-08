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
      // if (process.env.NODE_ENV === "development") {
        if (
          error instanceof Prisma.PrismaClientInitializationError ||
          error instanceof Prisma.PrismaClientKnownRequestError ||
          error instanceof Prisma.PrismaClientRustPanicError ||
          error instanceof Prisma.PrismaClientUnknownRequestError ||
          error instanceof Prisma.PrismaClientValidationError
        ) {
          const betterError = {
            cause: error.cause,
            message: error.message,
            name: error.name,
            stack: error.stack,
            clientVersion: error.clientVersion
          };
          console.log('Error: ', betterError)
          return res.status(503).json(betterError);
        }
        return res.status(503).json({ type: "Non Prisma Error", error: error });
      // } else {
      //   return res.status(503).json({ error: true });
      // }
    }
  };
};

export default prisma;
