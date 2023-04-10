import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { handleErrors } from "../../../lib/prisma";

export default handleErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "POST") {
      console.log("post user");
      return res.json("post user");
    }
    if (req.method == "GET") {
      const result = await prisma.user.findMany();
      console.log(result);
      return res.json(result);
    }
  }
);
