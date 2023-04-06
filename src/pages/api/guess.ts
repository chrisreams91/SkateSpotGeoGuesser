import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    // const result = await prisma.guess.create({
    //   data: {
    //   },
    // });
    // return res.json(result);
    console.log("post guess");
  }
  if (req.method == "GET") {
    const result = await prisma.guess.findMany();
    console.log(result);
    return res.json(result);
  }
}
