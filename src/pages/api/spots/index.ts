import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { handleErrors } from "../../../../lib/prisma";
import { Tag } from "@/util/Types";

export default handleErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") {
      if (req.query.spotType) {
        const { spotType } = req.query;
        console.log("spotType : ", spotType);

        const whereClause = buildWhereClause(req.query.spotType);
        console.log("whereClause : ", whereClause);

        const count = await prisma.spot.count({ where: whereClause });
        console.log("count : ", count);

        const skip = Math.max(0, Math.floor(Math.random() * count));
        const result = await prisma.spot.findFirst({
          take: 1,
          skip: skip,
          where: whereClause,
          include: {
            pov: true,
          },
        });

        return res.json(result);
      }
    }
  }
);

const buildWhereClause = (spotType: string | string[]) => {
  const filters = Array.isArray(spotType) ? spotType : [spotType];
  // handle multiple tags later
  const firstTag = filters[0];
  console.log("firstTag : ", firstTag);

  switch (firstTag) {
    case Tag.ALL:
      return {};
    case Tag.POPULAR:
      return {
        mediaCount: {
          gt: 10,
        },
      };
    case Tag.NOT_UNITED_STATES:
      return {
        country: {
          not: "United States",
        },
      };
    case Tag.STL_AREA:
      return {
        tags: {
          hasEvery: filters,
        },
      };
    default:
      return {};
  }
};
