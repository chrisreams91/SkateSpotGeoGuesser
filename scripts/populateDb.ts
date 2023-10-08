import { PrismaClient } from "@prisma/client";
// import stoled from "../data/FullEntities.json";
import { FullEntity } from "../src/util/Types";

const prisma = new PrismaClient();

const main = async () => {
  // const skateSpots = stoled as FullEntity[];
  const skateSpots = [] as FullEntity[];

  for (const spot of skateSpots) {
    await prisma.spot.create({
      data: {
        name: spot.title,
        address: spot.formattedAddress,
        comments: spot.description,
        source: "fss",
        sourceId: spot.shortId,
        pov: {
          create: {
            lat: spot.latitude,
            long: spot.longitude,
            heading: 0,
            pitch: 0,
            zoom: 1,
          },
        }
      },
    });
  }
};

main();
