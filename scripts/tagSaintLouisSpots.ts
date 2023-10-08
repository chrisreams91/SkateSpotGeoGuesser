import { Tag } from "../src/util/Types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stlCities = [
  "St. Louis",
  "Valley Park",
  "Bridgeton",
  "Clayton",
  "Webster Groves",
  "Eureka",
  "Caseyville",
  "Jennings",
  "Maplewood",
  "Troy",
];

const main = async () => {
  const spots = await prisma.spot.findMany({
    where: {
      city: {
        in: stlCities,
      },
    },
  });

  for (const spot of spots) {
    await prisma.spot.update({
      where: {
        id: spot.id,
      },
      data: {
        tags: {
            push: Tag.STL_AREA
        }
      },
    });
  }
};

main();
