import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    // creating a new todo.
    // const result = await prisma.user.create({
    //   data: {
    //     title: "test",
    //   },
    // });
    // return res.json(result);
    console.log("post user");
  }
  if (req.method == "GET") {
    const result = await prisma.user.findMany();
    console.log(result);
    return res.json(result);
  }
}
