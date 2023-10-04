import { PrismaClient } from "@prisma/client";
import stoled from "../data/findSkateSpotsFullEntities.json";
import { FindSkateSpotsFullEntity } from "@/util/Types";

const prisma = new PrismaClient();

const main = async () => {
  const findskatespots = stoled as FindSkateSpotsFullEntity[];
  let i = 0;
  for (const spot of findskatespots) {
    await prisma.spot.create({
      data: {
        name: spot.title,
        address: spot.formattedAddress,
        comments: spot.description,
        source: "findskatespots",
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
    i++
    if (i > 5) {
      break;
    }
  }
};

main();
