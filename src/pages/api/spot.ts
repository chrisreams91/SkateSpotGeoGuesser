import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    // const result = await prisma.spot.create({
    //   data: {
    //   },
    // });
    // return res.json(result);
    console.log("spot guess");
  }
  if (req.method == "GET") {
    const result = await prisma.spot.findMany();
    console.log(result);
    return res.json(result);
  }
}
